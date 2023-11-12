"use client";

import { useForwardedRef } from "@/lib/hooks/useForwardedRef";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { DateValue, useButton, useDatePicker, useInteractOutside } from "react-aria";
import { DatePickerStateOptions, useDatePickerState } from "react-stately";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Calendar } from "./calendar-date-time";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";

const DateTimePicker = React.forwardRef<
  HTMLDivElement,
  DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);

  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);

  useInteractOutside({
    ref: contentRef,
    onInteractOutside: () => {
      setOpen(false);
    },
  });

  return (
    <div
      {...groupProps}
      ref={ref}
      aria-labelledby="some-picker"
      aria-describedby="some-picker"
      className={cn(
        groupProps.className,
        "flex items-center rounded-md ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      )}
    >
      <DateField {...fieldProps} aria-labelledby="date-time-picker" />

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            {...buttonProps}
            variant="outline"
            className="rounded-l-none"
            disabled={props.isDisabled}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent ref={contentRef} className="w-full">
          <div {...dialogProps} className="space-y-3">
            <Calendar {...calendarProps} />
            {!!state.hasTime && (
              <TimeField
                value={state.timeValue}
                onChange={state.setTimeValue}
                aria-labelledby="time-segment-selector"
              />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
