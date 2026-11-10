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

import { Utensils, Eye, EyeOff, ChefHat, Truck, Star } from "lucide-react";

/* Shared manga-panel look: thick ink outline + hard offset shadow */
const PANEL =
  "border-[3px] border-[#14102B] shadow-[6px_6px_0_#14102B] rounded-xl";

const INPUT =
  "h-12 rounded-lg border-[3px] border-[#14102B] bg-white font-medium " +
  "placeholder:text-[#14102B]/40 " +
  "focus-visible:ring-2 focus-visible:ring-[#FF8FB1] focus-visible:ring-offset-0";

const FEATURES = [
  { icon: ChefHat, text: "Cooked fresh after you order", tile: "bg-[#FFD23F]" },
  { icon: Truck, text: "Delivered straight to your door", tile: "bg-[#FF8FB1]" },
  { icon: Star, text: "Same great taste every time", tile: "bg-[#5EEAD4]" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
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
    <main className="grid min-h-screen font-body text-[#14102B] lg:grid-cols-2">

      {/* LEFT SIDE - BRANDING */}
      <section className="speed-lines relative hidden flex-col justify-between overflow-hidden bg-[#14102B] p-12 text-white lg:flex">

        {/* LOGO */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="-rotate-6 rounded-xl border-[3px] border-white bg-[#FFD23F] p-3">
            <Utensils className="h-8 w-8 text-[#14102B]" />
          </div>

          <div>
            <h1 className="font-display text-2xl leading-none tracking-wide">
              MAYONGBITAW HUB
            </h1>
            <p className="mt-1 text-xs text-[#FFD23F]">
              Fresh, tasty, delicious
            </p>
          </div>
        </div>

        {/* MAIN BRANDING */}
        <div className="relative z-10 max-w-lg space-y-7">

          {/* BURGER PICTURE IN A MANGA PANEL */}
          <div className="relative">
            <div className="overflow-hidden rounded-xl border-[3px] border-white shadow-[8px_8px_0_#FF8FB1]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85"
                alt="Freshly prepared delicious burger"
                className="h-64 w-full object-cover"
              />
            </div>

            <span className="absolute -right-3 -top-4 rotate-6 rounded-md border-[3px] border-[#14102B] bg-[#FFD23F] px-3 py-1 font-display text-sm text-[#14102B]">
              Join us!
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-5xl leading-tight">
              New here?
              <span className="block text-[#FFD23F]">Grab a burger!</span>
            </h2>

            <p className="text-lg leading-relaxed text-white/80">
              Create your account and order fresh burgers, crispy fries, and
              cold drinks, brought straight to your door.
            </p>
          </div>

          {/* FEATURES */}
          <ul className="space-y-3 text-sm font-medium">
            {FEATURES.map(({ icon: Icon, text, tile }) => (
              <li key={text} className="flex items-center gap-3">
                <span
                  className={`${tile} flex h-9 w-9 -rotate-3 items-center justify-center rounded-lg border-[3px] border-[#14102B]`}
                >
                  <Icon className="h-4 w-4 text-[#14102B]" aria-hidden="true" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-sm text-white/60">
          © 2026 MAYONGBITAW HUB. All rights reserved.
        </p>
      </section>

      {/* RIGHT SIDE - REGISTER FORM */}
      <section className="halftone flex items-center justify-center p-6 sm:p-10">

        <div className="w-full max-w-md space-y-7">

          {/* MOBILE LOGO */}
          <div className="space-y-3 text-center lg:hidden">
            <div className="inline-flex -rotate-6 rounded-xl border-[3px] border-[#14102B] bg-[#FFD23F] p-4 shadow-[4px_4px_0_#14102B]">
              <Utensils className="h-9 w-9 text-[#14102B]" />
            </div>

            <h1 className="font-display text-2xl tracking-wide">
              MAYONGBITAW HUB
            </h1>
            <p className="text-xs font-medium text-[#14102B]/60">
              Fresh, tasty, delicious
            </p>
          </div>

          {/* HEADING */}
          <div className="space-y-2 text-center">
            <h2 className="font-display text-4xl">Join the hub!</h2>
            <p className="text-[#14102B]/70">
              Register now to order your favorite burgers.
            </p>
          </div>

          {/* REGISTER CARD */}
          <Card className={`${PANEL} bg-white`}>

            <CardHeader className="space-y-2">
              <CardTitle className="font-display text-2xl">
                Create your account
              </CardTitle>

              <CardDescription className="text-[#14102B]/60">
                Choose a username and password to get started.
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleRegister}>

              <CardContent className="space-y-5">

                {/* ERROR MESSAGE */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border-[3px] border-[#14102B] bg-[#FFE4EC] p-3 text-sm font-bold text-[#B4163A]"
                  >
                    {error}
                  </div>
                )}

                {/* USERNAME */}
                <div className="space-y-2">
                  <Label htmlFor="username" className="font-bold">
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
                    className={INPUT}
                  />
                </div>

                {/* PASSWORD */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-bold">
                    Create password
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
                      className={`${INPUT} pr-12`}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded text-[#14102B]/60 hover:text-[#14102B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8FB1]"
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

                  <p className="text-xs font-medium text-[#14102B]/60">
                    Use at least 8 characters.
                  </p>
                </div>

              </CardContent>

              {/* REGISTER BUTTON */}
              <CardFooter className="flex flex-col gap-5 pt-4">

                <Button
                  type="submit"
                  disabled={loading}
                  className="h-12 w-full rounded-lg border-[3px] border-[#14102B] bg-[#FFD23F] text-base font-extrabold text-[#14102B] shadow-[4px_4px_0_#14102B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#FFE066] hover:shadow-[6px_6px_0_#14102B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#14102B] disabled:opacity-70"
                >
                  {loading ? "Creating account..." : "Create account"}
                </Button>

                <p className="text-center text-sm text-[#14102B]/70">
                  Already have an account?{" "}
                  <Link
                    href={CONFIG.ROUTES.LOGIN}
                    className="font-extrabold text-[#14102B] underline decoration-[#FF8FB1] decoration-2 underline-offset-4 hover:bg-[#FF8FB1]/30"
                  >
                    Sign in
                  </Link>
                </p>

              </CardFooter>

            </form>
          </Card>

          {/* FOOTER */}
          <div className="flex items-center justify-center gap-2 text-xs text-[#14102B]/60">
            <ChefHat className="h-4 w-4" />
            Secure sign-up by MAYONGBITAW HUB.
          </div>

        </div>
      </section>
    </main>
  );
}