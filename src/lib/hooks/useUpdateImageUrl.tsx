import { create } from "zustand";

export type UseUpdateImageUrl = {
  url: string | null;
  update: (url: string) => void;
};

export const useUpdateImageUrl = create<UseUpdateImageUrl>((set) => ({
  url: null,
  update: (url) => set({ url }),
}));
