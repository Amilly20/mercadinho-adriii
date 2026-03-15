import { ShoppingCart, Moon, Sun, User, Heart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useTheme } from "@/components/ThemeProvider";
import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/SearchBar";
import { useState } from "react";

const Header = () => {
  const { getItemCount } = useCart();
  const { favorites } = useFavorites();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const itemCount = getItemCount();

  const handleLogout = () => {
    localStorage.removeItem("roleSelected");
    window.location.href = import.meta.env.BASE_URL; // Recarrega na base correta do site
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-md border-b border-primary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <SidebarTrigger className="md:mr-2" />

          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <div className="h-10 w-10 rounded-full bg-white overflow-hidden flex items-center justify-center border-2 border-white/30 shadow-sm">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyAPqza9WGtVPVqVWlk-f7Wg8fm2MF9UgAmw&s" alt="Logo Mercadinho" className="h-full w-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-white">Mercado Adri Pimentinha</h1>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <SearchBar value={searchValue} onChange={setSearchValue} className="w-full" />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden sm:flex text-white hover:bg-white/10"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const usersRaw = localStorage.getItem("users");
                const users = usersRaw ? JSON.parse(usersRaw) : [];
                if (users.length > 0) navigate("/profile");
                else navigate("/signup");
              }}
              className="hidden sm:flex text-white hover:bg-white/10"
            >
              <User className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/favorites")}
              className="relative text-white hover:bg-white/10"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Button>

            <Button 
              variant="secondary" 
              size="default" 
              className="relative bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline ml-2">Carrinho</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-white hover:bg-white/10 ml-1"
              title="Sair / Trocar Perfil"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="md:hidden pb-3">
          <SearchBar value={searchValue} onChange={setSearchValue} className="w-full" />
        </div>
      </div>
    </header>
  );
};

export default Header;
