"use client";

import Link from "next/link";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { CONFIG } from "@/lib/config";

import { Button } from "@/components/ui/button";

import {
  Utensils,
  ShoppingBag,
  ChefHat,
  Truck,
  Beef,
  CupSoda,
  Sandwich,
  Clock,
  Phone,
  type LucideIcon,
} from "lucide-react";

/* ============================================================
   EDIT YOUR CONTENT HERE. The page below reads from these values.
   ============================================================ */

const SITE = {
  name: "MAYONGBITAW HUB",
  tagline: "Fresh, tasty, delicious",
  heroTitle: "Hungry?",
  heroAccent: "Grab a burger!",
  heroText:
    "Fresh burgers, crispy fries, and cold drinks, made with good ingredients and brought to your door.",
  heroImage:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
  sticker: "Juicy!",
  hours: "Daily, 10:00 AM to 9:00 PM", // change to your real hours
  phone: "0900 000 0000", // change to your real number
  ctaTitle: "Ready to order?",
  ctaText: "Create a free account and get your first burger on the way.",
};

type MenuItem = {
  icon: LucideIcon;
  title: string;
  text: string;
  price: string;
  tile: string;
};

// Add, remove, or rename items. Use your real names and prices.
const MENU: MenuItem[] = [
  {
    icon: Beef,
    title: "Classic Burger",
    text: "Juicy beef patty, cheese, lettuce, and tomato.",
    price: "₱99",
    tile: "bg-[#FFD23F]",
  },
  {
    icon: Sandwich,
    title: "Crispy Fries",
    text: "Hot, golden, and salted just right.",
    price: "₱59",
    tile: "bg-[#FF8FB1]",
  },
  {
    icon: CupSoda,
    title: "Iced Drink",
    text: "Something icy to go with every meal.",
    price: "₱39",
    tile: "bg-[#5EEAD4]",
  },
];

const STEPS = [
  { icon: ShoppingBag, title: "Order online", text: "Pick your meal and check out in a minute." },
  { icon: ChefHat, title: "We cook it fresh", text: "Your food is made after you order." },
  { icon: Truck, title: "We deliver", text: "Hot food, straight to your door." },
];

/* ============================================================
   Shared manga-panel look
   ============================================================ */

const PANEL =
  "border-[3px] border-[#14102B] shadow-[6px_6px_0_#14102B] rounded-xl";

const BTN_BASE =
  "h-12 rounded-lg border-[3px] border-[#14102B] px-6 text-base font-extrabold text-[#14102B] shadow-[4px_4px_0_#14102B] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#14102B] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_#14102B]";

