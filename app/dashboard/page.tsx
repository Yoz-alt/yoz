"use client";

import { useRouter } from "next/navigation";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Utensils,
  ShoppingBag,
  ClipboardList,
  LogOut,
  ChefHat,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

/* Shared manga-panel look: thick ink outline + hard offset shadow */
const PANEL =
  "border-[3px] border-[#14102B] shadow-[6px_6px_0_#14102B] rounded-xl " +
  "transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "hover:shadow-[8px_8px_0_#14102B]";

const ACTIONS = [
  {
    title: "Burger Menu",
    text: "Pick your burgers, fries, and drinks.",
    button: "Open menu",
    href: "/menu",
    icon: Utensils,
    tile: "bg-[#FFD23F]",
  },
  {
    title: "My Cart",
    text: "Check what you picked before you pay.",
    button: "Open cart",
    href: "/cart",
    icon: ShoppingBag,
    tile: "bg-[#FF8FB1]",
  },
  {
    title: "My Orders",
    text: "Follow your order and see past ones.",
    button: "Open orders",
    href: "/orders",
    icon: ClipboardList,
    tile: "bg-[#5EEAD4]",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  if (isChecking) {
    return (
      <div className="halftone flex min-h-screen items-center justify-center">
        <div className={`${PANEL} flex items-center gap-3 bg-white px-6 py-4`}>
          <Sparkles className="h-5 w-5 animate-pulse text-[#FF8FB1]" />
          <p className="text-sm font-bold text-[#14102B]">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="halftone min-h-screen font-body text-[#14102B]">

      {/* NAVBAR */}
      <header className="border-b-4 border-[#FF8FB1] bg-[#14102B] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div className="flex items-center gap-3">
            <div className="-rotate-6 rounded-lg border-[3px] border-white bg-[#FFD23F] p-2">
              <Utensils className="h-6 w-6 text-[#14102B]" />
            </div>

            <div>
              <h1 className="font-display text-xl leading-none tracking-wide">
                MAYONGBITAW HUB
              </h1>
              <p className="mt-1 text-xs text-[#FFD23F]">
                Fresh, tasty, delicious
              </p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="rounded-lg border-[3px] border-white bg-[#FFD23F] font-extrabold text-[#14102B] shadow-[3px_3px_0_#FF8FB1] hover:bg-[#FFE066]"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>

        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* HERO PANEL */}
        <section
          className={`${PANEL} speed-lines relative mb-10 overflow-hidden bg-[#14102B] p-8 text-white md:p-12`}
        >
          <span className="absolute right-6 top-6 hidden rotate-6 rounded-md border-[3px] border-[#14102B] bg-[#FFD23F] px-3 py-1 font-display text-sm text-[#14102B] md:block">
            Juicy!
          </span>

          <p className="text-sm font-bold text-[#FF8FB1]">
            Welcome back to the hub
          </p>

          <h2 className="font-display mt-2 text-4xl leading-tight md:text-6xl">
            Itadakimasu!
          </h2>

          <p className="mt-4 max-w-md text-base text-white/80">
            Fresh burgers, hot fries, and cold drinks are ready when you are.
          </p>

          <Button
            onClick={() => router.push("/menu")}
            className="mt-6 h-11 rounded-lg border-[3px] border-white bg-[#FFD23F] px-6 font-extrabold text-[#14102B] shadow-[4px_4px_0_#FF8FB1] hover:bg-[#FFE066]"
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Order a burger
          </Button>
        </section>

        {/* ACTION CARDS */}
        <div className="grid gap-6 md:grid-cols-3">
          {ACTIONS.map(({ title, text, button, href, icon: Icon, tile }) => (
            <Card key={title} className={`${PANEL} bg-white`}>
              <CardHeader>
                <div
                  className={`${tile} mb-2 flex h-14 w-14 -rotate-3 items-center justify-center rounded-lg border-[3px] border-[#14102B]`}
                >
                  <Icon className="h-7 w-7 text-[#14102B]" />
                </div>

                <CardTitle className="font-display text-xl text-[#14102B]">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="mb-4 text-sm text-[#14102B]/70">{text}</p>

                <Button
                  className="w-full rounded-lg border-[3px] border-[#14102B] bg-[#14102B] font-bold text-white hover:bg-[#FFD23F] hover:text-[#14102B]"
                  onClick={() => router.push(href)}
                >
                  {button}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CHEF NOTE */}
        <Card className={`${PANEL} mt-8 bg-[#FFF6E5]`}>
          <CardContent className="flex items-center gap-5 p-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-[#14102B] bg-[#FF8FB1]">
              <ChefHat className="h-7 w-7 text-[#14102B]" />
            </div>

            <p className="text-sm font-medium md:text-base">
              <span className="font-extrabold">Chef&apos;s note:</span> every
              burger is cooked fresh after you order, so it reaches you hot.
            </p>
          </CardContent>
        </Card>

      </main>

      {/* FOOTER */}
      <footer className="border-t-[3px] border-[#14102B] bg-[#FFF6E5] py-6 text-center">
        <p className="text-sm font-medium text-[#14102B]/70">
          © 2026 MAYONGBITAW HUB. All rights reserved.
        </p>
      </footer>

    </div>
  );
}