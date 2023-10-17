"use client";
import { FullUser, updateUserSchema, type UpdateUserSchema } from "@/lib/db/schema";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { trpc } from "@/lib/trpc/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, CheckCircle, GitPullRequestIcon, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
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
import { Spinner } from "../ui/spinner";

export const SettingsForm = ({
  user,
  searchParams,
}: {
  user: FullUser;
  searchParams?: {
    goBackTo: string;
  };
}) => {
  const router = useRouter();
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

  const previewUsername = slugify(form.watch("username") || "");
  const value = useDebounce(form.watch("username"), 200);

  const { mutate: checkUsername, isLoading: checkingUsername } =
    trpc.user.checkUsername.useMutation({
      onError: (error) => {
        toast.error(error.message);
        setAvailable(false);
      },
      onSuccess: (data) => {
        setAvailable(data.available);
      },
    });

  const { mutate, isLoading } = trpc.user.updateUser.useMutation({
    onSuccess: () => {
      toast.success(`Updated!${searchParams?.goBackTo && " - Redirecting you back..."}`);

      searchParams?.goBackTo &&
        setTimeout(() => {
          router.push(searchParams.goBackTo);
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
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem ref={parent}>
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
                    onChange={(e) => {
                      setAvailable(false);
                      field.onChange(e);
                    }}
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

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem ref={parent}>
              <FormLabel>Display name</FormLabel>

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
                <Input {...field} placeholder="some@a.com" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button
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
