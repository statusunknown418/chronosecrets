"use client";
import { SecretByIdResponse } from "@/lib/api/secrets/queries";
import { NewSecretParams, insertSecretParams } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { UploadDropzone } from "@/lib/uploadthing/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { AlertOctagon, CalendarIcon, Info } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Spinner } from "../ui/spinner";
import { ToggleGroupItem, ToggleGroupRoot } from "../ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { SelectReceiver } from "./SelectReceiver";

const DynamicTiptap = dynamic(() => import("@/components/secrets/Tiptap"), {
  ssr: false,
  loading: () => <Spinner />,
});

const SecretForm = ({
  secret,
  closeModal,
}: {
  secret?: SecretByIdResponse["secret"];
  closeModal?: () => void;
}) => {
  const editing = !!secret?.id;

  const singleReceiverId = secret?.receivers[0].userId;

  const router = useRouter();
  const utils = trpc.useContext();

  const [parent] = useAutoAnimate();
  const [mainForm] = useAutoAnimate();
  const [disableButton, setDisableButton] = useState(false);

  const form = useForm<NewSecretParams>({
    resolver: zodResolver(insertSecretParams),
    defaultValues: {
      ...secret,
      attachments: secret?.attachments.map((s) => s.url),
      receiverId: secret?.receivers[0].userId,
    } ?? {
      title: "",
      content: "",
      encryptionType: "RC4",
      attachments: [],
    },
  });

  const onSuccess = async (action: "create" | "update" | "delete") => {
    await utils.secrets.getSecrets.invalidate();
    router.refresh();
    toast.success(`Secret ${action}d successfully`);
    closeModal?.();
  };

  const { mutate: createSecret, isLoading: isCreating } =
    trpc.secrets.createSecret.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateSecret, isLoading: isUpdating } =
    trpc.secrets.updateSecret.useMutation({
      onSuccess: () => {
        onSuccess("update");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const onSubmit = async (data: NewSecretParams) => {
    if (editing) {
      updateSecret({
        ...data,
        id: secret.id,
        shareableUrl: secret.shareableUrl,
        editedAt: new Date(),
        wasEdited: true,
      });
    } else {
      createSecret({
        ...data,
        createdAt: new Date(),
      });
    }
  };

  const previewAttachments = form.watch("attachments");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 pb-3"
        ref={mainForm}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Title</FormLabel>

              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="You need to know this..."
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SelectReceiver />

        <FormField
          control={form.control}
          name="revealingDate"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Revealing Date</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        <span>{format(field.value, "PPP")}</span>
                      ) : (
                        <span>Pick a date in the future</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    selected={field.value ? new Date(field.value) : new Date()}
                    defaultMonth={field.value ? new Date(field.value) : new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="encryptionType"
          render={({ field }) => (
            <FormItem>
              <TooltipProvider delayDuration={0}>
                <FormLabel>
                  Encryption Type
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info size={16} className="text-blue-500" />
                    </TooltipTrigger>

                    <TooltipContent className="max-w-[200px] break-words font-normal">
                      Each encryption algorithm is showed different to the final receiver
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
              </TooltipProvider>

              <FormControl>
                <ToggleGroupRoot
                  {...field}
                  type="single"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <ToggleGroupItem value="RC4">RC4</ToggleGroupItem>
                  <ToggleGroupItem value="AES">AES</ToggleGroupItem>
                  <ToggleGroupItem value="DES">DES</ToggleGroupItem>
                  <ToggleGroupItem value="Rabbit">Rabbit</ToggleGroupItem>
                </ToggleGroupRoot>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <FormLabel>
                Attachments
                <TooltipTrigger asChild>
                  <AlertOctagon size={16} className="text-yellow-500" />
                </TooltipTrigger>
              </FormLabel>

              <TooltipContent>You cannot edit this after creation!</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!editing && (
            <UploadDropzone
              className="border-2 border-border ut-button:text-sm ut-label:font-semibold"
              endpoint="secretsAttachmentsUploader"
              onUploadBegin={() => {
                setDisableButton(true);
              }}
              onClientUploadComplete={(res) => {
                setDisableButton(false);
                if (!res) return;

                form.setValue("attachments", [
                  ...(previewAttachments || []),
                  ...res.map((f) => f.url),
                ]);
              }}
              onUploadError={(error) => {
                setDisableButton(false);
                toast.error(error.message, {
                  description: error.cause?.message ?? "Try again",
                });
              }}
              config={{
                appendOnPaste: true,
                mode: "auto",
              }}
            />
          )}

          <div className="flex items-center gap-4 overflow-x-scroll">
            {secret?.attachments.length === 0 && (
              <span className="text-sm text-muted-foreground">
                No attachments included 👀
              </span>
            )}

            {secret?.attachments.map((s) => (
              <Link href={s.url} key={s.id} passHref rel="noopener noreferrer">
                <Image
                  src={s.url}
                  width={200}
                  height={200}
                  className="min-h-max w-auto min-w-[200px] rounded-lg transition-all hover:opacity-90"
                  alt={`Attachment ${s.url}`}
                />
              </Link>
            ))}

            {previewAttachments?.map((s) => (
              <Link href={s} key={s} passHref rel="noopener noreferrer">
                <Image
                  src={s}
                  width={200}
                  height={200}
                  className="h-auto w-auto min-w-[200px] rounded-lg transition-all hover:opacity-90"
                  alt={`Attachment`}
                />
              </Link>
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Content</FormLabel>

              <FormControl>
                <DynamicTiptap onChange={field.onChange} content={field.value} />
              </FormControl>

              <FormDescription>This editor supports markdown syntax!</FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex w-full items-center justify-end gap-4 rounded-lg pb-4 text-sm backdrop-blur backdrop-filter">
          {editing && (
            <Button variant={"ghost"} type="button" onClick={() => form.reset()}>
              <span>Reset</span>
            </Button>
          )}

          <Button
            type="submit"
            rounding={"full"}
            loading={isCreating || isUpdating}
            disabled={disableButton}
          >
            <span>
              {editing
                ? isUpdating
                  ? "Saving"
                  : "Save"
                : isCreating
                ? "Creating"
                : "Create"}
            </span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SecretForm;
