import { cookies } from "next/headers";
import { cache } from "react";
import { env } from "@/env";
import type { ProfileModel } from "@/lib/models/profile";

export interface ServerAuthResult {
  isAuthenticated: boolean;
  profile: ProfileModel | null;
  error?: string;
}

// Cache the auth result for the duration of the request
export const getServerAuth = cache(async (): Promise<ServerAuthResult> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    if (!cookieHeader) {
      return {
        isAuthenticated: false,
        profile: null,
      };
    }

    const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        Cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      // Add cache control for better performance
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (response.status === 200) {
      const profile: ProfileModel = await response.json();
      return {
        isAuthenticated: true,
        profile,
      };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        isAuthenticated: false,
        profile: null,
      };
    }

    throw new Error(`Profile request failed with status: ${response.status}`);
  } catch (error) {
    console.error("Server auth error:", error);
    return {
      isAuthenticated: false,
      profile: null,
      error: error instanceof Error ? error.message : "Authentication failed",
    };
  }
});
