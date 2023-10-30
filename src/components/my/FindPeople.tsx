"use client";
import { trpc } from "@/lib/trpc/client";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { UserCard } from "../people/UserCard";
import { Button } from "../ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

export const FindPeople = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  const [query, updateQuery] = useState(q || "");
  const { replace } = useRouter();

  const form = useForm<{ search: string }>({
    defaultValues: {
      search: query,
    },
  });

  const { data, isLoading } = trpc.user.getByUsernameOrEmail.useQuery(query || "", {
    enabled: !!query && query.length > 0,
    refetchOnMount: false,
  });

  const onSubmit = (data: { search: string }) => {
    updateQuery(data.search);
    replace(`?q=${data.search}`);
  };

  return (
    <section className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem>
                <Label htmlFor="find">Find people</Label>

                <div className="flex items-center gap-2">
                  <Button type="submit" size="sm">
                    <Search size={16} />
                  </Button>

                  <FormControl>
                    <Input placeholder="@someone or some@friend.com" {...field} />
                  </FormControl>
                </div>

                <FormDescription>
                  You can search via username or email.{" "}
                  {data?.took ? `Took ${data.took}ms` : ""}
                </FormDescription>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {!!q && isLoading && (
        <div className="flex flex-col items-center justify-center">
          <Spinner />
        </div>
      )}

      {!isLoading && data?.people.length === 0 && (
        <div className="flex min-h-[140px] items-center justify-center rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
          <p>No users found</p>
        </div>
      )}

      {data?.people.map((p) => (
        <UserCard
          key={p.id}
          friend={p}
          alreadyFriends={p.alreadyFriends}
          requestPending={p.alreadyRequested}
        />
      ))}
    </section>
  );
};
