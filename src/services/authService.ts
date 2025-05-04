/**
 * Shape of the User object used within the authentication context.
 */
export interface User {
  /** Unique identifier for the user. */
  id: string;
  /** User's email address. */
  email: string;
  /** User's role. */
  role: "admin" | "user";
}

/**
 * Expected response structure for successful authentication calls.
 */
interface AuthResponse {
  /** The authenticated user object. */
  user: User;
  /** Authentication token (e.g., JWT). */
  token: string;
}

/**
 * Mock Authentication Service.
 *
 * Simulates backend API calls for login and registration.
 * Uses hardcoded credentials and timeouts.
 *
 * IMPORTANT: Replace this with actual API calls before production!
 */
export const mockAuthService = {
  /**
   * Mock login function.
   * Checks against hardcoded admin/user credentials.
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log(`Mock Login Attempt: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 800)); // Simulate delay

    if (email === "admin@example.com" && password === "admin123") {
      console.log("Mock Admin login success");
      return {
        user: { id: "1", email: "admin@example.com", role: "admin" }, // Removed unnecessary 'as const'
        token: "mock-admin-token-xyz789",
      };
    }
    if (email === "user@example.com" && password === "user123") {
      console.log("Mock User login success");
      return {
        user: { id: "2", email: "user@example.com", role: "user" }, // Removed unnecessary 'as const'
        token: "mock-user-token-abc123",
      };
    }

    console.error("Mock Login Failed: Invalid credentials");
    throw new Error("Invalid credentials");
  },

  /**
   * Mock registration function.
   * Always succeeds for demonstration purposes.
   */
  register: async (email: string, password: string): Promise<AuthResponse> => {
    if (!email || !password) {
      // Added simple validation check
      throw new Error("Mock Service: Email and password are required.");
    }
    console.log(`Mock Registration Attempt: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1200)); // Simulate longer delay

    const newUser: User = { id: `mock-${Date.now()}`, email, role: "user" };
    console.log("Mock Registration Success:", newUser);
    return {
      user: newUser,
      token: `mock-new-user-token-${newUser.id}`,
    };
  },
};
