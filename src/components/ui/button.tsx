import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "inline-flex items-center gap-2 px-4 py-2 select-none text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-indigo-600 text-foreground hover:bg-indigo-600/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary/10 text-secondary-foreground hover:bg-secondary/[15%]",
        ghost:
          "hover:bg-accent bg-transparent hover:text-accent-foreground active:scale-90",
        link: "text-primary underline-offset-4 hover:underline p-0 text-indigo-400",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      size: {
        default: "h-10",
        xs: "h-7 px-2",
        sm: "h-8 px-3",
        lg: "h-11 px-8",
        icon: "h-10 min-w-[40px] rounded-full p-0",
      },
      rounding: {
        lg: "rounded-lg",
        full: "rounded-full",
      },
      iconButtonSize: {
        default: "h-10 w-10",
        sm: "h-7 w-7 p-0",
        lg: "h-12 w-12",
      },
      alignment: {
        default: "justify-center",
        start: "justify-start",
        end: "justify-end",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounding: "full",
      alignment: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading,
      children,
      rounding,
      iconButtonSize,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, rounding, iconButtonSize, className }),
        )}
        ref={ref}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
