import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  delta?: number;
  icon: LucideIcon;
  tone?: "primary" | "accent" | "warning" | "success";
  index?: number;
};

const toneMap = {
  primary: "from-primary/30 to-primary/0 text-primary",
  accent: "from-accent/30 to-accent/0 text-accent",
  warning: "from-warning/30 to-warning/0 text-warning",
  success: "from-success/30 to-success/0 text-success",
};

export function KpiCard({ label, value, delta, icon: Icon, tone = "primary", index = 0 }: Props) {
  const positive = (delta ?? 0) >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="glass relative overflow-hidden rounded-2xl p-5"
    >
      <div className={cn("absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br blur-2xl", toneMap[tone])} />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight">{value}</p>
          {delta !== undefined && (
            <div className={cn("mt-2 flex items-center gap-1 text-xs font-medium", positive ? "text-success" : "text-destructive")}>
              {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(delta)}% vs last month
            </div>
          )}
        </div>
        <div className={cn("grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/5", toneMap[tone].split(" ").pop())}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}