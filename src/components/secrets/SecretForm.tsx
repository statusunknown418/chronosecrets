"use client";
import { SecretByIdResponse } from "@/lib/api/secrets/queries";
import { NewSecretParams, insertSecretParams } from "@/lib/db/schema";
import { useDisableSubmit } from "@/lib/hooks/useDisableSubmit";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { addDays, format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RequiredLabel } from "../ui/required-label";
import { Textarea } from "../ui/textarea";
import { ToggleGroupItem, ToggleGroupRoot } from "../ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AttachmentsSection } from "./AttachmentsSection";
import { SelectReceiver } from "./SelectReceiver";

const SecretForm = ({
  secret,
  closeModal,
}: {
  secret?: SecretByIdResponse["secret"];
  closeModal?: () => void;
}) => {
  const editing = !!secret?.id;
  const disableSubmit = useDisableSubmit((s) => s.disableSubmit);

  const router = useRouter();
  const searchParams = useSearchParams();
  const utils = trpc.useUtils();

  const sendingId = searchParams.get("sendingId");
  const bypass = searchParams.get("bypass");
  const [parent] = useAutoAnimate();
  const [mainForm] = useAutoAnimate();

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
    closeModal ? closeModal() : router.push("/home");
  };

  const { mutate: notifyReceiver } = trpc.transactional.notifySecretReceiver.useMutation({
    onError: (err) => {
      toast.error("There was an error while notifying the receiver", {
        description: err.message,
      });
    },
  });

  const { mutate: createSecret, isLoading: isCreating } =
    trpc.secrets.createSecret.useMutation({
      onSuccess: (data) => {
        if (data.secret) {
          notifyReceiver({
            receiverId: data.secret.receiverId,
            secretId: data.secret.id,
            secretTitle: data.secret.title,
            revealingDate: data.secret.revealingDate,
          });
        }

        onSuccess("create");
      },
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
        viewed: false,
      });
    } else {
      createSecret({
        ...data,
        createdAt: new Date(),
      });
    }
  };

  useEffect(() => {
    if (bypass && sendingId) {
      form.setValue("receiverId", sendingId);
    }
  }, [bypass, form, sendingId]);

  return (
    <Form {...form}>
      <form
        action="#"
        className="flex flex-col gap-6 pb-3"
        onSubmit={form.handleSubmit(onSubmit)}
        ref={mainForm}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>
                Title
                <RequiredLabel />
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  autoFocus
                  value={field.value || ""}
                  placeholder="My secret"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SelectReceiver isEditing={editing} />

        <FormField
          control={form.control}
          name="revealingDate"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Revealing Date</FormLabel>

              <Popover>
                <PopoverTrigger asChild className="max-w-[290px]">
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
                    selected={
                      field.value ? new Date(field.value) : addDays(new Date(), 1)
                    }
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

        <Suspense>
          <AttachmentsSection editing={editing} secret={secret} />
        </Suspense>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Content</FormLabel>

              <FormControl>
                <Textarea
                  {...field}
                  value={field.value || ""}
                  className="min-h-[140px] sm:min-h-[200px]"
                  placeholder="You need to know this..."
                />
              </FormControl>

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
            disabled={disableSubmit}
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
