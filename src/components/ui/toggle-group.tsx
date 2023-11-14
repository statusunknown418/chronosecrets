import { cn } from "@/lib/utils";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import React from "react";

export const ToggleGroupRoot = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Root
      ref={ref}
      {...props}
      className={cn(
        "flex overflow-hidden rounded-full border bg-popover text-center",
        className,
      )}
    />
  );
});

ToggleGroupRoot.displayName = "ToggleGroupRoot";

export const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      {...props}
      className={cn(
        "flex w-full justify-center rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors duration-200 data-[state=on]:bg-indigo-600 data-[state=on]:text-white",
        className,
      )}
    />
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";
