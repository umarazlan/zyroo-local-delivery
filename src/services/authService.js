// Login user
export const login = async (email, password) => {
  // Temporary mock login
  // Later this can call your real backend API

  if (email && password) {
    return {
      id: 1,
      name: "Admin",
      email: email,
      role: "admin",
    };
  }

  throw new Error("Email and password are required");
};