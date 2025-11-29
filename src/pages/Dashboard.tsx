import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, Search, CheckCircle, AlertCircle, Plus, Link as LinkIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    lost: 0,
    found: 0,
    matched: 0,
    returned: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      const { data: items, error } = await supabase
        .from('items')
        .select('id, status, is_lost, user_id')
        .eq('user_id', user?.id || '');

      if (error) throw error;

      // Buscar correspondências ativas (não rejeitadas) do usuário
      const userItemIds = items?.map(item => item.id) || [];
      
      let matchedCount = 0;
      if (userItemIds.length > 0) {
        const { data: matches } = await supabase
          .from('matches')
          .select('id, status')
          .or(`lost_item_id.in.(${userItemIds.join(",")}),found_item_id.in.(${userItemIds.join(",")})`)
          .in('status', ['pending', 'accepted', 'claimed']);

        matchedCount = matches?.length || 0;
      }

      const lost = items?.filter(item => item.is_lost && item.status === 'lost').length || 0;
      const found = items?.filter(item => !item.is_lost && item.status === 'found').length || 0;
      const returned = items?.filter(item => item.status === 'returned').length || 0;

      setStats({ lost, found, matched: matchedCount, returned });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white shadow-lg">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Achados e Perdidos</h1>
              <p className="text-sm text-muted-foreground">Sistema de Gestão</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h2 className="text-4xl font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">Visão geral do sistema de achados e perdidos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="border-l-4 border-l-warning transition-all duration-200 hover:shadow-md bg-card">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Itens Perdidos</CardDescription>
              <CardTitle className="text-4xl font-bold mt-2">{stats.lost}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-warning" />
                </div>
                <span>Aguardando localização</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success transition-all duration-200 hover:shadow-md bg-card">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Itens Encontrados</CardDescription>
              <CardTitle className="text-4xl font-bold mt-2">{stats.found}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <Search className="w-4 h-4 text-success" />
                </div>
                <span>Disponíveis</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-primary transition-all duration-200 hover:shadow-md bg-card">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Correspondências</CardDescription>
              <CardTitle className="text-4xl font-bold mt-2">{stats.matched}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <span>Em processo</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-success transition-all duration-200 hover:shadow-md bg-card">
            <CardHeader className="pb-3">
              <CardDescription className="text-sm font-medium">Devolvidos</CardDescription>
              <CardTitle className="text-4xl font-bold mt-2">{stats.returned}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <span>Concluídos</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="group transition-colors duration-200 hover:shadow-md bg-card border hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-warning" />
              </div>
              <CardTitle className="text-xl mb-2">Registrar Item Perdido</CardTitle>
              <CardDescription className="text-base">
                Registre um item que você perdeu para que possamos ajudá-lo a encontrá-lo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full shadow-md hover:shadow-lg transition-all" 
                onClick={() => navigate('/register-lost')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Registrar Item Perdido
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-colors duration-200 hover:shadow-md bg-card border hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Plus className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-xl mb-2">Registrar Item Encontrado</CardTitle>
              <CardDescription className="text-base">
                Encontrou algo? Registre aqui para ajudar o proprietário a recuperá-lo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full shadow-md hover:shadow-lg transition-all"
                onClick={() => navigate('/register-found')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Registrar Item Encontrado
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-colors duration-200 hover:shadow-md bg-card border hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">Buscar Itens</CardTitle>
              <CardDescription className="text-base">
                Navegue pela lista de itens perdidos e encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full shadow-md hover:shadow-lg transition-all" 
                variant="outline"
                onClick={() => navigate('/search-items')}
              >
                <Search className="w-4 h-4 mr-2" />
                Ver Todos os Itens
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-colors duration-200 hover:shadow-md bg-card border hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-xl mb-2">Meus Itens</CardTitle>
              <CardDescription className="text-base">
                Visualize e gerencie os itens que você registrou
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full shadow-md hover:shadow-lg transition-all" 
                variant="outline"
                onClick={() => navigate('/my-items')}
              >
                <Package className="w-4 h-4 mr-2" />
                Meus Registros
              </Button>
            </CardContent>
          </Card>

          <Card className="group transition-colors duration-200 hover:shadow-md bg-card border hover:border-primary/30">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <LinkIcon className="w-6 h-6 text-success" />
              </div>
              <CardTitle className="text-xl mb-2">Correspondências</CardTitle>
              <CardDescription className="text-base">
                Veja possíveis matches e gerencie o processo de devolução
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full shadow-md hover:shadow-lg transition-all" 
                variant="outline"
                onClick={() => navigate('/matches')}
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Ver Correspondências
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;