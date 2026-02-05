import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
              <div className="text-center space-y-4">
                <Heart className="h-24 w-24 mx-auto text-muted-foreground" />
                <h2 className="text-2xl font-bold text-foreground">
                  Nenhum favorito ainda
                </h2>
                <p className="text-muted-foreground">
                  Adicione produtos aos seus favoritos para encontrá-los facilmente depois
                </p>
                <Button onClick={() => navigate("/")}>
                  Explorar Produtos
                </Button>
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="flex items-center gap-3 mb-8">
              <Heart className="h-8 w-8 text-primary fill-primary" />
              <h1 className="text-3xl font-bold text-foreground">
                Meus Favoritos
              </h1>
              <span className="text-muted-foreground">
                ({favorites.length} {favorites.length === 1 ? "item" : "itens"})
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {favorites.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div
                    className="relative cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      <span className="text-6xl">🛒</span>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(product.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <h3
                      className="font-semibold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors"
                      onClick={() => navigate(`/product/${product.id}`)}
                    >
                      {product.name}
                    </h3>
                    <div className="flex items-baseline gap-1 mb-3">
                      <span className="text-2xl font-bold text-primary">
                        {product.price}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        /{product.unit}
                      </span>
                    </div>
                    <Button
                      className="w-full"
                      size="sm"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Favorites;
