
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Clock, Eye, Users, BookOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-classroom-primary text-white">
        <div className="container mx-auto py-6 px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-md bg-white flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-classroom-primary">
                <path d="M18 2H8a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Z"/>
                <path d="M10 10.5h1v3h-1z"/>
                <path d="M14 10.5h-1v3h1z"/>
                <path d="M10 7.5h4"/>
              </svg>
            </div>
            <span className="text-2xl font-bold">EduMetrics</span>
          </div>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4">
              Sala de Aula com Métricas Detalhadas de Engajamento
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Acompanhe o tempo gasto em tarefas, visualizações de materiais e muito mais
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-classroom-primary hover:bg-classroom-primary/90"
                onClick={() => navigate("/teacher")}
              >
                Entrar como Professor
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/student")}
              >
                Entrar como Aluno
              </Button>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-classroom-muted flex items-center justify-center">
                <Clock className="h-6 w-6 text-classroom-primary" />
              </div>
              <h2 className="text-2xl font-bold">Rastreie o Tempo de Estudo</h2>
              <p className="text-muted-foreground">
                Obtenha dados precisos sobre quanto tempo cada aluno investe em tarefas, 
                materiais de estudo e atividades, permitindo intervenções personalizadas.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-classroom-muted flex items-center justify-center">
                <Eye className="h-6 w-6 text-classroom-primary" />
              </div>
              <h2 className="text-2xl font-bold">Monitore Visualizações</h2>
              <p className="text-muted-foreground">
                Saiba quais materiais são mais acessados, quanto tempo é gasto em cada 
                visualização e identifique alunos que precisam de mais incentivo.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-classroom-muted flex items-center justify-center">
                <Users className="h-6 w-6 text-classroom-primary" />
              </div>
              <h2 className="text-2xl font-bold">Análise de Desempenho</h2>
              <p className="text-muted-foreground">
                Compare o engajamento entre alunos, turmas e períodos, com relatórios 
                detalhados e visualizações gráficas para tomada de decisão.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-classroom-muted flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-classroom-primary" />
              </div>
              <h2 className="text-2xl font-bold">Intervenção em Tempo Real</h2>
              <p className="text-muted-foreground">
                Receba alertas quando alunos apresentam baixo engajamento e ofereça 
                suporte adicional antes que os problemas de aprendizado se agravem.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © 2025 EduMetrics - Plataforma de Sala de Aula com Métricas Avançadas
        </div>
      </footer>
    </div>
  );
};

export default Index;
