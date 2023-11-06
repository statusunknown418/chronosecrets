"use client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

export const SearchSecrets = ({ goBackTo = "/home" }: { goBackTo?: string }) => {
  const search = useSearchParams().get("search");

  const [show, change] = useState(false);
  const { replace } = useRouter();
  const [parent] = useAutoAnimate();

  const form = useForm<{ search: string }>({
    defaultValues: {
      search: search || "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    if (data.search.length === 0) replace(goBackTo);

    replace(`?search=${data.search}`);
  });

  const clearSearch = () => {
    form.reset();
    change(false);
    replace(goBackTo);
  };

  return (
    <section ref={parent}>
      {!show && !search && (
        <Button
          variant={"outline"}
          onClick={() => change(true)}
          className="w-full text-muted-foreground"
        >
          <Search size={16} /> Search secrets
        </Button>
      )}

      {(show || search) && (
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="search"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Input placeholder="Type and press enter to search" {...field} />
                    </FormControl>

                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      iconButtonSize={"sm"}
                      rounding={"full"}
                      type="button"
                      onClick={clearSearch}
                    >
                      <X size={16} className="text-muted-foreground" />
                    </Button>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </section>
  );
};
