"use client";

import {
  NewSportParams,
  Sport,
  insertSportParams,
} from "@/lib/db/schema/sports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

const SportForm = ({
  sport,
  closeModal,
}: {
  sport?: Sport;
  closeModal: () => void;
}) => {
  const { toast } = useToast();

  const editing = !!sport?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<z.infer<typeof insertSportParams>>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertSportParams),
    defaultValues: {
      ...sport,
      availableDate: new Date(sport?.availableDate || "2023-01-01"),
    } ?? {
      title: "",
      description: "",
      membersAllowed: 0,
      isActive: false,
      availableDate: "",
    },
  });

  const onSuccess = (action: "create" | "update" | "delete") => {
    utils.sports.getSports.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: "Success",
      description: `Sport ${action}d!`,
      variant: "default",
    });
  };

  const { mutate: createSport, isLoading: isCreating } =
    trpc.sports.createSport.useMutation({
      onSuccess: () => onSuccess("create"),
    });

  const { mutate: updateSport, isLoading: isUpdating } =
    trpc.sports.updateSport.useMutation({
      onSuccess: () => onSuccess("update"),
    });

  const { mutate: deleteSport, isLoading: isDeleting } =
    trpc.sports.deleteSport.useMutation({
      onSuccess: () => onSuccess("delete"),
    });

  const handleSubmit = (values: NewSportParams) => {
    if (editing) {
      updateSport({ ...values, id: sport.id });
    } else {
      createSport({ ...values });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={"space-y-8"}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="membersAllowed"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Members Allowed</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Is Active</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="availableDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Available Date</FormLabel>
              <br />
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        <span>{JSON.stringify(field.value)}</span>
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
                    selected={new Date(field.value || "2023-01-01")}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mr-1"
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? "ing..." : "e"}`
            : `Creat${isCreating ? "ing..." : "e"}`}
        </Button>
        {editing ? (
          <Button
            type="button"
            variant={"destructive"}
            onClick={() => deleteSport({ id: sport.id })}
          >
            Delet{isDeleting ? "ing..." : "e"}
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default SportForm;
