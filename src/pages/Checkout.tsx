import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";

const EMAIL_API_URL = "https://formsubmit.co/amillynolasco@gmail.com";

const checkoutSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres").max(100),
  email: z.string().email("Email inválido").max(255),
  phone: z.string().min(10, "Telefone inválido").max(15),
  address: z.string().min(10, "Endereço deve ter no mínimo 10 caracteres").max(200),
  city: z.string().min(3, "Cidade inválida").max(100),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP inválido"),
});

const Checkout = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cep: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const total = getTotal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      checkoutSchema.parse(formData);
      setLoading(true);
      
      // Removido o delay artificial para garantir que o WhatsApp abra sem bloqueios
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save order locally
      const ordersRaw = localStorage.getItem("orders");
      const orders = ordersRaw ? JSON.parse(ordersRaw) : [];
      const order = {
        id: Date.now(),
        items,
        total: total.toFixed(2),
        customer: formData,
        createdAt: new Date().toISOString(),
      };
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      // Integração com FormSubmit para enviar email
      try {
        console.log("Tentando enviar e-mail para:", EMAIL_API_URL);
        const response = await fetch(EMAIL_API_URL, {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                _cc: formData.email,
                _subject: `Novo Pedido #${order.id} - Mercadinho Adri`,
                _template: "table",
                _captcha: "false",
                
                Cliente: formData.name,
                Email: formData.email,
                Telefone: formData.phone,
                Endereco: `${formData.address}, ${formData.city} - ${formData.cep}`,
                
                Total: `R$ ${total.toFixed(2)}`,
                Itens: items.map(i => `${i.quantity}x ${i.name}`).join(', '),
                
                ID_Pedido: order.id,
                Data: new Date().toLocaleString('pt-BR')
            }),
        });

        if (response.ok) {
            console.log("E-mail enviado com sucesso pelo FormSubmit!");
        } else {
            console.error("Erro no FormSubmit. Status:", response.status, response.statusText);
        }
      } catch (error) {
        console.error("Erro de rede ao enviar email:", error);
      }

      toast({
        title: "Compra finalizada",
        description: `Seu pedido de R$ ${total.toFixed(2)} foi confirmado. Verifique seu e-mail.`,
      });

      navigate("/order-confirmation");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
        toast({
          title: "Erro no formulário",
          description: "Por favor, corrija os erros antes de continuar.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Carrinho vazio</h2>
                <Button onClick={() => navigate("/")}>Voltar para início</Button>
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
              <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <Card className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nome Completo *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={errors.name ? "border-destructive" : ""}
                        />
                        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={errors.email ? "border-destructive" : ""}
                          />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefone *</Label>
                          <Input
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={errors.phone ? "border-destructive" : ""}
                          />
                          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Endereço *</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          className={errors.address ? "border-destructive" : ""}
                        />
                        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">Cidade *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            className={errors.city ? "border-destructive" : ""}
                          />
                          {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <Label htmlFor="cep">CEP *</Label>
                          <Input
                            id="cep"
                            value={formData.cep}
                            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                            className={errors.cep ? "border-destructive" : ""}
                          />
                          {errors.cep && <p className="text-sm text-destructive mt-1">{errors.cep}</p>}
                        </div>
                      </div>
                      <Button type="submit" size="lg" className="w-full" disabled={loading}>
                        {loading ? "Processando..." : "Confirmar Pedido"}
                      </Button>
                    </form>
                  </Card>
                </div>
                <div>
                  <Card className="p-6 sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Resumo</h2>
                    <div className="space-y-2 mb-4">
                      {items.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.name} x{item.quantity}</span>
                          <span>R$ {(parseFloat(item.price.replace("R$", "").replace(",", ".")) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span className="text-primary">R$ {total.toFixed(2)}</span>
                      </div>
                    </div>
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

export default Checkout;
