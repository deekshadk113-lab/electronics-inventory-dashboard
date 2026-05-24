import { useEffect, useMemo, useState } from "react";
import { Search, Bell, Package, DollarSign, AlertTriangle, ShieldAlert } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CategoryPie, SalesLine, TopProductsBar } from "@/components/dashboard/Charts";
import { InventoryTable, WarrantyTable } from "@/components/dashboard/Tables";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { mockProducts, mockSales, type Product, type Sale } from "@/lib/mockData";

const Index = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const ctrl = new AbortController();
    Promise.allSettled([
      fetch("http://127.0.0.1:5000/products", { signal: ctrl.signal }).then((r) => r.ok ? r.json() : null),
      fetch("http://127.0.0.1:5000/sales", { signal: ctrl.signal }).then((r) => r.ok ? r.json() : null),
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

  const totalRevenue = sales.reduce((s, x) => s + x.revenue, 0);
  const lowStock = products.filter(p => p.stock < 10).length;
  const today = new Date();
  const expiringSoon = products.filter(p => {
    const d = (+new Date(p.warrantyExpiry) - +today) / (1000 * 60 * 60 * 24);
    return d < 30;
  }).length;

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
            <button className="relative grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-bold text-background">{expiringSoon}</span>
            </button>
          </header>

          <main className="flex-1 space-y-6 p-6">
            <div className="animate-fade-in">
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-gradient">Voltrix</span> Inventory Analytics
              </h1>
              <p className="text-sm text-muted-foreground">Realtime overview of your electronics catalog.</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard label="Total Products" value={products.length.toLocaleString()} delta={4.2} icon={Package} tone="primary" index={0} />
              <KpiCard label="Total Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}K`} delta={12.8} icon={DollarSign} tone="success" index={1} />
              <KpiCard label="Low Stock" value={lowStock.toString()} delta={-3.1} icon={AlertTriangle} tone="warning" index={2} />
              <KpiCard label="Warranty Alerts" value={expiringSoon.toString()} delta={1.5} icon={ShieldAlert} tone="accent" index={3} />
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <CategoryPie products={filtered} />
              <div className="lg:col-span-2"><SalesLine sales={sales} /></div>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="lg:col-span-2"><TopProductsBar products={filtered} /></div>
              <InventoryTable products={filtered} />
            </div>

            <WarrantyTable products={filtered} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
