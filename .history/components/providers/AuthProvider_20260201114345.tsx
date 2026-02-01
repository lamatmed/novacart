/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

// Define the User type based on your Mongoose schema needs
// You can expand this as needed (e.g., role, image, etc.)
export interface User {
    id: string;
    name: string;
    email: string;
    role?: "user" | "admin";
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    login: (userData: any) => Promise<boolean>;
    register: (userData: any) => Promise<boolean>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Function to fetch the current user (e.g., from an API endpoint)
    const refreshUser = async () => {
        try {
            const res = await fetch("/api/auth/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Failed to fetch user", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshUser();
    }, []);

    const login = async (userData: any) => {
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setIsAuthenticated(true);
                return true;
            } else {
                // Handle error (optional: you could expose an error state)
                return false;
            }
        } catch (error) {
            console.error("Login call failed", error);
            return false;
        }
    };

    const register = async (userData: any) => {
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });
               if (res.ok) {
                const data = await res.json();
                setUser(data.user);
                setIsAuthenticated(true);
                return true;
            } else {
                // Handle error (optional: you could expose an error state)
                return false;
            }
        } catch (error) {
            console.error("Registration call failed", error);
            return false;
        }
    };

    const logout = async () => {
        try {
            // Optional: Call logout API to clear cookies
            await fetch("/api/auth/logout", { method: "POST" });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            setIsAuthenticated(false);
            window.location.href = "/"; // Redirect to home or login page
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated,
                setIsAuthenticated,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
