"use client";

export async function copyToClipboard(value: string) {
  try {
    if (typeof window !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(value);
      return {
        success: true,
      };
    }
    return {
      success: false,
      error: "Clipboard API not available",
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to copy to clipboard",
    };
  }
}

export async function updateUserProfile(data: any) {
  try {
    // Implementation would depend on your backend API
    console.log("Updating user profile:", data);
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: "Failed to update user profile",
    };
  }
}
