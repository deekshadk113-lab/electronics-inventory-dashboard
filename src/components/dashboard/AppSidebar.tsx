import { LayoutDashboard, Package, ShieldCheck, BarChart3, Settings, Cpu } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Overview", icon: LayoutDashboard, to: "/" },
  { title: "Inventory", icon: Package, to: "/inventory" },
  { title: "Analytics", icon: BarChart3, to: "/analytics" },
  { title: "Warranties", icon: ShieldCheck, to: "/warranties" },
  { title: "Settings", icon: Settings, to: "/settings" },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  return (
    <Sidebar collapsible="icon" className="border-r border-white/10">
      <SidebarHeader className="border-b border-white/10 p-4">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent glow">
            <Cpu className="h-5 w-5 text-background" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wider text-gradient">VOLTRIX</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Inventory OS</span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] uppercase tracking-widest">Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <NavLink to={item.to} end={item.to === "/"}>
                    {({ isActive }) => (
                      <SidebarMenuButton isActive={isActive} className="data-[active=true]:bg-primary/15 data-[active=true]:text-primary hover:bg-white/5">
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </SidebarMenuButton>
                    )}
                  </NavLink>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}