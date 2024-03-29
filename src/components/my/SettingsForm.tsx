"use client";
import { FullUser, updateUserSchema, type UpdateUserSchema } from "@/lib/db/schema";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { trpc } from "@/lib/trpc/client";
import { UploadButton } from "@/lib/uploadthing/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, CheckCircle, GitPullRequestIcon, XCircle } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { Button } from "../ui/button";
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
import { RequiredLabel } from "../ui/required-label";
import { Spinner } from "../ui/spinner";

export const SettingsForm = ({
  user,
  submitter = "Save",
}: {
  user: FullUser;
  submitter?: string;
}) => {
  const router = useRouter();
  const goBackTo = useSearchParams().get("goBackTo");
  const q = useSearchParams().get("q");
  const verifyOn = useSearchParams().get("verifyOn");
  const callback = useSearchParams().get("callbackUrl");

  const utils = trpc.useUtils();
  const [parent] = useAutoAnimate();
  const [available, setAvailable] = useState(true);
  const [initiallyDisabled, setInitiallyDisabled] = useState(true);

  const form = useForm<UpdateUserSchema>({
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
      username: user.username?.replace("@", "") || "",
    },
    resolver: zodResolver(updateUserSchema),
  });

  const userImage = form.watch("image");
  const previewUsername = slugify(form.watch("username") || "");
  const value = useDebounce(form.watch("username"), 200);

  const { mutate: checkUsername, isLoading: checkingUsername } =
    trpc.user.checkUsername.useMutation({
      onError: (error) => {
        toast.error(error.message);
        setAvailable(false);
      },
      onMutate: () => {
        setAvailable(false);
      },
      onSuccess: (data) => {
        setAvailable(data.available);
        setInitiallyDisabled(false);
      },
    });

  const { mutate, isLoading } = trpc.user.updateUser.useMutation({
    onSuccess: async () => {
      toast.success(
        `Updated!${goBackTo || callback ? " - Redirecting you back..." : ""}`,
      );

      const query = q ? `&q=${q}` : "";

      await utils.user.getFullViewer.refetch();

      if (callback) {
        setTimeout(() => {
          router.push(`${callback}?verified=true${query}`);
        }, 1000);

        return;
      }

      goBackTo &&
        setTimeout(() => {
          router.push(`${goBackTo}?verified=true${query}`);
        }, 1000);
    },
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = async (data: UpdateUserSchema) => {
    mutate({
      ...data,
      username: previewUsername,
    });
  };

  useEffect(() => {
    if (value) {
      checkUsername(value);
    }
  }, [checkUsername, value]);

  const disableSubmit = initiallyDisabled || !available || checkingUsername;

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-6 rounded-lg border p-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2">
          {userImage && (
            <Image
              src={userImage}
              width={100}
              height={100}
              className="h-24 w-24 rounded-lg border object-cover"
              alt="Profile Picture"
              priority
            />
          )}

          <UploadButton
            endpoint="profilePictureUploader"
            className="text-sm"
            onClientUploadComplete={(res) => {
              if (!res) return;

              form.setValue("image", res[0].url);
              toast.success("Upload Completed");
            }}
            onUploadError={(error: Error) => {
              toast.error(`Error while uploading your profile pic`, {
                description: error.message,
              });
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <RequiredLabel />
              </FormLabel>

              <fieldset className="flex h-10 w-full items-center overflow-hidden rounded-lg border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
                <span className="flex h-full w-12 items-center justify-center border-r text-center text-muted-foreground">
                  <AtSign size={16} className="text-indigo-400" />
                </span>

                <FormControl>
                  <input
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      setInitiallyDisabled(true);
                    }}
                    value={field.value || ""}
                    className="h-full w-full bg-background px-3 text-sm focus:outline-none"
                  />
                </FormControl>

                <span className="flex h-full w-12 items-center justify-center border-l text-center text-muted-foreground">
                  {checkingUsername ? (
                    <Spinner />
                  ) : available ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <XCircle size={20} className="text-destructive" />
                  )}
                </span>
              </fieldset>

              {!available && !checkingUsername && value && (
                <p className="flex gap-1 text-sm font-medium text-destructive">
                  <GitPullRequestIcon size={16} />
                  <span>This username is already taken, try another one!</span>
                </p>
              )}

              {verifyOn && (
                <FormDescription className="text-yellow-500">
                  You need to fill this out to complete your profile
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Full name</FormLabel>

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

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Email</FormLabel>

              <FormControl>
                <Input {...field} disabled placeholder="some@a.com" />
              </FormControl>

              <FormDescription className="flex flex-col gap-2">
                <span>
                  We won&apos;t allow you to change your email for now due to security
                  reasons. Hope you understand! :).
                </span>
                <span className="h-0.5 w-full bg-input" />
                <span>
                  This email is only used to notify you whenever you receive a new secret
                  or friend request.
                </span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-max self-end justify-self-end"
          type="submit"
          disabled={disableSubmit}
          loading={isLoading}
          rounding={"full"}
        >
          {isLoading ? "Working on it..." : submitter}
        </Button>
      </form>
    </Form>
  );
};
