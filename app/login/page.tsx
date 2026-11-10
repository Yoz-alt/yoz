
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
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
  ShoppingBag,
  ChefHat,
  Truck,
  Star,
} from "lucide-react";

interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isChecking) return null;

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setTokens(data.accessToken, data.refreshToken);
      router.push(CONFIG.ROUTES.DASHBOARD);
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Invalid username or password."
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
              Hungry?
              <span className="block text-[#FACC15]">
                Grab a Burger!
              </span>
            </h2>

            <p className="text-gray-300 text-lg leading-relaxed">
              Enjoy freshly prepared burgers, crispy fries,
              and refreshing drinks. Delicious food made
              with quality ingredients and delivered
              straight to your door.
            </p>
          </div>

          {/* FEATURES */}
          <div className="space-y-4 text-sm">

            <div className="flex items-center gap-3">
              <ChefHat className="h-5 w-5 text-[#FACC15]" />
              Freshly Prepared Meals
            </div>

            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-[#FACC15]" />
              Fast and Easy Delivery
            </div>

            <div className="flex items-center gap-3">
              <Star className="h-5 w-5 text-[#FACC15]" />
              Delicious Food Every Time
            </div>

          </div>
        </div>

        <p className="text-sm text-gray-400 relative z-10">
          © 2026 MAYONGBITAW HUB. All rights reserved.
        </p>

        {/* BACKGROUND DECORATION */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FACC15]/10 rounded-full blur-3xl" />

        <div className="absolute top-1/3 -right-20 w-64 h-64 bg-[#FACC15]/5 rounded-full blur-3xl" />

      </section>

      {/* RIGHT SIDE - LOGIN FORM */}
      <section className="flex items-center justify-center p-6 sm:p-10">

        <div className="w-full max-w-md space-y-7">

          {/* MOBILE LOGO */}
          <div className="lg:hidden text-center space-y-3">

            <div className="inline-flex bg-[#171717] p-4 rounded-2xl">
              <Utensils className="h-9 w-9 text-[#FACC15]" />
            </div>

            <h1 className="text-2xl font-black tracking-wide text-[#171717]">
              MAYONGBITAW HUB
            </h1>

            <p className="text-xs tracking-[4px] text-[#A16207]">
              FRESH • TASTY • DELICIOUS
            </p>

          </div>

          {/* HEADING */}
          <div className="text-center space-y-3">

            <div className="inline-flex items-center gap-2 text-[#A16207] text-sm font-bold">
              <ShoppingBag className="h-4 w-4" />
              ONLINE FOOD ORDERING
            </div>

            <h2 className="text-4xl font-black text-[#171717]">
              Welcome Back!
            </h2>

            <p className="text-gray-500">
              Sign in to order your favorite burgers.
            </p>

          </div>

          {/* LOGIN CARD */}
          <Card className="border-[#FACC15]/50 shadow-xl bg-white rounded-2xl">

            <CardHeader className="space-y-2">

              <CardTitle className="text-2xl font-bold text-[#171717]">
                Login to your account
              </CardTitle>

              <CardDescription>
                Enter your username and password to continue.
              </CardDescription>

            </CardHeader>

            <form onSubmit={handleLogin}>

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
                    className="text-[#171717] font-semibold"
                  >
                    Username
                  </Label>

                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete="username"
                    className="h-12 border-gray-300 focus-visible:ring-[#FACC15]"
                  />

                </div>

                {/* PASSWORD */}
                <div className="space-y-2">

                  <Label
                    htmlFor="password"
                    className="text-[#171717] font-semibold"
                  >
                    Password
                  </Label>

                  <div className="relative">

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      className="h-12 pr-12 border-gray-300 focus-visible:ring-[#FACC15]"
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

                </div>

              </CardContent>

              {/* LOGIN BUTTON */}
              <CardFooter className="flex flex-col gap-5 pt-4">

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-[#FACC15] hover:bg-[#EAB308] text-[#171717] font-black rounded-lg transition-all duration-300"
                >
                  {loading ? "SIGNING IN..." : "SIGN IN"}
                </Button>

                <p className="text-sm text-center text-gray-500">
                  Dont have an account?{" "}

                  <Link
                    href={CONFIG.ROUTES.REGISTER}
                    className="font-bold text-[#A16207] hover:text-[#171717] underline underline-offset-4"
                  >
                    Create Account
                  </Link>
                </p>

              </CardFooter>

            </form>
          </Card>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
            <ChefHat className="h-4 w-4" />
            Secure login powered by MAYONGBITAW HUB.
          </div>

        </div>
      </section>
    </main>
  );
}
