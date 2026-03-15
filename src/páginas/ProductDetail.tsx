import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Star, Heart, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

const defaultExtraInfo: Record<number, any> = {
  1: { description: "Tomates frescos e suculentos, ideais para saladas e molhos.", rating: 4.5, reviews: 42 },
  2: { description: "Bananas maduras e doces, perfeitas para lanches saudáveis.", rating: 4.8, reviews: 58 },
  3: { description: "Pão francês quentinho, assado diariamente.", rating: 4.7, reviews: 123 },
  4: { description: "Leite integral fresco, rico em cálcio e vitaminas.", rating: 4.6, reviews: 67 },
  5: { description: "Alface crocante e fresca, perfeita para saladas.", rating: 4.4, reviews: 34 },
  6: { description: "Queijo minas artesanal, sabor único e inconfundível.", rating: 4.9, reviews: 91 },
  7: { description: "Maçãs vermelhas crocantes e doces.", rating: 4.5, reviews: 45 },
  8: { description: "Iogurte natural cremoso, fonte de probióticos.", rating: 4.7, reviews: 78 },
};

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    let allProducts = [];
    if (storedProducts) {
      allProducts = JSON.parse(storedProducts);
    }

    const found = allProducts.find((p: any) => p.id === Number(id));
    if (found) {
      const extraInfo = defaultExtraInfo[found.id] || {
        description: "Produto fresco e de alta qualidade, selecionado especialmente para você.",
        rating: 4.5,
        reviews: 15
      };
      setProduct({ ...found, ...extraInfo });
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

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
                  <div className="aspect-square bg-gradient-to-br from-secondary to-muted flex items-center justify-center relative overflow-hidden">
                    {product.image && product.image.trim() !== "" ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`flex flex-col items-center justify-center text-muted-foreground ${product.image ? 'hidden' : ''}`}>
                      <ImageOff className="h-24 w-24 mb-4 opacity-50" />
                      <span className="text-lg">Sem imagem</span>
                    </div>
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
