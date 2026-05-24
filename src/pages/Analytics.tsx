import { CategoryPie, SalesLine, TopProductsBar } from "@/components/dashboard/Charts";
import { useDashboard } from "@/components/dashboard/DashboardLayout";

export default function Analytics() {
  const { sales, filtered } = useDashboard();
  return (
    <>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight"><span className="text-gradient">Analytics</span> Insights</h1>
        <p className="text-sm text-muted-foreground">Trends, distributions and bestsellers at a glance.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CategoryPie products={filtered} />
        <div className="lg:col-span-2"><SalesLine sales={sales} /></div>
      </div>
      <TopProductsBar products={filtered} />
    </>
  );
}