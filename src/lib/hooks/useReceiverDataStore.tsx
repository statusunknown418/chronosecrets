import { User } from "next-auth";
import { create } from "zustand";

type Params = Partial<User & { username: string | null }> | null;

export type ReceiverDataStore = {
  storedReceiver: Params;
  setReceiverData: (data: Params) => void;
  clear: () => void;
};

export const useReceiverDataStore = create<ReceiverDataStore>((set) => ({
  storedReceiver: null,
  setReceiverData: (data) => set({ storedReceiver: data }),
  clear: () => set({ storedReceiver: null }),
}));
