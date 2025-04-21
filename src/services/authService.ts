export interface User {
  id: string;
  email: string;
  role: "admin" | "user";
}

interface AuthResponse {
  user: User;
  token: string;
}

export const mockAuthService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === "admin@example.com" && password === "admin123") {
      return {
        user: { id: "1", email: "admin@example.com", role: "admin" as const },
        token: "mock-admin-token",
      };
    }

    if (email === "user@example.com" && password === "user123") {
      return {
        user: { id: "2", email: "user@example.com", role: "user" as const },
        token: "mock-user-token",
      };
    }

    throw new Error("Invalid credentials");
  },

  register: async (email: string, password: string): Promise<AuthResponse> => {
    console.log("Registering with password:", password); 
    await new Promise((resolve) => setTimeout(resolve, 1000));

    
    return {
      user: { id: Date.now().toString(), email, role: "user" as const },
      token: "mock-new-user-token",
    };
  },
};
