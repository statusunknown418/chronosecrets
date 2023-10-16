"use client";
import { NewSecretParams, Secret, insertSecretParams } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
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
import { Spinner } from "../ui/spinner";
import { ToggleGroupItem, ToggleGroupRoot } from "../ui/toggle-group";

const DynamicTiptap = dynamic(() => import("@/components/secrets/Tiptap"), {
  ssr: false,
  loading: () => <Spinner />,
});

const SecretForm = ({
  secret,
  closeModal,
}: {
  secret?: Secret;
  closeModal?: () => void;
}) => {
  const editing = !!secret?.id;

  const router = useRouter();
  const utils = trpc.useContext();
  const [parent] = useAutoAnimate();

  const form = useForm<NewSecretParams>({
    resolver: zodResolver(insertSecretParams),
    defaultValues: secret ?? {
      title: "",
      content: "",
      encryptionType: "SHA256",
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.secrets.getSecrets.invalidate();
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
      onSuccess: () => onSuccess("update"),
      onError: (err) => {
        toast.error(err.message);
      },
    });

  const { mutate: deleteSecret, isLoading: isDeleting } =
    trpc.secrets.deleteSecret.useMutation({
      onSuccess: () => onSuccess("delete"),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 pb-3">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Title</FormLabel>

              <FormControl>
                <Input {...field} placeholder="You need to know this..." />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

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
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={new Date(field.value) || new Date()}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
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
              <FormLabel>
                Encryption Type <Info size={16} />
              </FormLabel>

              <FormControl>
                <ToggleGroupRoot
                  {...field}
                  type="single"
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <ToggleGroupItem value="SHA256">SHA256</ToggleGroupItem>
                  <ToggleGroupItem value="AES">AES</ToggleGroupItem>
                  <ToggleGroupItem value="DES">DES</ToggleGroupItem>
                  <ToggleGroupItem value="RSA">RSA</ToggleGroupItem>
                </ToggleGroupRoot>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Content</FormLabel>

              <FormControl>
                <DynamicTiptap onChange={field.onChange} content={field.value} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2">
          <Button type="submit" loading={isCreating || isUpdating} className="mt-3 w-max">
            {editing
              ? isUpdating
                ? "Updating"
                : "Update"
              : isCreating
              ? "Creating"
              : "Create"}
          </Button>

          {editing && (
            <Button
              type="button"
              loading={isDeleting}
              variant="destructive"
              className="mt-3 w-max"
              onClick={() => {
                deleteSecret({ id: secret.id });
              }}
            >
              Delete
              {isDeleting ? "ing" : ""}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default SecretForm;
