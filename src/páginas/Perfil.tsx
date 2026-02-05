import { useState } from "react";
import { User, Package, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { toast } from "@/hooks/use-toast";

const mockOrders = [
  {
    id: "001",
    date: "2024-01-15",
    total: 156.43,
    status: "Entregue",
    items: 8,
  },
  {
    id: "002",
    date: "2024-01-10",
    total: 89.21,
    status: "Entregue",
    items: 5,
  },
  {
    id: "003",
    date: "2024-01-05",
    total: 234.56,
    status: "Entregue",
    items: 12,
  },
];

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 98765-4321",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    cep: "01234-567",
  });

  const handleSave = () => {
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

              <Tabs defaultValue="profile" className="space-y-8">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="profile">
                    <User className="h-4 w-4 mr-2" />
                    Dados Pessoais
                  </TabsTrigger>
                  <TabsTrigger value="orders">
                    <Package className="h-4 w-4 mr-2" />
                    Meus Pedidos
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="profile-name">Nome Completo</Label>
                        <Input
                          id="profile-name"
                          value={userData.name}
                          onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="profile-email">
                            <Mail className="h-4 w-4 inline mr-2" />
                            Email
                          </Label>
                          <Input
                            id="profile-email"
                            type="email"
                            value={userData.email}
                            onChange={(e) =>
                              setUserData({ ...userData, email: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="profile-phone">
                            <Phone className="h-4 w-4 inline mr-2" />
                            Telefone
                          </Label>
                          <Input
                            id="profile-phone"
                            value={userData.phone}
                            onChange={(e) =>
                              setUserData({ ...userData, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="profile-address">
                          <MapPin className="h-4 w-4 inline mr-2" />
                          Endereço
                        </Label>
                        <Input
                          id="profile-address"
                          value={userData.address}
                          onChange={(e) =>
                            setUserData({ ...userData, address: e.target.value })
                          }
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="profile-city">Cidade</Label>
                          <Input
                            id="profile-city"
                            value={userData.city}
                            onChange={(e) =>
                              setUserData({ ...userData, city: e.target.value })
                            }
                          />
                        </div>

                        <div>
                          <Label htmlFor="profile-cep">CEP</Label>
                          <Input
                            id="profile-cep"
                            value={userData.cep}
                            onChange={(e) =>
                              setUserData({ ...userData, cep: e.target.value })
                            }
                          />
                        </div>
                      </div>

                      <Button size="lg" onClick={handleSave}>
                        Salvar Alterações
                      </Button>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <div className="space-y-4">
                    {mockOrders.map((order) => (
                      <Card key={order.id} className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Package className="h-5 w-5 text-primary" />
                              <h3 className="font-semibold text-lg">
                                Pedido #{order.id}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Data: {new Date(order.date).toLocaleDateString("pt-BR")}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.items} itens
                            </p>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-2xl font-bold text-primary">
                                R$ {order.total.toFixed(2)}
                              </p>
                              <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                                {order.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Profile;
