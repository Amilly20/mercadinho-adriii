import { useState, useEffect } from "react";
import { User, Package, MapPin, Phone, Mail, LogOut } from "lucide-react";
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
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    cep: "",
  });

  // Carregar dados do usuário do localStorage ao abrir a página
  useEffect(() => {
    const usersRaw = localStorage.getItem("users");
    if (usersRaw) {
      const users = JSON.parse(usersRaw);
      if (users.length > 0) {
        // Pega o último usuário cadastrado (simulação de login)
        const currentUser = users[users.length - 1];
        setUserData(prev => ({
          ...prev,
          name: currentUser.name || "",
          email: currentUser.email || "",
          // Mantém os outros campos vazios para o usuário preencher
        }));
      } else {
        // Se não tiver usuário, manda pro cadastro
        navigate("/signup");
      }
    } else {
      navigate("/signup");
    }
  }, [navigate]);

  const handleSave = () => {
    // Atualiza os dados no localStorage
    const usersRaw = localStorage.getItem("users");
    if (usersRaw) {
      const users = JSON.parse(usersRaw);
      if (users.length > 0) {
        // Atualiza o último usuário
        users[users.length - 1] = { ...users[users.length - 1], ...userData };
        localStorage.setItem("users", JSON.stringify(users));
      }
    }

    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram salvas com sucesso.",
    });
  };

  const handleLogout = () => {
    // Limpa a "sessão" (neste caso simples, limpamos a role, mas mantemos os dados do usuário)
    localStorage.removeItem("roleSelected");
    // Opcional: Se quiser limpar os dados do usuário também: localStorage.removeItem("users");
    navigate("/");
    window.location.reload();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1">
            <div className="container mx-auto px-4 py-8">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Meu Perfil</h1>
                <Button variant="destructive" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              </div>

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
                            placeholder="(00) 00000-0000"
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
                          placeholder="Rua, Número, Bairro"
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
                  <Card className="p-6">
                    <div className="text-center text-muted-foreground py-8">
                      <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Você ainda não fez nenhum pedido.</p>
                      <Button variant="link" onClick={() => navigate("/")}>
                        Ir às compras
                      </Button>
                    </div>
                  </Card>
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
