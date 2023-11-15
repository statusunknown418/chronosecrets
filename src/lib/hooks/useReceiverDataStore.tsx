import { User } from "next-auth";
import { create } from "zustand";

export type ReceiverDataStore = {
  storedReceiver: Partial<User & { username: string }> | null;
  setReceiverData: (data: Omit<ReceiverDataStore, "setReceiverData">) => void;
  clear: () => void;
};

export const useReceiverDataStore = create<ReceiverDataStore>((set) => ({
  storedReceiver: null,
  setReceiverData: (data) => set(data),
  clear: () => set({ storedReceiver: null }),
}));
