/** User object structure */
export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

/** Auth API response structure */
interface AuthResponse {
  user: User;
  token: string;
}

/** Mock Service for Authentication API calls */
export const mockAuthService = {
  /** Mock login */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log(`Mock Login Attempt: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email === "admin@example.com" && password === "admin123") {
      console.log("Mock Admin login success");
      return {
        user: { id: "1", email: "admin@example.com", role: "admin" },
        token: "mock-admin-token-xyz789",
      };
    }
    if (email === "user@example.com" && password === "user123") {
      console.log("Mock User login success");
      return {
        user: { id: "2", email: "user@example.com", role: "user" },
        token: "mock-user-token-abc123",
      };
    }

    console.error("Mock Login Failed: Invalid credentials");
    throw new Error("Invalid credentials");
  },

  /** Mock registration */
  register: async (email: string, password: string): Promise<AuthResponse> => {
    if (!email || !password) {
      throw new Error("Mock Service: Email and password are required.");
    }
    console.log(`Mock Registration Attempt: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const newUser: User = { id: `mock-${Date.now()}`, email, role: "user" };
    console.log("Mock Registration Success:", newUser);
    return {
      user: newUser,
      token: `mock-new-user-token-${newUser.id}`,
    };
  },
};
