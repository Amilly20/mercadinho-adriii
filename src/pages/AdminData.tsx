import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Database, Users, Briefcase, Table as TableIcon } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const AdminData = () => {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState<any[]>([]);
  const [funcionarios, setFuncionarios] = useState<any[]>([]);

  useEffect(() => {
    // Simulando os dados que foram inseridos no banco_de_dados.sql
    setClientes([
      { id: 1, nome: 'ana silva', telefone: '779999999', rua: 'rua das flores', bairro: 'centro' },
      { id: 2, nome: 'carlos souza', telefone: '778888888', rua: 'rua bela vista', bairro: 'primavera' },
      { id: 3, nome: 'marcos lima', telefone: '779777777', rua: 'rua c', bairro: 'morumbi' },
      { id: 4, nome: 'juliana santos', telefone: '779666666', rua: 'avenida brasil', bairro: 'clodoaldo' },
      { id: 5, nome: 'paulo rocha', telefone: '779555555', rua: 'rua e', bairro: 'nova itapetinga' }
    ]);

    setFuncionarios([
      { id: 1, nome: 'joao pereira', cargo: 'caixa', telefone: '779111111', salario: 'R$ 1500,00' },
      { id: 2, nome: 'maria costa', cargo: 'repositor(a)', telefone: '779222222', salario: 'R$ 1400,00' },
      { id: 3, nome: 'pedro alves', cargo: 'gerente', telefone: '779333333', salario: 'R$ 3500,00' },
      { id: 4, nome: 'carla souza', cargo: 'caixa', telefone: '779444444', salario: 'R$ 1500,00' },
      { id: 5, nome: 'lucas mendes', cargo: 'estoquista', telefone: '779555555', salario: 'R$ 1600,00' }
    ]);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="icon" onClick={() => navigate("/admin")}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Database className="h-8 w-8 text-primary" />
                Banco de Dados
              </h1>
            </div>

            <Tabs defaultValue="clientes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                <TabsTrigger value="clientes" className="flex gap-2">
                  <Users className="h-4 w-4" /> Clientes
                </TabsTrigger>
                <TabsTrigger value="funcionarios" className="flex gap-2">
                  <Briefcase className="h-4 w-4" /> Funcionários
                </TabsTrigger>
              </TabsList>

              <TabsContent value="clientes" className="mt-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><TableIcon className="h-5 w-5" /> Tabela: cliente</CardTitle></CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Nome</th><th className="px-4 py-3">Telefone</th><th className="px-4 py-3">Endereço</th><th className="px-4 py-3">Bairro</th></tr></thead>
                        <tbody className="divide-y">{clientes.map((c) => (
                          <tr key={c.id} className="hover:bg-muted/50"><td className="px-4 py-3">{c.id}</td><td className="px-4 py-3 font-medium capitalize">{c.nome}</td><td className="px-4 py-3">{c.telefone}</td><td className="px-4 py-3 capitalize">{c.rua}</td><td className="px-4 py-3 capitalize">{c.bairro}</td></tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="funcionarios" className="mt-6">
                <Card>
                  <CardHeader><CardTitle className="flex items-center gap-2"><TableIcon className="h-5 w-5" /> Tabela: funcionario</CardTitle></CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-muted text-muted-foreground"><tr><th className="px-4 py-3">ID</th><th className="px-4 py-3">Nome</th><th className="px-4 py-3">Cargo</th><th className="px-4 py-3">Telefone</th><th className="px-4 py-3">Salário</th></tr></thead>
                        <tbody className="divide-y">{funcionarios.map((f) => (
                          <tr key={f.id} className="hover:bg-muted/50"><td className="px-4 py-3">{f.id}</td><td className="px-4 py-3 font-medium capitalize">{f.nome}</td><td className="px-4 py-3 capitalize">{f.cargo}</td><td className="px-4 py-3">{f.telefone}</td><td className="px-4 py-3 text-green-600 font-medium">{f.salario}</td></tr>
                        ))}</tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminData;