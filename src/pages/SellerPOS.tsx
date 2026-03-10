import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, ShoppingCart, Trash2, LogOut, Plus, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { SidebarProvider } from "@/components/ui/sidebar";

interface Product {
  id: number;
  name: string;
  price: string;
  unit: string;
}

const SellerPOS = () => {
  const navigate = useNavigate();
  const { items, addToCart, removeFromCart, getTotal, clearCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    // Carregar produtos
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }

    // Carregar nome do vendedor
    const storedSeller = localStorage.getItem("sellerName");
    if (!storedSeller) {
      navigate("/seller-login");
    } else {
      setSellerName(storedSeller);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("sellerName");
    navigate("/");
  };

  const handleFinalizeSale = () => {
    if (items.length === 0) {
      toast({ title: "Erro", description: "O carrinho está vazio.", variant: "destructive" });
      return;
    }

    const total = getTotal();
    const ordersRaw = localStorage.getItem("orders");
    const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
    
    const newOrder = {
      id: Date.now(),
      items: [...items],
      total: total.toFixed(2),
      sellerName: sellerName, // Salva o nome do vendedor
      customer: { name: "Cliente no Balcão" }, // Cliente genérico para venda rápida
      createdAt: new Date().toISOString(),
      status: "Concluído"
    };

    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));
    
    clearCart();
    toast({
      title: "Venda Finalizada!",
      description: `Venda de R$ ${total.toFixed(2)} registrada com sucesso.`,
    });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background flex-col">
        {/* Header do Vendedor */}
        <header className="bg-primary text-primary-foreground p-4 flex justify-between items-center shadow-md">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center font-bold text-lg">
              {sellerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-lg">Caixa: {sellerName}</h1>
              <p className="text-xs opacity-80">Mercadinho Adri - PDV</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </header>

        <main className="flex-1 p-4 grid md:grid-cols-3 gap-6 overflow-hidden h-[calc(100vh-80px)]">
          {/* Lista de Produtos */}
          <div className="md:col-span-2 flex flex-col gap-4 h-full">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar produto por nome..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
                autoFocus
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto pr-2 pb-20">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="cursor-pointer hover:border-primary transition-all active:scale-95" onClick={() => addToCart(product)}>
                  <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                    <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center text-2xl">📦</div>
                    <h3 className="font-semibold leading-tight line-clamp-2">{product.name}</h3>
                    <p className="text-primary font-bold">{product.price}</p>
                    <Button size="sm" variant="outline" className="w-full mt-1">
                      <Plus className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Carrinho / Resumo */}
          <Card className="flex flex-col h-full border-l-4 border-l-primary shadow-lg">
            <CardHeader className="bg-muted/30 pb-2">
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" /> Carrinho Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-muted-foreground p-8 text-center">
                  <ShoppingCart className="h-12 w-12 mb-2 opacity-20" />
                  <p>Nenhum item adicionado</p>
                </div>
              ) : (
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-4 flex justify-between items-center hover:bg-muted/20">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.quantity} x {item.price}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => removeFromCart(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            <div className="p-6 bg-primary text-primary-foreground mt-auto">
              <div className="flex justify-between items-center mb-4 text-xl font-bold">
                <span>Total:</span>
                <span>R$ {getTotal().toFixed(2)}</span>
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="w-full font-bold text-lg h-14" 
                onClick={handleFinalizeSale}
                disabled={items.length === 0}
              >
                <CheckCircle className="mr-2 h-5 w-5" /> Finalizar Venda
              </Button>
            </div>
          </Card>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default SellerPOS;