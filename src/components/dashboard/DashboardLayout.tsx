import { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useOutletContext } from "react-router-dom";
import { Bell, Search } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { mockProducts, mockSales, type Product, type Sale } from "@/lib/mockData";

export type DashboardCtx = {
  products: Product[];
  sales: Sale[];
  filtered: Product[];
  search: string;
  category: string;
  expiringSoon: number;
};

export const useDashboard = () => useOutletContext<DashboardCtx>();

export default function DashboardLayout() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const ctrl = new AbortController();
    Promise.allSettled([
      fetch("http://localhost:5000/products", { signal: ctrl.signal }).then((r) => r.ok ? r.json() : null),
      fetch("http://localhost:5000/sales", { signal: ctrl.signal }).then((r) => r.ok ? r.json() : null),
    ]).then(([p, s]) => {
      if (p.status === "fulfilled" && Array.isArray(p.value)) setProducts(p.value);
      if (s.status === "fulfilled" && Array.isArray(s.value)) setSales(s.value);
    }).catch(() => {});
    return () => ctrl.abort();
  }, []);

  const categories = useMemo(() => ["all", ...Array.from(new Set(products.map(p => p.category)))], [products]);
  const filtered = useMemo(() => products.filter(p =>
    (category === "all" || p.category === category) &&
    (search === "" || p.name.toLowerCase().includes(search.toLowerCase()))
  ), [products, search, category]);

  const today = new Date();
  const expiringSoon = products.filter(p => {
    const d = (+new Date(p.warrantyExpiry) - +today) / (1000 * 60 * 60 * 24);
    return d < 30;
  }).length;

  const ctx: DashboardCtx = { products, sales, filtered, search, category, expiringSoon };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="glass sticky top-0 z-10 flex h-16 items-center gap-3 border-b border-white/10 px-4 backdrop-blur-xl">
            <SidebarTrigger />
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, SKUs..."
                className="border-white/10 bg-white/5 pl-9 placeholder:text-muted-foreground/70 focus-visible:ring-primary/40"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44 border-white/10 bg-white/5">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c === "all" ? "All categories" : c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <NavLink to="/warranties" className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-background">{expiringSoon}</span>
            </NavLink>
          </header>
          <main className="flex-1 space-y-6 p-6">
            <Outlet context={ctx} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}