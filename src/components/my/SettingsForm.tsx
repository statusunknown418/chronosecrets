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

export const SettingsForm = ({ user }: { user: FullUser }) => {
  const router = useRouter();
  const goBackTo = useSearchParams().get("goBackTo");
  const q = useSearchParams().get("q");
  const verifyOn = useSearchParams().get("verifyOn");

  const [parent] = useAutoAnimate();
  const [available, setAvailable] = useState(true);

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
      },
    });

  const { mutate, isLoading } = trpc.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success(`Updated!${goBackTo ? " - Redirecting you back..." : ""}`);

      const query = q ? `&q=${q}` : "";

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

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6 rounded-lg border p-4"
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
                  <AtSign size={16} className="text-indigo-500" />
                </span>

                <FormControl>
                  <input
                    {...field}
                    value={field.value || ""}
                    placeholder="status.n_418"
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

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-max self-end"
          type="submit"
          disabled={!available || checkingUsername}
          loading={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
      </form>
    </Form>
  );
};
