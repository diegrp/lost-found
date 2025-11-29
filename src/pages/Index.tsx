import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Package, Search, CheckCircle, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background via-success/5 to-primary/5 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <header className="container mx-auto px-4 py-6 relative z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <Package className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Achados e Perdidos
            </span>
          </button>
          <Button 
            onClick={() => navigate('/auth')} 
            variant="outline"
            className="backdrop-blur-sm bg-card/50 border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Entrar
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Sistema Inteligente de Gestão</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-primary via-primary/80 to-success bg-clip-text text-transparent leading-tight animate-slide-up">
            Reencontre o que Importa
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
            Sistema completo de gestão de achados e perdidos. Registre, busque e recupere itens de forma rápida e organizada com tecnologia de ponta.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up-delay-2">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')} 
              className="text-lg px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 bg-gradient-to-r from-primary to-primary/90"
            >
              Começar Agora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => navigate('/auth')} 
              className="text-lg px-8 py-6 h-auto backdrop-blur-sm bg-card/50 border-2 hover:bg-primary/10 transition-all duration-300"
            >
              Saber Mais
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="group p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warning/20 to-warning/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-8 h-8 text-warning" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Registre Facilmente</h3>
            <p className="text-muted-foreground leading-relaxed">
              Cadastre itens perdidos ou encontrados com descrições detalhadas e fotos para facilitar a identificação.
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Busca Inteligente</h3>
            <p className="text-muted-foreground leading-relaxed">
              Sistema de correspondência automática que sugere possíveis matches entre itens perdidos e encontrados.
            </p>
          </div>

          <div className="group p-8 rounded-3xl bg-card/80 backdrop-blur-sm border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-success/20 to-success/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Devolução Rápida</h3>
            <p className="text-muted-foreground leading-relaxed">
              Facilite a comunicação e agilize o processo de devolução dos itens aos seus proprietários.
            </p>
          </div>
        </div>

        {/* Additional features section */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Por que escolher nosso sistema?
            </h2>
            <p className="text-muted-foreground text-lg">
              Tecnologia avançada para garantir o melhor resultado
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Seguro e Confiável</h4>
                  <p className="text-muted-foreground text-sm">
                    Seus dados protegidos com criptografia de ponta a ponta
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-card to-card/50 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-success" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-2">Rápido e Eficiente</h4>
                  <p className="text-muted-foreground text-sm">
                    Interface intuitiva que acelera o processo de recuperação
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border/50 mt-32 relative z-10 backdrop-blur-sm bg-card/30">
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-white">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold">Achados e Perdidos</span>
          </div>
          <p className="text-muted-foreground">
            &copy; 2025 Achados e Perdidos. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
