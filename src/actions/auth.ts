// Auth actions for login, signup, and logout

export interface UserData {
  name: string;
  email: string;
  password: string;
  hasReviewed: boolean;
}

export const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    const user: UserData = JSON.parse(storedUser);
    if (user.email === email && user.password === password) {
      return { success: true };
    }
  }
  return { success: false, error: "Invalid email or password" };
};

export const signup = async (name: string, email: string, password: string): Promise<{ success: boolean }> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const user: UserData = { name, email, password, hasReviewed: false };
  localStorage.setItem("user", JSON.stringify(user));
  return { success: true };
};

export const logout = (): void => {
  localStorage.removeItem("user");
};

export const getUser = (): UserData | null => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    return JSON.parse(storedUser);
  }
  return null;
};

export const updateUser = (updates: Partial<UserData>): void => {
  const user = getUser();
  if (user) {
    localStorage.setItem("user", JSON.stringify({ ...user, ...updates }));
  }
};
