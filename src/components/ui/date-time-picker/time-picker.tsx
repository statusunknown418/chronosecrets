"use client";

import React from "react";
import { TimeValue } from "react-aria";
import { TimeFieldStateOptions } from "react-stately";
import { TimeField } from "./time-field";

const TimePicker = React.forwardRef<
  HTMLDivElement,
  Omit<TimeFieldStateOptions<TimeValue>, "locale">
  /**
   * TODO: There's an error when using this set of components
   */
>((props, _forwardedRef) => {
  return <TimeField {...props} aria-labelledby="some-label" />;
});

TimePicker.displayName = "TimePicker";

export { TimePicker };
