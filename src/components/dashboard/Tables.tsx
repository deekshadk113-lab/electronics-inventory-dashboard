import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/mockData";

export function InventoryTable({ products }: { products: Product[] }) {
  return (
    <Wrap title="Inventory" subtitle={`${products.length} items`} delay={0.25}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <Th>Product</Th><Th>Category</Th><Th className="text-right">Price</Th><Th className="text-right">Stock</Th><Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {products.slice(0, 8).map((p) => (
            <tr key={p.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
              <Td className="font-medium">{p.name}</Td>
              <Td className="text-muted-foreground">{p.category}</Td>
              <Td className="text-right">${p.price.toLocaleString()}</Td>
              <Td className="text-right">{p.stock}</Td>
              <Td>
                {p.stock === 0 ? <Badge variant="destructive">Out</Badge>
                  : p.stock < 10 ? <Badge className="bg-warning/20 text-warning hover:bg-warning/30 border-0">Low</Badge>
                  : <Badge className="bg-success/20 text-success hover:bg-success/30 border-0">In stock</Badge>}
              </Td>
            </tr>
          ))}
          {products.length === 0 && <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No products match filters.</td></tr>}
        </tbody>
      </table>
    </Wrap>
  );
}

export function WarrantyTable({ products }: { products: Product[] }) {
  const today = new Date();
  const rows = products
    .map((p) => {
      const days = Math.round((+new Date(p.warrantyExpiry) - +today) / (1000 * 60 * 60 * 24));
      return { ...p, days };
    })
    .sort((a, b) => a.days - b.days)
    .slice(0, 8);
  return (
    <Wrap title="Warranty Expirations" subtitle="Sorted by urgency" delay={0.3}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
            <Th>Product</Th><Th>Expires</Th><Th className="text-right">Days</Th><Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          {rows.map((p) => (
            <tr key={p.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
              <Td className="font-medium">{p.name}</Td>
              <Td className="text-muted-foreground">{p.warrantyExpiry}</Td>
              <Td className="text-right">{p.days}</Td>
              <Td>
                {p.days < 0 ? <Badge variant="destructive">Expired</Badge>
                  : p.days < 30 ? <Badge className="bg-warning/20 text-warning hover:bg-warning/30 border-0">Soon</Badge>
                  : <Badge className="bg-success/20 text-success hover:bg-success/30 border-0">Active</Badge>}
              </Td>
            </tr>
          ))}
        </tbody>
      </table>
    </Wrap>
  );
}

function Wrap({ title, subtitle, delay, children }: { title: string; subtitle?: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="glass rounded-2xl p-5 overflow-hidden"
    >
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="overflow-x-auto">{children}</div>
    </motion.div>
  );
}

const Th = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <th className={`pb-3 font-medium ${className}`}>{children}</th>
);
const Td = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <td className={`py-3 ${className}`}>{children}</td>
);