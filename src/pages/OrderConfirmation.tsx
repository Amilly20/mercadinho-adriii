import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const { items, clearCart, getTotal } = useCart();
  const navigate = useNavigate();

  const total = getTotal();

  const handleClear = () => {
    clearCart();
    navigate("/");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-6">Pedido Confirmado</h1>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Itens do Pedido</h2>
                    {items.length === 0 ? (
                      <p className="text-muted-foreground">Seu carrinho está vazio.</p>
                    ) : (
                      <ul className="space-y-3">
                        {items.map((it) => (
                          <li key={it.id} className="flex justify-between">
                            <span>{it.name} x{it.quantity}</span>
                            <span>R$ {(
                              parseFloat(it.price.replace("R$", "").replace(",", ".")) * it.quantity
                            ).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                <div>
                  <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Resumo</h2>
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total</span>
                      <span className="text-primary">R$ {total.toFixed(2)}</span>
                    </div>
                    <Button onClick={handleClear} className="w-full">Finalizar e limpar carrinho</Button>
                  </div>
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

export default OrderConfirmation;
