import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart, ImageOff } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
  discount?: string;
  category?: string;
  image?: string;
}

const defaultProducts = [
  { id: 1, name: "Tomate", price: "R$ 6,99", unit: "kg", discount: "15% OFF", category: "verduras", image: "/src/Ativos/produtos/tomate.jpg" },
  { id: 2, name: "Banana", price: "R$ 4,99", unit: "kg", category: "frutas", image: "/src/Ativos/produtos/banana.jpg" },
  { id: 3, name: "Pão Francês", price: "R$ 12,99", unit: "kg", discount: "10% OFF", category: "padaria", image: "/src/Ativos/produtos/pao-frances.jpg" },
  { id: 4, name: "Leite Integral", price: "R$ 5,49", unit: "L", category: "laticinios", image: "/src/Ativos/produtos/leite.jpg" },
  { id: 5, name: "Alface", price: "R$ 3,99", unit: "unid", category: "verduras", image: "/src/Ativos/produtos/alface.jpg" },
  { id: 6, name: "Queijo Minas", price: "R$ 38,90", unit: "kg", discount: "20% OFF", category: "laticinios", image: "/src/Ativos/produtos/queijo-minas.jpg" },
  { id: 7, name: "Maçã", price: "R$ 8,99", unit: "kg", category: "frutas", image: "/src/Ativos/produtos/maca.jpg" },
  { id: 8, name: "Iogurte Natural", price: "R$ 4,99", unit: "unid", category: "laticinios", image: "/src/Ativos/produtos/iogurte.jpg" },
];

const ProductsGrid = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("categoria");

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(defaultProducts);
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }
  }, []);

  const filteredProducts = categoryFilter
    ? categoryFilter === "ofertas"
      ? products.filter(p => p.discount)
      : products.filter(p => p.category === categoryFilter)
    : products;

  const getCategoryTitle = () => {
    if (!categoryFilter) return "Produtos em Destaque";
    if (categoryFilter === "ofertas") return "Ofertas da Semana";
    const categoryNames: { [key: string]: string } = {
      frutas: "Frutas",
      verduras: "Verduras",
      padaria: "Padaria",
      laticinios: "Laticínios",
      carnes: "Carnes",
      bebidas: "Bebidas",
      limpeza: "Limpeza"
    };
    return categoryNames[categoryFilter] || "Produtos";
  };

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground mb-8">{getCategoryTitle()}</h2>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>Nenhum produto encontrado nesta categoria.</p>
            <Button variant="link" onClick={() => navigate("/")}>Ver todos os produtos</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 border-border/50">
                <div className="relative cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    {product.image && product.image.trim() !== "" ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`flex flex-col items-center justify-center text-muted-foreground ${product.image ? 'hidden' : ''}`}>
                      <ImageOff className="h-12 w-12 mb-2 opacity-50" />
                      <span className="text-xs">Sem imagem</span>
                    </div>
                    
                    {product.discount && (
                      <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground font-bold animate-pulse">
                        {product.discount}
                      </Badge>
                    )}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm hover:bg-background hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product);
                    }}
                  >
                    <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 
                    className="font-semibold text-lg mb-1 truncate cursor-pointer hover:text-primary transition-colors"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-primary">{product.price}</span>
                    <span className="text-sm text-muted-foreground">/{product.unit}</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full font-semibold shadow-sm" onClick={() => addToCart(product)}>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
