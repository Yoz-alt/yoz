
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
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  if (isChecking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FFFDF5]">
        <p className="text-sm text-gray-500">
          Verifying your session...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5]">

      {/* NAVBAR */}
      <header className="bg-[#171717] text-white border-b border-yellow-400/30">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Utensils className="h-7 w-7 text-black" />
            </div>

            <div>
              <h1 className="text-xl font-bold tracking-wide">
                MAYONGBITAW HUB
              </h1>

              <p className="text-xs tracking-[2px] text-yellow-400">
                FRESH • TASTY • DELICIOUS
              </p>
            </div>
          </div>

          <Button
            onClick={handleLogout}
            className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>

        </div>
      </header>

      {/* DASHBOARD CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        <div className="mb-10">
          <p className="text-sm tracking-[3px] text-yellow-700 uppercase font-semibold">
            Customer Dashboard
          </p>

          <h2 className="text-4xl font-bold text-[#171717] mt-2">
            Welcome to MAYONGBITAW HUB!
          </h2>

          <p className="text-gray-600 mt-3">
            Hungry? Grab a burger! Explore our menu and enjoy delicious meals.
          </p>
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid gap-6 md:grid-cols-3">

          {/* MENU CARD */}
          <Card className="bg-white border-yellow-400/40 shadow-sm hover:shadow-lg transition">
            <CardHeader>
              <Utensils className="h-9 w-9 text-yellow-500 mb-2" />

              <CardTitle className="text-[#171717]">
                Burger Menu
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Discover our delicious burgers, fries, and drinks.
              </p>

              <Button
                className="w-full bg-[#171717] text-white hover:bg-yellow-400 hover:text-black"
                onClick={() => router.push("/menu")}
              >
                View Menu
              </Button>
            </CardContent>
          </Card>

          {/* CART CARD */}
          <Card className="bg-white border-yellow-400/40 shadow-sm hover:shadow-lg transition">
            <CardHeader>
              <ShoppingBag className="h-9 w-9 text-yellow-500 mb-2" />

              <CardTitle className="text-[#171717]">
                My Cart
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Review your favorite burgers before checkout.
              </p>

              <Button
                className="w-full bg-[#171717] text-white hover:bg-yellow-400 hover:text-black"
                onClick={() => router.push("/cart")}
              >
                View Cart
              </Button>
            </CardContent>
          </Card>

          {/* ORDERS CARD */}
          <Card className="bg-white border-yellow-400/40 shadow-sm hover:shadow-lg transition">
            <CardHeader>
              <ClipboardList className="h-9 w-9 text-yellow-500 mb-2" />

              <CardTitle className="text-[#171717]">
                My Orders
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Track your orders and check your order history.
              </p>

              <Button
                className="w-full bg-[#171717] text-white hover:bg-yellow-400 hover:text-black"
                onClick={() => router.push("/orders")}
              >
                View Orders
              </Button>
            </CardContent>
          </Card>

        </div>

        {/* WELCOME SECTION */}
        <Card className="mt-8 bg-[#171717] border-yellow-400/40 text-white overflow-hidden">
          <CardContent className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">

            <div>
              <ChefHat className="h-10 w-10 text-yellow-400 mb-4" />

              <h3 className="text-2xl font-bold">
                Fresh, Tasty, Delicious!
              </h3>

              <p className="text-gray-300 mt-2">
                Enjoy freshly prepared burgers and delicious meals
                delivered straight to your door.
              </p>
            </div>

            <Button
              onClick={() => router.push("/menu")}
              className="bg-yellow-400 text-black hover:bg-yellow-500 font-bold"
            >
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Explore Menu
            </Button>

          </CardContent>
        </Card>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 border-t border-yellow-400/30">
        <p className="text-sm text-gray-500">
          © 2026 MAYONGBITAW HUB. All Rights Reserved.
        </p>
      </footer>

    </div>
  );
}
