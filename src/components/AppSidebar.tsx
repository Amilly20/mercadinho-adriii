import { Home, ShoppingBag, Apple, Coffee, Milk, Search, Package } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate, useSearchParams } from "react-router-dom";

const categories = [
  { title: "Todos", icon: Home, slug: "all" },
  { title: "Hortifruti", icon: Apple, slug: "hortifruti" },
  { title: "Padaria", icon: Coffee, slug: "padaria" },
  { title: "Laticínios", icon: Milk, slug: "laticinios" },
  { title: "Bebidas", icon: ShoppingBag, slug: "bebidas" },
  { title: "Outros", icon: Package, slug: "outros" },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryClick = (slug: string) => {
    if (slug === "all") {
      navigate("/");
    } else {
      navigate(`/?category=${slug}`);
    }
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Categorias</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={currentCategory === item.slug}
                    onClick={() => handleCategoryClick(item.slug)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
