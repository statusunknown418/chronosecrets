import { create } from "zustand";

export type DisableSubmitStore = {
  disableSubmit: boolean;
  change: (value: boolean) => void;
};

export const useDisableSubmit = create<DisableSubmitStore>((set) => ({
  disableSubmit: false,
  change: (value) => set({ disableSubmit: value }),
}));
