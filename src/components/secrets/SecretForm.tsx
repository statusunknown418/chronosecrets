"use client";
import { SecretByIdResponse } from "@/lib/api/secrets/queries";
import { EDIT_CONTENT_COST, EDIT_REVELATION_DATE_COST } from "@/lib/constants";
import { NewSecretParams, insertSecretParams } from "@/lib/db/schema";
import { useDisableSubmit } from "@/lib/hooks/useDisableSubmit";
import { trpc } from "@/lib/trpc/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Coins, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RequiredLabel } from "../ui/required-label";
import { Textarea } from "../ui/textarea";
import { ToggleGroupItem, ToggleGroupRoot } from "../ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AttachmentsSection } from "./AttachmentsSection";
import { DateTimeField } from "./DateTimeField";
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

  const [editCost, setEditCost] = useState(0);
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
    Promise.all([
      utils.secrets.getSecrets.invalidate(),
      utils.user.getFullViewer.refetch(),
    ]);

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
        editCost > 0 && toast.info(`Deducted ${editCost} ChronoBucks from your account!`);

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
        viewedAt: null,
        cost: editCost,
      });
    } else {
      createSecret({
        ...data,
        createdAt: new Date(),
      });
    }
  };

  const touchedFields = form.formState.touchedFields;

  useEffect(() => {
    if (bypass && sendingId) {
      form.setValue("receiverId", sendingId);
    }
  }, [bypass, form, sendingId]);

  useEffect(() => {
    if (!editing) return;

    const cost = [
      (touchedFields.revealingDate && EDIT_REVELATION_DATE_COST) || 0,
      (touchedFields.content && EDIT_CONTENT_COST) || 0,
    ].reduce((a, b) => a + b, 0) as number;

    setEditCost(cost);
  }, [editing, touchedFields.content, touchedFields.revealingDate]);

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
                <Input {...field} value={field.value || ""} placeholder="My secret" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SelectReceiver isEditing={editing} />

        <DateTimeField />

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

        {editing && Object.values(touchedFields).length > 0 && (
          <Alert variant="success">
            <Coins size={16} />
            <AlertTitle>Editing Cost</AlertTitle>

            <AlertDescription className="flex flex-col gap-1">
              {touchedFields.revealingDate && (
                <p>
                  Revealing date edit &rarr;{" "}
                  <span className="text-foreground">-{EDIT_REVELATION_DATE_COST}</span>
                </p>
              )}

              {touchedFields.content && (
                <p>
                  Content edit &rarr;{" "}
                  <span className="text-foreground">-{EDIT_CONTENT_COST}</span>
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}

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
