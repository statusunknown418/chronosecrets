import "server-only";

import { cache } from "react";

const serverOnlyContext = <T>(defaultValue: T): [() => T, (v: T) => void] => {
  const getRef = cache(() => ({ current: defaultValue }));

  const getValue = (): T => getRef().current;

  const setValue = (value: T) => {
    getRef().current = value;
  };

  return [getValue, setValue];
};

export default serverOnlyContext;
