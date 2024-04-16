import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoggedInStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      bearerToken: "",
      userRole: "",
      email: "",
      setIsLoggedIn: (state) => set({ isLoggedIn: state }),
      setBearerToken: (state) => set({ bearerToken: state }),
      setUserRole: (state) => set({ userRole: state }),
      setUserEmail: (state) => set({ email: state }),
    }),
    {
      name: "isLoggedInStorage",
    }
  )
);
