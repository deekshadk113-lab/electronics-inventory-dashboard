import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Area, AreaChart,
  BarChart, Bar,
} from "recharts";
import { motion } from "framer-motion";
import type { Product, Sale } from "@/lib/mockData";

const PIE_COLORS = ["hsl(188 95% 55%)", "hsl(265 85% 65%)", "hsl(295 90% 60%)", "hsl(152 80% 50%)", "hsl(38 95% 60%)", "hsl(220 80% 60%)"];

const tooltipStyle = {
  contentStyle: {
    background: "hsl(230 35% 8% / 0.95)",
    border: "1px solid hsl(0 0% 100% / 0.1)",
    borderRadius: 12,
    backdropFilter: "blur(12px)",
    color: "hsl(210 40% 98%)",
  },
  labelStyle: { color: "hsl(220 15% 65%)", fontSize: 12 },
};

export function CategoryPie({ products }: { products: Product[] }) {
  const map = new Map<string, number>();
  products.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + p.stock));
  const data = [...map].map(([name, value]) => ({ name, value }));
  return (
    <ChartCard title="Category Distribution" subtitle="Stock by category" delay={0.1}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3} stroke="none">
            {data.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
          </Pie>
          <Tooltip {...tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="ml-auto font-medium">{d.value}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  );
}

export function SalesLine({ sales }: { sales: Sale[] }) {
  return (
    <ChartCard title="Monthly Sales" subtitle="Revenue trend over the year" delay={0.15}>
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={sales}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(188 95% 55%)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="hsl(188 95% 55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 100% / 0.06)" />
          <XAxis dataKey="month" stroke="hsl(220 15% 65%)" fontSize={11} />
          <YAxis stroke="hsl(220 15% 65%)" fontSize={11} />
          <Tooltip {...tooltipStyle} />
          <Area type="monotone" dataKey="revenue" stroke="hsl(188 95% 55%)" strokeWidth={2.5} fill="url(#rev)" />
          <Line type="monotone" dataKey="units" stroke="hsl(295 90% 60%)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function TopProductsBar({ products }: { products: Product[] }) {
  const data = [...products].sort((a, b) => b.sold - a.sold).slice(0, 6).map(p => ({ name: p.name.split(" ").slice(0, 2).join(" "), sold: p.sold }));
  return (
    <ChartCard title="Top Selling Products" subtitle="Units sold (top 6)" delay={0.2}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(295 90% 60%)" />
              <stop offset="100%" stopColor="hsl(188 95% 55%)" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 100% / 0.06)" />
          <XAxis dataKey="name" stroke="hsl(220 15% 65%)" fontSize={10} />
          <YAxis stroke="hsl(220 15% 65%)" fontSize={11} />
          <Tooltip {...tooltipStyle} cursor={{ fill: "hsl(0 0% 100% / 0.04)" }} />
          <Bar dataKey="sold" fill="url(#bar)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ title, subtitle, children, delay = 0 }: { title: string; subtitle?: string; children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="glass rounded-2xl p-5"
    >
      <div className="mb-4">
        <h3 className="text-sm font-semibold">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}