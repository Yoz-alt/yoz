
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

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
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

const PANEL =
  "border-[3px] border-[#14102B] shadow-[6px_6px_0_#14102B] rounded-xl " +
  "transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "hover:shadow-[8px_8px_0_#14102B]";

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface ActionItem {
  title: string;
  text: string;
  button: string;
  href: string;
  icon: LucideIcon;
  tile: string;
}

const ACTIONS: ActionItem[] = [
  
    {
    title: "My Cart",
    text: "Check what you picked before you pay.",
    button: "Open cart",
    href: "/restaurants",
    icon: ShoppingBag,
    tile: "bg-[#FF8FB1]",
  },

  {
    title: "Burger Menu",
    text: "Pick your burgers, fries, and drinks.",
    button: "Open menu",
    href: "/products",
    icon: Utensils,
    tile: "bg-[#FFD23F]",
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

const NAVIGATION: NavigationSection[] = [
  {
    title: "MAIN MENU",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },

      {
        name: "My Cart",
        href: "/restaurants",
        icon: ShoppingBag,
      },
      {
        name: "Burger Menu",
        href: "/products",
        icon: Utensils,
      },
      {
        name: "My Orders",
        href: "/orders",
        icon: ClipboardList,
      },

    ],
  },
  
];

export default function DashboardPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { isChecking } = useAuthGuard({
    requireAuth: true,
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  // LOGOUT
  const handleLogout = () => {
    clearTokens();
    router.replace(CONFIG.ROUTES.LOGIN);
  };

  // NAVIGATION
  const navigate = (href: string) => {
    setMobileOpen(false);
    router.push(href);
  };

  // ACTIVE PAGE
  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // LOADING
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
    <div className="halftone flex min-h-screen font-body text-[#14102B]">

      {/* MOBILE OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          border-r-[3px] border-[#FF8FB1]
          bg-[#14102B] text-white
          transition-all duration-300
          md:sticky md:top-0 md:h-screen md:translate-x-0
          ${sidebarOpen ? "w-64" : "w-20"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >

        {/* BRAND */}
        <div className="flex h-20 items-center justify-between border-b-2 border-white/15 px-4">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="shrink-0 -rotate-6 rounded-lg border-[3px] border-white bg-[#FFD23F] p-2">
              <Utensils className="h-6 w-6 text-[#14102B]" />
            </div>

            {sidebarOpen && (
              <div className="min-w-0">
                <h1 className="whitespace-nowrap font-display text-sm font-black tracking-wide">
                  MAYONGBITAW
                </h1>
                <p className="text-xs text-[#FFD23F]">
                  Food Hub
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close sidebar"
            className="rounded-lg p-1 text-white hover:bg-white/10 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* WORKSPACE */}
        <div className="border-b-2 border-white/15 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-[#14102B] bg-[#FF8FB1] font-bold text-[#14102B]">
              M
            </div>

            {sidebarOpen && (
              <div className="min-w-0">
                <p className="truncate text-sm font-bold">
                  My Workspace
                </p>
                <p className="text-xs text-white/50">
                  Customer Panel
                </p>
              </div>
            )}
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-3 py-6">
          {NAVIGATION.map((section) => (
            <div key={section.title}>
              {sidebarOpen && (
                <p className="mb-3 px-3 text-[11px] font-black tracking-[2px] text-[#FFD23F]">
                  {section.title}
                </p>
              )}

              <div className="space-y-2">
                {section.items.map(({ name, href, icon: Icon }) => {
                  const active = isActive(href);

                  return (
                    <button
                      key={href}
                      type="button"
                      onClick={() => navigate(href)}
                      title={!sidebarOpen ? name : undefined}
                      aria-label={name}
                      aria-current={active ? "page" : undefined}
                      className={`
                        flex w-full items-center gap-3 rounded-lg
                        border-[2px] px-3 py-3 text-left
                        transition-all duration-200
                        ${
                          active
                            ? "border-[#FFD23F] bg-[#FFD23F] font-extrabold text-[#14102B] shadow-[3px_3px_0_#FF8FB1]"
                            : "border-transparent text-white/80 hover:border-[#FF8FB1] hover:bg-white/10 hover:text-white"
                        }
                      `}
                    >
                      <Icon className="h-5 w-5 shrink-0" />

                      {sidebarOpen && (
                        <span className="text-sm">{name}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* SETTINGS */}
          <div>
            {sidebarOpen && (
              <p className="mb-3 px-3 text-[11px] font-black tracking-[2px] text-[#FFD23F]">
                ACCOUNT
              </p>
            )}

            <button
              type="button"
              onClick={() => navigate("/settings")}
              title={!sidebarOpen ? "Settings" : undefined}
              aria-label="Settings"
              className="flex w-full items-center gap-3 rounded-lg border-2 border-transparent px-3 py-3 text-white/80 transition hover:border-[#FF8FB1] hover:bg-white/10 hover:text-white"
            >
              <Settings className="h-5 w-5 shrink-0" />

              {sidebarOpen && (
                <span className="text-sm">Settings</span>
              )}
            </button>
          </div>
        </nav>

        {/* SIDEBAR FOOTER */}
        <div className="border-t-2 border-white/15 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg border-2 border-[#FF8FB1] bg-[#FF8FB1] px-3 py-3 font-extrabold text-[#14102B] transition hover:bg-[#FFD23F]"
          >
            <LogOut className="h-5 w-5 shrink-0" />

            {sidebarOpen && (
              <span className="text-sm">Logout</span>
            )}
          </button>

          <p className="mt-3 text-center text-[10px] text-white/40">
            {sidebarOpen ? "© 2026 MAYONGBITAW HUB" : "2026"}
          </p>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="min-w-0 flex-1">

        {/* TOP NAVBAR */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b-[3px] border-[#FF8FB1] bg-[#14102B] px-4 text-white md:px-8">
          <div className="flex items-center gap-4">

            {/* DESKTOP SIDEBAR TOGGLE */}
            <button
              type="button"
              onClick={() => setSidebarOpen((prev) => !prev)}
              className="hidden rounded-lg border-2 border-white/20 p-2 transition hover:border-[#FFD23F] hover:bg-white/10 md:block"
              aria-label="Toggle sidebar"
              aria-expanded={sidebarOpen}
            >
              {sidebarOpen ? (
                <ChevronLeft size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </button>

            {/* MOBILE SIDEBAR */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-lg border-2 border-white/20 p-2 transition hover:border-[#FFD23F] hover:bg-white/10 md:hidden"
              aria-label="Open sidebar"
            >
              <Menu size={21} />
            </button>

            <div>
              <p className="text-xs text-white/50">
                My Workspace / Customer
              </p>
              <h2 className="font-display text-lg font-black tracking-wide">
                Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">Welcome!</p>
              <p className="text-xs text-[#FFD23F]">
                Hungry? Let's order!
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white bg-[#FF8FB1] font-black text-[#14102B]">
              M
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

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

            <h2 className="mt-2 font-display text-4xl leading-tight md:text-6xl">
              Itadakimasu!
            </h2>

            <p className="mt-4 max-w-md text-base text-white/80">
              Fresh burgers, hot fries, and cold drinks are ready when you are.
            </p>

            <Button
              onClick={() => router.push("/products")}
              className="mt-6 h-11 rounded-lg border-[3px] border-white bg-[#FFD23F] px-6 font-extrabold text-[#14102B] shadow-[4px_4px_0_#FF8FB1] hover:bg-[#FFE066]"
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Order a burger
            </Button>
          </section>

          {/* SECTION TITLE */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-black">
                Quick Access
              </h2>
              <p className="mt-1 text-sm text-[#14102B]/60">
                Everything you need in one place.
              </p>
            </div>

            <div className="hidden rounded-lg border-[3px] border-[#14102B] bg-[#FFD23F] px-3 py-2 text-xs font-black sm:block">
              LET'S EAT!
            </div>
          </div>

          {/* ACTION CARDS */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {ACTIONS.map(
              ({ title, text, button, href, icon: Icon, tile }) => (
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
                    <p className="mb-4 text-sm text-[#14102B]/70">
                      {text}
                    </p>

                    <Button
                      className="w-full rounded-lg border-[3px] border-[#14102B] bg-[#14102B] font-bold text-white hover:bg-[#FFD23F] hover:text-[#14102B]"
                      onClick={() => router.push(href)}
                    >
                      {button}
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* CHEF NOTE */}
          <Card className={`${PANEL} mt-8 bg-[#FFF6E5]`}>
            <CardContent className="flex items-center gap-5 p-6">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[3px] border-[#14102B] bg-[#FF8FB1]">
                <ChefHat className="h-7 w-7 text-[#14102B]" />
              </div>

              <p className="text-sm font-medium md:text-base">
                <span className="font-extrabold">
                  Chef's note:
                </span>{" "}
                Every burger is cooked fresh after you order, so it reaches you hot.
              </p>
            </CardContent>
          </Card>
        </main>

        {/* FOOTER */}
        <footer className="border-t-[3px] border-[#14102B] bg-[#FFF6E5] px-5 py-6 text-center">
          <p className="text-sm font-medium text-[#14102B]/70">
            © 2026 MAYONGBITAW HUB. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
