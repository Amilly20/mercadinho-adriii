import { Link, useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();

  const total = getTotal();

  if (items.length === 0) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto" />
                <h2 className="text-2xl font-bold">Seu carrinho está vazio</h2>
                <p className="text-muted-foreground">
                  Adicione produtos ao carrinho para continuar
                </p>
                <Button size="lg" onClick={() => navigate("/")}>
                  Continuar Comprando
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
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold">Meu Carrinho</h1>
                <Button variant="outline" onClick={clearCart}>
                  Limpar Carrinho
                </Button>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-gradient-to-br from-secondary to-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-4xl">🛒</span>
                        </div>

                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-2">
                            {item.price}/{item.unit}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                size="icon"
                                variant="outline"
                                className="h-8 w-8"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <div>
                  <Card className="p-6 sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Subtotal</span>
                        <span>R$ {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground">
                        <span>Entrega</span>
                        <span className="text-primary">Grátis</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-primary">R$ {total.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      className="w-full mb-4"
                      onClick={() => navigate("/checkout")}
                    >
                      Finalizar Compra
                    </Button>

                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      onClick={() => navigate("/")}
                    >
                      Continuar Comprando
                    </Button>
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

export default Cart;
