import { InventoryTable } from "@/components/dashboard/Tables";
import { useDashboard } from "@/components/dashboard/DashboardLayout";

export default function Inventory() {
  const { filtered } = useDashboard();
  return (
    <>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight"><span className="text-gradient">Inventory</span> Catalog</h1>
        <p className="text-sm text-muted-foreground">Browse, search and filter all stocked products.</p>
      </div>
      <InventoryTable products={filtered} />
    </>
  );
}