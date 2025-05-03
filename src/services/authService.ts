/**
 * Interface representing a user object returned by the authentication service.
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
 * Interface representing the successful response from authentication endpoints.
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
 * Provides methods simulating user login and registration.
 * Uses hardcoded credentials and timeouts to mimic API calls.
 *
 * TODO: Replace this mock service with actual API calls to a backend
 * using a library like Axios or Fetch, potentially integrated via RTK Query.
 */
export const mockAuthService = {
  /**
   * Simulates user login.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<AuthResponse>} A promise resolving with the user and token.
   * @throws {Error} If credentials are invalid.
   */
  login: async (email: string, password: string): Promise<AuthResponse> => {
    console.log(`Attempting login for: ${email}`); // Added for debugging
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // Check for admin credentials
    if (email === "admin@example.com" && password === "admin123") {
      console.log("Admin login successful");
      return {
        user: { id: "1", email: "admin@example.com", role: "admin" as const },
        token: "mock-admin-token-xyz789", // Made token slightly more unique
      };
    }

    // Check for user credentials
    if (email === "user@example.com" && password === "user123") {
      console.log("User login successful");
      return {
        user: { id: "2", email: "user@example.com", role: "user" as const },
        token: "mock-user-token-abc123", // Made token slightly more unique
      };
    }

    // Invalid credentials
    console.error("Login failed: Invalid credentials");
    throw new Error("Invalid credentials");
  },

  /**
   * Simulates user registration.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<AuthResponse>} A promise resolving with the newly created user and token.
   */
  register: async (email: string, password: string): Promise<AuthResponse> => {
    // Basic validation added
    if (!email || !password) {
      throw new Error("Email and password are required for registration.");
    }
    console.log(`Attempting registration for: ${email}`);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // Always succeed for mock purposes
    const newUser: User = { id: Date.now().toString(), email, role: "user" as const };
    console.log("Registration successful for:", newUser);
    return {
      user: newUser,
      token: `mock-new-user-token-${newUser.id}`,
    };
  },
};
