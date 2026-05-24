import { Package, DollarSign, AlertTriangle, ShieldAlert } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CategoryPie, SalesLine, TopProductsBar } from "@/components/dashboard/Charts";
import { InventoryTable, WarrantyTable } from "@/components/dashboard/Tables";
import { useDashboard } from "@/components/dashboard/DashboardLayout";

export default function Overview() {
  const { products, sales, filtered, expiringSoon } = useDashboard();
  const totalRevenue = sales.reduce((s, x) => s + x.revenue, 0);
  const lowStock = products.filter(p => p.stock < 10).length;

  return (
    <>
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
    </>
  );
}