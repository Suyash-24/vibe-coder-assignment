import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Platform, UserProfileSummary } from "@/types";

interface SavedProfile extends UserProfileSummary {
  platform: Platform;
}

interface AppState {
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  platform: Platform;
  setPlatform: (platform: Platform) => void;

  // Saved profiles state
  savedProfiles: SavedProfile[];
  addProfile: (profile: UserProfileSummary, platform: Platform) => void;
  removeProfile: (username: string) => void;
  isProfileSaved: (username: string) => boolean;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      platform: "instagram",
      setPlatform: (platform) => set({ platform, searchQuery: "" }),

      savedProfiles: [],
      addProfile: (profile, platform) => {
        const { savedProfiles } = get();
        if (!savedProfiles.some((p) => p.username === profile.username)) {
          set({ savedProfiles: [...savedProfiles, { ...profile, platform }] });
        }
      },
      removeProfile: (username) => {
        set((state) => ({
          savedProfiles: state.savedProfiles.filter(
            (p) => p.username !== username
          ),
        }));
      },
      isProfileSaved: (username) => {
        return get().savedProfiles.some((p) => p.username === username);
      },
    }),
    {
      name: "influencer-saved-profiles",
      partialize: (state) => ({ savedProfiles: state.savedProfiles }), // Only persist savedProfiles
    }
  )
);
