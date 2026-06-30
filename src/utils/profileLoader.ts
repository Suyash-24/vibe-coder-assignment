import type { ProfileDetailResponse, FullUserProfile } from "@/types";
import { extractProfiles } from "./dataHelpers";
import type { Platform } from "@/types";

const profileModules = import.meta.glob<ProfileDetailResponse>(
  "../assets/data/profiles/*.json"
);

export async function loadProfileByUsername(
  username: string
): Promise<ProfileDetailResponse | null> {
  const path = `../assets/data/profiles/${username}.json`;
  const loader = profileModules[path];

  if (loader) {
    const result = await loader();
    const data =
      (result as { default?: ProfileDetailResponse }).default ?? result;
    return data as ProfileDetailResponse;
  }

  // Fallback: If detailed profile JSON doesn't exist, build a mock response from the search summary data
  const platforms: Platform[] = ["instagram", "youtube", "tiktok"];
  for (const p of platforms) {
    const profiles = extractProfiles(p);
    const match = profiles.find((pr) => pr.username === username);
    if (match) {
      const mockUser: FullUserProfile = {
        ...match,
        // Provide sensible defaults for detailed fields not present in summary
        posts_count: undefined,
        avg_likes: undefined,
        avg_comments: undefined,
      };
      return {
        data: {
          success: true,
          user_profile: mockUser,
        },
      };
    }
  }

  return null;
}
