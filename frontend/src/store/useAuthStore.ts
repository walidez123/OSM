import axios from "axios";
import { axiosInstance } from "../../lib/axios.ts";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
  user: localStorage.getItem("user") || null,
  isAuthenticated: false,
  isLoggingIn: false,
  isRegistering: false,
  isLoggingOut: false,
  token: localStorage.getItem("token") || null, 

  // Initialize CSRF protection
  initializeCSRF: async () => {
    try {
      await axios.get("/sanctum/csrf-cookie");
    } catch (err) {
      console.error("Failed to set CSRF cookie:", err);
    }
  },

  // checkForUser: async () => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     set({ user: null, isAuthenticated: false, token: null });
  //     return;
  //   }
  
  //   try {
  //     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
  //     const res = await axiosInstance.get("/user");
  //     set({ user: res.data.user, isAuthenticated: true, token });
  //   } catch (err) {
  //     console.error("Failed to check authentication:", err);
  //     localStorage.removeItem("token"); // Clear invalid token
  //     set({ user: null, isAuthenticated: false, token: null });
  //   }
  // },
  

  // Login function
  login: async (email, password) => {
    set({ isLoggingIn: true });
    try {
      await get().initializeCSRF(); 
      const res = await axiosInstance.post("/login", { email, password });
      const { user, token } = res.data;
  
      localStorage.setItem("token", token);
      set({ user, isAuthenticated: true, token });
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      toast.success("Login successful");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log in");
    }
    set({ isLoggingIn: false });
  },

  // Register function
  register: async (name, email, password, password_confirmation) => {
    set({ isRegistering: true });
    try {
      await get().initializeCSRF(); 
      const res = await axiosInstance.post("/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      const { user, token } = res.data;

      localStorage.setItem("token", token); 
      set({ user, isAuthenticated: true, token });
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`; 
      toast.success("Registration successful");
    } catch (err) {
      console.error(err);
      toast.error("Failed to register");
    }
    set({ isRegistering: false });
  },

  // Logout function
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post("/logout");
      localStorage.removeItem("token");
      set({ user: null, isAuthenticated: false, token: null });
      delete axiosInstance.defaults.headers.common["Authorization"]; 
      toast.success("Logged out successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to log out");
    }
    set({ isLoggingOut: false });
  },
}));