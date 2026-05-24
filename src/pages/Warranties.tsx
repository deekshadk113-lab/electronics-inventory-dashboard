import { WarrantyTable } from "@/components/dashboard/Tables";
import { useDashboard } from "@/components/dashboard/DashboardLayout";

export default function Warranties() {
  const { filtered, expiringSoon } = useDashboard();
  return (
    <>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight"><span className="text-gradient">Warranty</span> Tracking</h1>
        <p className="text-sm text-muted-foreground">{expiringSoon} items expiring within 30 days.</p>
      </div>
      <WarrantyTable products={filtered} />
    </>
  );
}