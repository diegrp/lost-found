import { useState } from "react";
import { Home, Search, Package, Plus, FileCheck, LogOut, Loader2 } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Meus Itens", url: "/my-items", icon: Package },
  { title: "Buscar Itens", url: "/search-items", icon: Search },
  { title: "Correspondências", url: "/matches", icon: FileCheck },
];

const registerItems = [
  { title: "Item Perdido", url: "/register-lost", icon: Plus },
  { title: "Item Encontrado", url: "/register-found", icon: Plus },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    const toastId = toast.loading("Encerrando sessão...");
    try {
      await signOut();
      toast.success("Logout realizado com sucesso");
    } catch (error) {
      toast.error("Erro ao fazer logout");
    } finally {
      toast.dismiss(toastId);
      setIsLoggingOut(false);
    }
  };

  if (!user) return null;

  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64 border-r border-border/50 bg-card"} collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Menu Principal
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
                      activeClassName="bg-primary/10 text-primary font-semibold shadow-sm"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Registrar
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {registerItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className="hover:bg-primary/10 hover:text-primary transition-all duration-300 rounded-lg"
                      activeClassName="bg-primary/10 text-primary font-semibold shadow-sm"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  onClick={handleLogout} 
                  className={`hover:bg-destructive/10 hover:text-destructive transition-all duration-300 rounded-lg ${isLoggingOut ? "opacity-60 pointer-events-none" : ""}`}
                  aria-busy={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="h-4 w-4" />
                  )}
                  {!isCollapsed && <span>{isLoggingOut ? "Saindo..." : "Sair"}</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
