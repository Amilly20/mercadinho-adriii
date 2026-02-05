import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const products = [
  { id: 1, name: "Tomate", price: "R$ 6,99", unit: "kg", discount: "15% OFF", description: "Tomates frescos e suculentos, ideais para saladas e molhos.", rating: 4.5, reviews: 42 },
  { id: 2, name: "Banana", price: "R$ 4,99", unit: "kg", description: "Bananas maduras e doces, perfeitas para lanches saudáveis.", rating: 4.8, reviews: 58 },
  { id: 3, name: "Pão Francês", price: "R$ 12,99", unit: "kg", discount: "10% OFF", description: "Pão francês quentinho, assado diariamente.", rating: 4.7, reviews: 123 },
  { id: 4, name: "Leite Integral", price: "R$ 5,49", unit: "L", description: "Leite integral fresco, rico em cálcio e vitaminas.", rating: 4.6, reviews: 67 },
  { id: 5, name: "Alface", price: "R$ 3,99", unit: "unid", description: "Alface crocante e fresca, perfeita para saladas.", rating: 4.4, reviews: 34 },
  { id: 6, name: "Queijo Minas", price: "R$ 38,90", unit: "kg", discount: "20% OFF", description: "Queijo minas artesanal, sabor único e inconfundível.", rating: 4.9, reviews: 91 },
  { id: 7, name: "Maçã", price: "R$ 8,99", unit: "kg", description: "Maçãs vermelhas crocantes e doces.", rating: 4.5, reviews: 45 },
  { id: 8, name: "Iogurte Natural", price: "R$ 4,99", unit: "unid", description: "Iogurte natural cremoso, fonte de probióticos.", rating: 4.7, reviews: 78 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Button onClick={() => navigate("/")}>Voltar para início</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <Button
                variant="ghost"
                className="mb-6"
                onClick={() => navigate("/")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative">
                    <span className="text-9xl">🛒</span>
                    {product.discount && (
                      <Badge className="absolute top-4 right-4 text-lg px-3 py-1">
                        {product.discount}
                      </Badge>
                    )}
                  </div>
                </Card>

                <div className="space-y-6">
                  <div>
                    <h1 className="text-4xl font-bold text-foreground mb-2">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "fill-primary text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground">
                        {product.rating} ({product.reviews} avaliações)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-primary">
                      {product.price}
                    </span>
                    <span className="text-xl text-muted-foreground">
                      /{product.unit}
                    </span>
                  </div>

                  <p className="text-lg text-muted-foreground">
                    {product.description}
                  </p>

                  <div className="flex gap-3">
                    <Button
                      size="lg"
                      className="flex-1 text-lg h-14"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-6"
                      onClick={() => toggleFavorite(product)}
                    >
                      <Heart
                        className={`h-5 w-5 transition-all ${
                          isFavorite(product.id)
                            ? "fill-primary text-primary"
                            : ""
                        }`}
                      />
                    </Button>
                  </div>

                  <Card className="p-4 bg-secondary/30">
                    <h3 className="font-semibold mb-2">Informações do Produto</h3>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>✓ Produto fresco e de qualidade</li>
                      <li>✓ Entrega rápida</li>
                      <li>✓ Garantia de satisfação</li>
                    </ul>
                  </Card>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ProductDetail;
