import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NewSecretParams } from "@/lib/db/schema";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { AlertOctagon, CheckIcon, ChevronsUpDown } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Spinner } from "../ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export const SelectReceiver = ({ isEditing }: { isEditing: boolean }) => {
  const form = useFormContext<NewSecretParams>();

  const { data: friends, isLoading } = trpc.friendships.getFriends.useQuery();

  if (isLoading) return <Spinner />;

  if (!friends) return;

  return (
    <FormField
      control={form.control}
      name="receiverId"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <FormLabel>
                Receiver
                <TooltipTrigger>
                  <AlertOctagon className="text-yellow-500" size={16} />
                </TooltipTrigger>
              </FormLabel>

              <TooltipContent>
                Careful, you cannot change the receiver after creation!
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={isEditing}
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "justify-between gap-2",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value
                    ? friends.people.find((p) => p.friends.id === field.value)?.friends
                        .name
                    : "Select someone"}

                  <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="z-30 p-0">
              <Command className="bg-transparent">
                <CommandInput
                  placeholder="Search friend..."
                  className="h-9 bg-transparent"
                />
                <CommandEmpty>No friend found.</CommandEmpty>

                <CommandGroup>
                  {friends.people.map((p) => (
                    <CommandItem
                      value={p.friends.id}
                      key={p.friends.id}
                      onSelect={() => {
                        form.setValue("receiverId", p.friends.id);
                      }}
                    >
                      {p.friends.name}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          p.friends.id === field.value ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormDescription>
            The person you&apos;re making the secret for, he or she will get a
            notification right after it&apos;s created.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
