import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const usersRaw = localStorage.getItem("users");
    const users = usersRaw ? JSON.parse(usersRaw) : [];
    users.push({ id: Date.now(), ...form });
    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(() => {
      setLoading(false);
      navigate("/profile");
    }, 800);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 flex items-center justify-center">
            <div className="w-full max-w-md p-6">
              <div className="bg-white rounded-lg p-8 shadow">
                <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
                <p className="text-sm text-muted-foreground mb-6">Crie sua conta para acompanhar pedidos e aproveitar ofertas.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Nome completo"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    placeholder="Email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Input
                    placeholder="Senha"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <Button type="submit" className="w-full" disabled={loading}>{loading ? "Criando..." : "Criar Conta"}</Button>
                </form>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Signup;
