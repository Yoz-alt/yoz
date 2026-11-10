
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Utensils,
  Eye,
  EyeOff,
  UserPlus,
  ChefHat,
  Truck,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await apiClient("/auth/register", {
        method: "POST",
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      router.push(CONFIG.ROUTES.LOGIN);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen grid lg:grid-cols-2 bg-[#FFFDF5]">

      {/* LEFT SIDE - BRANDING */}
      <section className="hidden lg:flex flex-col justify-between bg-[#171717] p-12 text-white relative overflow-hidden">

        {/* LOGO */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-[#FACC15] p-3 rounded-xl">
            <Utensils className="h-8 w-8 text-[#171717]" />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-wide">
              MAYONGBITAW HUB
            </h1>

            <p className="text-xs tracking-[4px] text-[#FACC15]">
              FRESH • TASTY • DELICIOUS
            </p>
          </div>
        </div>

        {/* MAIN BRANDING */}
        <div className="max-w-lg space-y-7 relative z-10">

          {/* BURGER PICTURE */}
          <div className="rounded-3xl overflow-hidden border-4 border-[#FACC15]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
              alt="Freshly prepared delicious burger"
              className="w-full h-64 object-cover"
            />
          </div>

          <div className="space-y-4">
            <p className="text-[#FACC15] tracking-[4px] text-sm font-bold">
              THE ULTIMATE BURGER EXPERIENCE
            </p>

            <h2 className="text-5xl font-black leading-tight">
              Join MAYONGBITAW HUB,
              <span className="block text-[#FACC15]">
                Taste the Happiness.
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Create your account and enjoy delicious burgers,
              freshly prepared meals, and a fast and easy
              online ordering experience with MAYONGBITAW HUB.
            </p>
          </div>

          {/* FEATURES */}
          <div className="flex items-center gap-3 text-[#FACC15]">
            <Truck className="h-5 w-5" />
            <span className="text-sm tracking-wide">
              FRESHLY MADE • FAST DELIVERY
            </span>
          </div>

        </div>

        <p className="text-sm text-gray-400 relative z-10">
          © 2026 MAYONGBITAW HUB. All rights reserved.
        </p>

        {/* BACKGROUND DECORATION */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl" />

        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-[#FACC15]/5 rounded-full blur-3xl" />

      </section>

      {/* RIGHT SIDE - REGISTER FORM */}
      <section className="flex items-center justify-center p-6 sm:p-10 bg-[#FFFDF5]">

        <div className="w-full max-w-md space-y-6">

          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center space-y-3">

            <div className="inline-flex bg-[#171717] p-4 rounded-2xl">
              <Utensils className="h-8 w-8 text-[#FACC15]" />
            </div>

            <h1 className="text-2xl font-black tracking-wide text-[#171717]">
              MAYONGBITAW HUB
            </h1>

            <p className="text-xs tracking-[4px] text-[#A16207]">
              FRESH • TASTY • DELICIOUS
            </p>

          </div>

          {/* REGISTER HEADER */}
          <div className="text-center space-y-2">

            <div className="inline-flex items-center gap-2 text-[#A16207] text-sm font-bold">
              <UserPlus className="h-4 w-4" />
              CREATE YOUR ACCOUNT
            </div>

            <h2 className="text-3xl font-black text-[#171717]">
              Join MAYONGBITAW HUB
            </h2>

            <p className="text-gray-500">
              Register now and enjoy delicious burgers.
            </p>

          </div>

          {/* REGISTER CARD */}
          <Card className="border border-[#FACC15]/50 shadow-xl bg-white rounded-2xl">

            <CardHeader>
              <CardTitle className="text-xl text-[#171717]">
                Create Account
              </CardTitle>

              <CardDescription className="text-gray-500">
                Fill in your details to get started.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleRegister}>

              <CardContent className="space-y-5">

                {/* ERROR MESSAGE */}
                {error && (
                  <div
                    role="alert"
                    className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200"
                  >
                    {error}
                  </div>
                )}

                {/* USERNAME */}
                <div className="space-y-2">
                  <Label
                    htmlFor="username"
                    className="text-gray-800"
                  >
                    Username
                  </Label>

                  <Input
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    minLength={3}
                    className="h-12 bg-white text-black border-gray-300 focus-visible:ring-[#FACC15]"
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-800"
                  >
                    Create Password
                  </Label>

                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      autoComplete="new-password"
                      className="h-12 pr-12 bg-white text-black border-gray-300 focus-visible:ring-[#FACC15]"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#A16207]"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>

                  <p className="text-xs text-gray-500">
                    Use at least 8 characters.
                  </p>
                </div>

              </CardContent>

              {/* REGISTER BUTTON */}
              <CardFooter className="flex flex-col gap-5 pt-4">

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#FACC15] hover:bg-[#EAB308] text-[#171717] font-black rounded-lg transition-colors duration-300"
                >
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
                </Button>

                <p className="text-sm text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    href={CONFIG.ROUTES.LOGIN}
                    className="font-bold text-[#A16207] hover:text-black underline underline-offset-4"
                  >
                    Login
                  </Link>
                </p>

              </CardFooter>

            </form>
          </Card>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <ChefHat className="h-4 w-4 text-[#A16207]" />
            Welcome to MAYONGBITAW HUB!
          </div>

        </div>
      </section>
    </main>
  );
}
