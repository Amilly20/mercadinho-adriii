import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useNavigate, useSearchParams } from "react-router-dom";

const products = [
  { id: 1, name: "Tomate", price: "R$ 6,99", unit: "kg", discount: "15% OFF", category: "verduras", image: "/src/Ativos/produtos/tomate.jpg" },
  { id: 2, name: "Banana", price: "R$ 4,99", unit: "kg", discount: null, category: "frutas", image: "/src/Ativos/produtos/banana.jpg" },
  { id: 3, name: "Pão Francês", price: "R$ 12,99", unit: "kg", discount: "10% OFF", category: "padaria", image: "/src/Ativos/produtos/pao-frances.jpg" },
  { id: 4, name: "Leite Integral", price: "R$ 5,49", unit: "L", discount: null, category: "laticinios", image: "/src/Ativos/produtos/leite.jpg" },
  { id: 5, name: "Alface", price: "R$ 3,99", unit: "unid", discount: null, category: "verduras", image: "/src/Ativos/produtos/alface.jpg" },
  { id: 6, name: "Queijo Minas", price: "R$ 38,90", unit: "kg", discount: "20% OFF", category: "laticinios", image: "/src/Ativos/produtos/queijo-minas.jpg" },
  { id: 7, name: "Maçã", price: "R$ 8,99", unit: "kg", discount: null, category: "frutas", image: "/src/Ativos/produtos/maca.jpg" },
  { id: 8, name: "Iogurte Natural", price: "R$ 4,99", unit: "unid", discount: null, category: "laticinios", image: "/src/Ativos/produtos/iogurte.jpg" },
  { id: 9, name: "Carne Moída", price: "R$ 24,99", unit: "kg", discount: "15% OFF", category: "carnes", image: "/src/Ativos/produtos/carne-moida.jpg" },
  { id: 10, name: "Refrigerante", price: "R$ 6,99", unit: "unid", discount: null, category: "bebidas", image: "/src/Ativos/produtos/refrigerante.jpg" },
  { id: 11, name: "Detergente", price: "R$ 3,49", unit: "unid", discount: null, category: "limpeza", image: "/src/Ativos/produtos/detergente.jpg" },
];

const ProductsGrid = () => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("categoria");

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
          <p className="text-center text-muted-foreground py-12">
            Nenhum produto encontrado nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300"
            >
              <div 
                className="relative cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                {product.discount && (
                  <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
                    {product.discount}
                  </div>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 left-2 bg-white/90 hover:bg-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(product);
                  }}
                >
                  <Heart
                    className={`h-4 w-4 transition-all ${
                      isFavorite(product.id)
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
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
                  <span className="text-2xl font-bold text-primary">{product.price}</span>
                  <span className="text-sm text-muted-foreground">/{product.unit}</span>
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
        )}
      </div>
    </section>
  );
};

export default ProductsGrid;
