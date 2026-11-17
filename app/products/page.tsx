
"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";

import {
  Utensils,
  Pencil,
  Trash2,
  Plus,
  RefreshCw,
  X,
  Store,
  ShoppingBag,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  Sparkles,
  Menu,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

interface Product {
  product_id: number;
  restaurant_id: number;
  product_name: string;
  descriptions: string;
  created_at?: string;
  updated_at?: string;
}

interface ProductPayload {
  restaurant_id: number;
  product_name: string;
  descriptions: string;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const API = "/products";

const PANEL =
  "border-[3px] border-[#14102B] shadow-[6px_6px_0_#14102B] rounded-xl " +
  "transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 " +
  "hover:shadow-[8px_8px_0_#14102B]";

const inputClass =
  "w-full rounded-lg border-2 border-[#14102B] bg-white p-3 text-[#14102B] outline-none focus:ring-2 focus:ring-[#FF8FB1]";

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

export default function ProductsPage() {
  const router = useRouter();
  const pathname = usePathname();

  const { isChecking } = useAuthGuard({
    requireAuth: true,
  });

  const [products, setProducts] = useState<Product[]>([]);

  const [restaurantId, setRestaurantId] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // SIDEBAR STATE
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

  // MESSAGE HANDLER
  const showError = (error: unknown, fallback: string) => {
    setMessage(
      error instanceof Error ? error.message : fallback
    );
    setMessageType("error");
  };

  // GET PRODUCTS
  const getProducts = useCallback(async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await apiClient<
        Product[] | {
          products?: Product[];
          data?: Product[];
        }
      >(API, {
        method: "GET",
        requiresAuth: true,
      });

      const rows = Array.isArray(data)
        ? data
        : data.products ?? data.data ?? [];

      setProducts(rows);
    } catch (error) {
      showError(error, "Unable to load products.");
    } finally {
      setLoading(false);
    }
  }, []);

  // INITIAL LOAD
  useEffect(() => {
    if (!isChecking) {
      void getProducts();
    }
  }, [isChecking, getProducts]);

  // CLEAR FORM
  const clearForm = () => {
    setRestaurantId("");
    setProductName("");
    setDescription("");
    setEditId(null);
  };

  // POST AND PUT
  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (saving) return;

    setMessage("");

    const payload: ProductPayload = {
      restaurant_id: Number(restaurantId),
      product_name: productName.trim(),
      descriptions: description.trim(),
    };

    if (
      !restaurantId ||
      !Number.isInteger(payload.restaurant_id) ||
      payload.restaurant_id <= 0 ||
      !payload.product_name ||
      payload.product_name.length > 100 ||
      !payload.descriptions ||
      payload.descriptions.length > 255
    ) {
      showError(
        new Error("Please complete all fields correctly."),
        "Please complete all fields."
      );
      return;
    }

    setSaving(true);

    try {
      if (editId === null) {
        // POST - CREATE PRODUCT
        await apiClient(API, {
          method: "POST",
          requiresAuth: true,
          body: JSON.stringify(payload),
        });

        setMessage("Product added successfully!");
      } else {
        // PUT - UPDATE PRODUCT
        await apiClient(`${API}/${editId}`, {
          method: "PUT",
          requiresAuth: true,
          body: JSON.stringify(payload),
        });

        setMessage("Product updated successfully!");
      }

      setMessageType("success");

      clearForm();

      await getProducts();
    } catch (error) {
      showError(
        error,
        editId === null
          ? "Failed to add product."
          : "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // EDIT PRODUCT
  const startEdit = (product: Product) => {
    setEditId(product.product_id);
    setRestaurantId(String(product.restaurant_id));
    setProductName(product.product_name);
    setDescription(product.descriptions);

    setMessage("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE PRODUCT
  const deleteProduct = async (productId: number) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete product #${productId}?`
    );

    if (!confirmed) return;

    setMessage("");

    try {
      await apiClient(`${API}/${productId}`, {
        method: "DELETE",
        requiresAuth: true,
      });

      setMessage("Product deleted successfully!");
      setMessageType("success");

      if (editId === productId) {
        clearForm();
      }

      await getProducts();
    } catch (error) {
      showError(error, "Failed to delete product.");
    }
  };

  // SESSION CHECK
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
                Products
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

        {/* PRODUCTS BODY */}
        <main className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">

          {/* HEADER */}
          <header className="mb-8 flex items-center gap-3">
            <div className="rounded-lg border-[3px] border-[#14102B] bg-[#FFD23F] p-3 shadow-[4px_4px_0_#14102B]">
              <Utensils size={30} />
            </div>

            <div>
              <h1 className="text-3xl font-black">
                Products
              </h1>
              <p className="text-sm text-gray-600">
                MAYONGBITAW Food Hub
              </p>
            </div>
          </header>

          {/* MESSAGE */}
          {message && (
            <div
              role="alert"
              className={`${PANEL} mb-5 p-3 font-bold ${
                messageType === "error"
                  ? "bg-[#FFE4EC] text-[#B4163A]"
                  : "bg-[#D9FFF5] text-[#145A4A]"
              }`}
            >
              {message}
            </div>
          )}

          {/* CREATE AND UPDATE FORM */}
          <form
            onSubmit={handleSubmit}
            className={`${PANEL} mb-8 space-y-4 bg-white p-6`}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-black">
                {editId === null
                  ? "Add New Product (POST)"
                  : `Edit Product #${editId} (PUT)`}
              </h2>

              {editId !== null && (
                <button
                  type="button"
                  onClick={clearForm}
                  aria-label="Cancel editing"
                  className="rounded-lg p-2 transition hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* RESTAURANT ID */}
            <label className="block space-y-2 text-sm font-bold">
              <span>Restaurant ID</span>

              <input
                className={inputClass}
                type="number"
                min="1"
                placeholder="Enter restaurant ID"
                value={restaurantId}
                onChange={(event) =>
                  setRestaurantId(event.target.value)
                }
                required
              />
            </label>

            {/* PRODUCT NAME */}
            <label className="block space-y-2 text-sm font-bold">
              <span>Product Name</span>

              <input
                className={inputClass}
                placeholder="Enter product name"
                value={productName}
                onChange={(event) =>
                  setProductName(event.target.value)
                }
                maxLength={100}
                required
              />
            </label>

            {/* DESCRIPTION */}
            <label className="block space-y-2 text-sm font-bold">
              <span>Product Description</span>

              <textarea
                className={inputClass}
                placeholder="Enter product description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                maxLength={255}
                rows={3}
                required
              />
            </label>

            {/* FORM BUTTONS */}
            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 rounded-lg border-2 border-[#14102B] bg-[#FFD23F] px-5 py-3 font-black shadow-[3px_3px_0_#14102B] transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                <Plus size={17} />

                {saving
                  ? "Saving..."
                  : editId === null
                    ? "Add Product"
                    : "Save Changes"}
              </button>

              {editId !== null && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="rounded-lg border-2 border-[#14102B] bg-gray-200 px-5 py-3 font-bold"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* PRODUCT LIST */}
          <section className={`${PANEL} bg-white p-6`}>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black">
                  Product List (GET)
                </h2>

                <p className="text-sm text-gray-600">
                  Products saved in your database
                </p>
              </div>

              <button
                type="button"
                onClick={() => void getProducts()}
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-[#14102B] px-4 py-2 font-bold text-white disabled:opacity-60"
              >
                <RefreshCw
                  size={16}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>

            {loading ? (
              <p className="py-8 text-center">
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <p className="py-8 text-center text-gray-600">
                No products found.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <article
                    key={product.product_id}
                    className={`${PANEL} bg-[#FFF6E5] p-5`}
                  >
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#14102B] bg-[#FF8FB1]">
                      <Store size={23} />
                    </div>

                    {/* PRODUCT NAME */}
                    <h3 className="break-words text-xl font-black">
                      {product.product_name}
                    </h3>

                    {/* DESCRIPTION */}
                    <p className="my-2 break-words text-sm">
                      {product.descriptions}
                    </p>

                    {/* PRODUCT ID */}
                    <p className="mb-2 text-xs text-gray-500">
                      Product ID: {product.product_id}
                    </p>

                    {/* RESTAURANT ID */}
                    <p className="mb-4 text-xs text-gray-500">
                      Restaurant ID: {product.restaurant_id}
                    </p>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(product)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-[#14102B] bg-[#5EEAD4] p-2 font-bold"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          void deleteProduct(product.product_id)
                        }
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg border-2 border-[#14102B] bg-[#FF8FB1] p-2 font-bold"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
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
