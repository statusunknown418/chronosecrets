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
      className={cn("flex overflow-hidden rounded-lg border text-center", className)}
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
        "flex w-full justify-center px-3 py-1.5 text-sm text-muted-foreground data-[state=on]:bg-indigo-900 data-[state=on]:text-white",
        className,
      )}
    />
  );
});

ToggleGroupItem.displayName = "ToggleGroupItem";
