
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import EngagementChart from "@/components/EngagementChart";
import MetricCard from "@/components/MetricCard";
import { Clock, Eye, Users, Book } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AnalyticsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseName, setCourseName] = useState("Carregando...");
  
  useEffect(() => {
    // Simulate loading course data
    setTimeout(() => {
      if (courseId === "course1") {
        setCourseName("Matemática Avançada");
      } else if (courseId === "course2") {
        setCourseName("Literatura Brasileira");
      } else if (courseId === "course3") {
        setCourseName("Física Quântica");
      } else if (courseId === "course4") {
        setCourseName("Biologia Celular");
      } else {
        setCourseName("Curso");
      }
    }, 500);
  }, [courseId]);
  
  const chartData = [
    { date: "01/05", views: 45, timeSpent: 28, participation: 85 },
    { date: "02/05", views: 52, timeSpent: 35, participation: 90 },
    { date: "03/05", views: 49, timeSpent: 30, participation: 82 },
    { date: "04/05", views: 60, timeSpent: 40, participation: 88 },
    { date: "05/05", views: 75, timeSpent: 55, participation: 95 },
    { date: "06/05", views: 65, timeSpent: 45, participation: 90 },
    { date: "07/05", views: 70, timeSpent: 50, participation: 92 },
  ];
  
  // Weekly statistics data
  const weeklyStats = [
    { 
      title: "Atividades Enviadas", 
      thisWeek: 24, 
      lastWeek: 18, 
      change: 33.3, 
      isPositive: true 
    },
    { 
      title: "Tempo Médio Por Aluno", 
      thisWeek: 45, 
      lastWeek: 38, 
      change: 18.4, 
      isPositive: true,
      unit: "min" 
    },
    { 
      title: "Taxa de Conclusão", 
      thisWeek: 78, 
      lastWeek: 82, 
      change: 4.9, 
      isPositive: false,
      unit: "%" 
    },
    { 
      title: "Alunos Ativos", 
      thisWeek: 26, 
      lastWeek: 20, 
      change: 30, 
      isPositive: true 
    }
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="teacher" />
      
      <div className="flex">
        <Sidebar courseId={courseId} activeItem="analytics" userType="teacher" />
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{courseName} - Análise</h1>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <MetricCard
              title="Alunos Ativos"
              value="28/32"
              description="Nos últimos 7 dias"
              icon={Users}
              trend={{ value: 5, isPositive: true }}
            />
            <MetricCard
              title="Horas de Engajamento"
              value={87}
              description="Tempo total de estudo"
              icon={Clock}
              trend={{ value: 12, isPositive: true }}
            />
            <MetricCard
              title="Visualizações"
              value={1245}
              description="Materiais e atividades"
              icon={Eye}
              trend={{ value: 8, isPositive: true }}
            />
            <MetricCard
              title="Taxa de Conclusão"
              value="76%"
              description="Das atividades atribuídas"
              icon={Book}
              trend={{ value: 4, isPositive: false }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <EngagementChart
              title="Engajamento do Curso"
              data={chartData}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas Semanais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {weeklyStats.map((stat, index) => (
                    <div key={index} className="border rounded-lg p-4 bg-white">
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <div className="flex items-end justify-between mt-1">
                        <div>
                          <p className="text-2xl font-bold">
                            {stat.thisWeek}{stat.unit || ""}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Semana passada: {stat.lastWeek}{stat.unit || ""}
                          </p>
                        </div>
                        <div className={`text-xs ${
                          stat.isPositive ? 'text-classroom-secondary' : 'text-classroom-accent'
                        } flex items-center`}>
                          {stat.isPositive ? '▲' : '▼'} {stat.change.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