export default function Home() {
  const { isChecking } = useAuthGuard({ requireAuth: false });

  if (isChecking) return null;

  return (
    <div className="min-h-screen font-body text-[#14102B]">

      {/* HEADER */}
      <header className="border-b-[3px] border-[#14102B] bg-[#FFD23F]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="-rotate-6 rounded-xl border-[3px] border-[#14102B] bg-white p-2">
              <Utensils className="h-6 w-6" aria-hidden="true" />
            </span>
            <span className="font-display text-xl tracking-wide">
              {SITE.name}
            </span>
          </Link>

          <Button
            asChild
            className="h-10 rounded-lg border-[3px] border-[#14102B] bg-white px-4 font-extrabold text-[#14102B] hover:bg-[#FFF3C4]"
          >
            <Link href={CONFIG.ROUTES.LOGIN}>Sign in</Link>
          </Button>
        </div>
      </header>

      <main>

        {/* HERO */}
        <section className="speed-lines relative overflow-hidden bg-[#14102B] text-white">
          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:py-24">

            <div className="space-y-6">
              <h1 className="font-display text-5xl leading-tight sm:text-6xl">
                {SITE.heroTitle}
                <span className="block text-[#FFD23F]">{SITE.heroAccent}</span>
              </h1>

              <p className="max-w-md text-lg leading-relaxed text-white/80">
                {SITE.heroText}
              </p>

              <div className="flex flex-wrap gap-4 pt-2">
                <Button
                  asChild
                  className={`${BTN_BASE} bg-[#FFD23F] hover:bg-[#FFE066]`}
                >
                  <Link href={CONFIG.ROUTES.REGISTER}>Create account</Link>
                </Button>

                <Button
                  asChild
                  className={`${BTN_BASE} bg-white hover:bg-[#FFF3C4]`}
                >
                  <Link href={CONFIG.ROUTES.LOGIN}>Sign in</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-xl border-[3px] border-white shadow-[8px_8px_0_#FF8FB1]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={SITE.heroImage}
                  alt="Freshly prepared delicious burger"
                  className="h-72 w-full object-cover sm:h-96"
                />
              </div>

              <span className="absolute -right-3 -top-4 rotate-6 rounded-md border-[3px] border-[#14102B] bg-[#FFD23F] px-3 py-1 font-display text-sm text-[#14102B]">
                {SITE.sticker}
              </span>
            </div>
          </div>
        </section>

        {/* MENU */}
        <section className="halftone px-6 py-16">
          <div className="mx-auto max-w-6xl space-y-10">
            <h2 className="text-center font-display text-4xl">
              What&apos;s on the menu
            </h2>

            <ul className="grid gap-6 sm:grid-cols-3">
              {MENU.map(({ icon: Icon, title, text, price, tile }) => (
                <li key={title} className={`${PANEL} space-y-3 bg-white p-6`}>
                  <div className="flex items-start justify-between gap-3">
                    <span
                      className={`${tile} flex h-12 w-12 -rotate-3 items-center justify-center rounded-lg border-[3px] border-[#14102B]`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>

                    <span className="rotate-3 rounded-md border-[3px] border-[#14102B] bg-[#FFD23F] px-3 py-1 font-display text-lg">
                      {price}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl">{title}</h3>
                  <p className="text-[#14102B]/70">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="border-y-[3px] border-[#14102B] bg-[#FF8FB1] px-6 py-16">
          <div className="mx-auto max-w-6xl space-y-10">
            <h2 className="text-center font-display text-4xl">How it works</h2>

            <ol className="grid gap-6 sm:grid-cols-3">
              {STEPS.map(({ icon: Icon, title, text }, i) => (
                <li key={title} className={`${PANEL} relative bg-white p-6 pt-8`}>
                  <span className="absolute -left-3 -top-4 -rotate-6 rounded-md border-[3px] border-[#14102B] bg-[#FFD23F] px-3 py-1 font-display text-sm">
                    {i + 1}
                  </span>
                  <Icon className="mb-3 h-7 w-7" aria-hidden="true" />
                  <h3 className="font-display text-xl">{title}</h3>
                  <p className="mt-1 text-[#14102B]/70">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CALL TO ACTION + INFO */}
        <section className="halftone px-6 py-16">
          <div
            className={`${PANEL} mx-auto max-w-2xl space-y-5 bg-white p-8 text-center`}
          >
            <h2 className="font-display text-3xl">{SITE.ctaTitle}</h2>
            <p className="text-[#14102B]/70">{SITE.ctaText}</p>

            <Button
              asChild
              className={`${BTN_BASE} bg-[#FFD23F] hover:bg-[#FFE066]`}
            >
              <Link href={CONFIG.ROUTES.REGISTER}>Create account</Link>
            </Button>

            <ul className="flex flex-col items-center justify-center gap-2 pt-2 text-sm font-medium text-[#14102B]/70 sm:flex-row sm:gap-6">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" aria-hidden="true" />
                {SITE.hours}
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {SITE.phone}
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#14102B] px-6 py-6 text-center text-sm text-white/60">
        © 2026 {SITE.name}. All rights reserved.
      </footer>
    </div>
  );
}