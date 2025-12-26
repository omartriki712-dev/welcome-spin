// Review actions

import { updateUser } from "./auth";

export const submitReview = async (content: string): Promise<{ success: boolean }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  updateUser({ hasReviewed: true });
  return { success: true };
};

export const resetReviewStatus = (): void => {
  updateUser({ hasReviewed: false });
};
