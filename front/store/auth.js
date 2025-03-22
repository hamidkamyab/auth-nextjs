const { create } = require("zustand");
import { createJSONStorage, persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      isAuth: false,
      isHydrated: false, // مقداردهی اولیه هنوز انجام نشده
      setAuth: (val) => set({ isAuth: val }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: "isAuth",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) state.setHydrated();
      },
    }
  )
);

export default useAuthStore;
