import { NewSecret } from "@/lib/db/schema";
import { cn } from "@/lib/utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { addDays, format, subDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

export const DateTimeField = () => {
  const form = useFormContext<NewSecret>();
  const [parent] = useAutoAnimate();

  const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(form.getValues("revealingDate"));
    const [hours, minutes] = e.target.value.split(":");

    if (!hours || !minutes) return;

    if (isNaN(parseInt(hours)) || isNaN(parseInt(minutes))) return;

    date.setHours(parseInt(hours));
    date.setMinutes(parseInt(minutes));

    if (date > new Date()) {
      form.clearErrors("revealingDate");
    }

    form.setValue("revealingDate", date);
  };

  return (
    <FormField
      control={form.control}
      name="revealingDate"
      render={({ field }) => (
        <FormItem ref={parent}>
          <FormLabel>Revealing Date</FormLabel>

          <Popover>
            <PopoverTrigger asChild className="w-full max-w-[320px]" ref={field.ref}>
              <FormControl>
                <Button
                  className={cn(
                    "w-full bg-popover pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                  variant={"outline"}
                >
                  {!!field.value ? (
                    <span>{format(field.value, "PPp")}</span>
                  ) : (
                    <span>Pick a date in the future</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="max-w-[320px] p-0" align="start">
              <Calendar
                mode="single"
                onSelect={field.onChange}
                onDayBlur={field.onBlur}
                disabled={(date) =>
                  date < subDays(new Date(), 1) || date > addDays(new Date(), 30)
                }
                toMonth={addDays(new Date(), 30)}
                selected={field.value && new Date(field.value)}
                defaultMonth={field.value ? new Date(field.value) : new Date()}
              />

              <Separator />

              <div className="mt-1 flex flex-col gap-2 px-4 py-2">
                <Label htmlFor="time">Select time (24h format)</Label>
                <Input
                  type="time"
                  id="time"
                  className="bg-transparent"
                  onBlur={field.onBlur}
                  disabled={!field.value}
                  onChange={handleTimeSelect}
                  value={field.value ? format(field.value, "HH:mm") : ""}
                />
              </div>
            </PopoverContent>
          </Popover>

          <FormDescription>
            We limit the revealing date to a{" "}
            <span className="text-blue-500">maximum of 30 days in the future</span> to
            prevent abuse 👀.
          </FormDescription>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
