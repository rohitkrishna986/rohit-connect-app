import { createAuthSlice } from "@/slice/authSlice";
import { createChatSlice } from "@/slice/ChatSlice";
import { create } from "zustand";

const useAppStore = create()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));

export default useAppStore;
