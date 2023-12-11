"use client";
import { SecretByIdResponse } from "@/lib/api/secrets/queries";
import {
  DELETE_EDITED_LABEL_COST,
  EDIT_CONTENT_COST,
  EDIT_REVELATION_DATE_COST,
} from "@/lib/constants";
import { NewSecretParams, insertSecretParams } from "@/lib/db/schema";
import { useDisableSubmit } from "@/lib/hooks/useDisableSubmit";
import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
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
import { Label } from "../ui/label";
import { RequiredLabel } from "../ui/required-label";
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";
import { ToggleGroupItem, ToggleGroupRoot } from "../ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { AttachmentsSection } from "./AttachmentsSection";
import { DateTimeField } from "./DateTimeField";
import { SelectReceiver } from "./SelectReceiver";
import { Sync } from "./Sync";

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
  const clearSyncedReceiver = useReceiverDataStore((s) => s.clear);

  const sendingId = searchParams.get("sendingId");
  const bypass = searchParams.get("bypass");

  const [editCost, setEditCost] = useState(0);
  const [disableEditTag, setDisableEditTag] = useState(false);
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
      onSuccess: async (data) => {
        if (data.secret) {
          notifyReceiver({
            receiverId: data.secret.receiverId,
            secretId: data.secret.id,
            secretTitle: data.secret.title,
            revealingDate: data.secret.revealingDate,
          });
        }

        clearSyncedReceiver();
        await utils.secrets.getSecrets.invalidate();
        onSuccess("create");
      },
    });

  const { mutate: updateSecret, isLoading: isUpdating } =
    trpc.secrets.updateSecret.useMutation({
      onSuccess: async ({ id }) => {
        editCost > 0 &&
          toast.info(`Secret edited successfully!`, {
            description: `The total cost was ${editCost}CB`,
          });

        Promise.all([
          utils.secrets.getSecrets.invalidate(),
          utils.secrets.getSecretById.refetch({ id: Number(id) }),
          utils.user.getFullViewer.refetch(),
        ]);

        onSuccess("update");
      },
      onError: (err) => {
        return toast.error(err.data?.code, {
          description: err.message,
        });
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
        removeEditedLabel: disableEditTag,
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
      (disableEditTag && DELETE_EDITED_LABEL_COST) || 0,
    ].reduce((a, b) => a + b, 0) as number;

    setEditCost(cost);
  }, [editing, touchedFields.content, touchedFields.revealingDate, disableEditTag]);

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

        <div>
          <SelectReceiver isEditing={editing} />
        </div>

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

        {editing && (
          <Alert variant="warning">
            <Info size={16} />
            <AlertTitle>Warning</AlertTitle>

            <AlertDescription className="flex flex-col gap-2">
              <p>
                After you edit anything on this secret an{" "}
                <span className="text-foreground">&quot;Edited&quot;</span> tag will be
                added to it. This is optional but you can remove it below.
              </p>

              <Label
                htmlFor="delete-edited"
                className="flex w-max items-center gap-2 rounded-lg border bg-popover p-3"
              >
                <Switch
                  id="delete-edited"
                  onCheckedChange={setDisableEditTag}
                  checked={disableEditTag}
                />
                <p className="font-light text-foreground">
                  Delete it for{" "}
                  <span className="font-mono font-medium">
                    ${DELETE_EDITED_LABEL_COST}CB
                  </span>
                </p>
              </Label>
            </AlertDescription>
          </Alert>
        )}

        {editing && Object.values(touchedFields).length > 0 && (
          <Alert variant="success">
            <Coins size={16} />
            <AlertTitle>Editing Cost</AlertTitle>

            <AlertDescription className="flex flex-col gap-1">
              {touchedFields.revealingDate && (
                <p>
                  Revealing date edit for{" "}
                  <span className="font-mono text-foreground">
                    ${EDIT_REVELATION_DATE_COST}CB
                  </span>
                </p>
              )}

              {touchedFields.content && (
                <p>
                  Content edit for{" "}
                  <span className="font-mono text-green-400 underline underline-offset-4">
                    ${EDIT_CONTENT_COST}CB
                  </span>
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}

        <div className="flex w-full items-center justify-end gap-4 rounded-lg pb-4 text-sm backdrop-blur backdrop-filter">
          {editing && (
            <Button
              variant={"ghost"}
              type="button"
              onClick={() => {
                form.reset();
                setDisableEditTag(false);
              }}
            >
              <span>Reset</span>
            </Button>
          )}

          <Button
            type="submit"
            rounding={"full"}
            variant={"primary"}
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

        <Sync userId={secret?.receivers.at(0)?.userId || undefined} />
      </form>
    </Form>
  );
};

export default SecretForm;
