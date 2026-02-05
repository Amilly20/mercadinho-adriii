import { Percent, Apple, Leaf, Beef, Coffee, Milk, Croissant, Sparkles } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const categories = [
  { title: "Ofertas", icon: Percent, value: "ofertas" },
  { title: "Frutas", icon: Apple, value: "frutas" },
  { title: "Verduras", icon: Leaf, value: "verduras" },
  { title: "Carnes", icon: Beef, value: "carnes" },
  { title: "Bebidas", icon: Coffee, value: "bebidas" },
  { title: "Laticínios", icon: Milk, value: "laticinios" },
  { title: "Padaria", icon: Croissant, value: "padaria" },
  { title: "Limpeza", icon: Sparkles, value: "limpeza" },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentCategory = searchParams.get("categoria");

  const handleCategoryClick = (category: string) => {
    navigate(`/?categoria=${category}`);
  };

  return (
    <Sidebar collapsible="offcanvas">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold text-base">
            Categorias
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    className={`hover:bg-primary/10 hover:text-primary transition-colors ${
                      currentCategory === item.value ? "bg-primary/20 text-primary font-semibold" : ""
                    }`}
                    tooltip={item.title}
                    onClick={() => handleCategoryClick(item.value)}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
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
