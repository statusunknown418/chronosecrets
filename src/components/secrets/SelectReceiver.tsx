import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FullUser, NewSecretParams } from "@/lib/db/schema";
import { useReceiverDataStore } from "@/lib/hooks/useReceiverDataStore";
import { trpc } from "@/lib/trpc/client";
import { cn } from "@/lib/utils";
import { AlertOctagon, CheckIcon, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
import { RequiredLabel } from "../ui/required-label";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { ShareCustomLink } from "./QuickShare";

export const SelectReceiver = ({ isEditing }: { isEditing: boolean }) => {
  const form = useFormContext<NewSecretParams>();
  const searchParams = useSearchParams();

  const bypass = searchParams.get("bypass");
  const sendingUsername = searchParams.get("sendingUsername");
  const sendingId = searchParams.get("sendingId");
  const syncedReceiver = useReceiverDataStore((s) => s.storedReceiver);

  const { data, isLoading } = trpc.friendships.getAcceptedFriends.useQuery();
  const { data: bypassUsername } = trpc.user.getSafeUserById.useQuery(sendingId || "", {
    enabled: !!sendingId && !!bypass,
  });

  if (isLoading) {
    return (
      <FormItem>
        <FormLabel>
          Receiver <AlertOctagon className="text-red-500" size={14} /> <RequiredLabel />
        </FormLabel>

        <Skeleton className="h-10 w-full" />

        <FormDescription>
          The person you&apos;re making this secret for, he or she will get a notification
          right after it&apos;s created.
        </FormDescription>
      </FormItem>
    );
  }

  if (!!bypass) {
    return (
      <FormItem>
        <FormLabel>
          Receiver
          <span className="text-muted-foreground">(prefilled)</span>
        </FormLabel>

        {sendingId ? (
          <Button variant="outline" className="justify-start gap-2" disabled>
            {bypassUsername?.image && (
              <Image
                className="rounded-full"
                src={bypassUsername?.image}
                alt={bypassUsername?.name || "Profile pic"}
                width={22}
                height={22}
              />
            )}

            <span>{sendingUsername}</span>
            <span className="font-normal">{bypassUsername?.name}</span>
          </Button>
        ) : (
          <FormDescription className="text-destructive">
            Looks like the URL someone shared to you is missing their user_id, please
            request it again.
          </FormDescription>
        )}
      </FormItem>
    );
  }

  if (!data?.people.length) {
    return (
      <FormItem>
        <FormLabel>
          Receiver <RequiredLabel />
        </FormLabel>

        <div>
          <FormDescription>
            <span>
              You don&apos;t have anyone to send this secret to. Don&apos;t worry,
              it&apos;s easy to find & add friends, just visit the{" "}
              <Link href="/search">
                <Button variant="link" size="sm" className="p-0">
                  search page.
                </Button>
              </Link>
            </span>
          </FormDescription>

          <FormDescription>
            Or <ShareCustomLink />
          </FormDescription>
        </div>
      </FormItem>
    );
  }

  return (
    <FormField
      control={form.control}
      name="receiverId"
      render={({ field }) => (
        <FormItem>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <FormLabel>
                  Receiver
                  <AlertOctagon className="text-red-500" size={14} />
                  <RequiredLabel />
                </FormLabel>
              </TooltipTrigger>

              <TooltipContent className="font-normal" align="start">
                Watch out, you <span className="text-red-500">cannot</span> change the
                receiver after creation!
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
                    "justify-between gap-2 bg-popover",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {syncedReceiver?.username ? (
                    <p className="flex items-center gap-2">
                      {syncedReceiver?.image && (
                        <Image
                          className="rounded-full"
                          src={syncedReceiver?.image}
                          alt={syncedReceiver?.name || "Profile pic"}
                          width={22}
                          height={22}
                        />
                      )}

                      {syncedReceiver?.username}
                    </p>
                  ) : (
                    "Select someone"
                  )}

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
                  {data.people.map((p) => (
                    <ReceiverItem
                      key={data.viewer.id === p.sourceId ? p.friends.id : p.source.id}
                      friend={data.viewer.id === p.sourceId ? p.friends : p.source}
                    />
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>

          <FormDescription>
            The person you&apos;re making this secret for, he or she will get a
            notification right after it&apos;s created.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ReceiverItem = ({ friend }: { friend: FullUser }) => {
  const form = useFormContext();
  const syncReceiver = useReceiverDataStore((s) => s.setReceiverData);

  return (
    <CommandItem
      value={`${friend.username}-${friend.name}`}
      key={friend.id}
      onSelect={() => {
        form.setValue("receiverId", friend.id, {
          shouldValidate: true,
        });

        syncReceiver(friend);
      }}
    >
      {friend.image && (
        <Image
          className="mr-2 rounded-full"
          src={friend.image}
          alt={friend.name || "Profile pic"}
          width={22}
          height={22}
        />
      )}

      <p className="flex items-center gap-2">
        <span className="text-muted-foreground">{friend.username || "No username"}</span>
      </p>

      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          friend.id === form.getValues("receiverId") ? "opacity-100" : "opacity-0",
        )}
      />
    </CommandItem>
  );
};
