
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import MetricCard from "@/components/MetricCard";
import { Clock, Eye, Users, BookOpen } from "lucide-react";
import EngagementChart from "@/components/EngagementChart";
import StudentTable from "@/components/StudentTable";

const CourseTeacher = () => {
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
  
  const students = [
    {
      id: "student1",
      name: "Ana Silva",
      email: "ana.silva@estudante.edu",
      metrics: {
        assignments: {
          completed: 8,
          total: 10,
        },
        timeSpent: 320,
        materials: {
          viewed: 15,
          total: 24,
        },
        lastActivity: "Hoje, 14:30",
      },
    },
    {
      id: "student2",
      name: "Pedro Santos",
      email: "pedro.santos@estudante.edu",
      metrics: {
        assignments: {
          completed: 7,
          total: 10,
        },
        timeSpent: 285,
        materials: {
          viewed: 18,
          total: 24,
        },
        lastActivity: "Ontem, 19:45",
      },
    },
    {
      id: "student3",
      name: "Carla Mendes",
      email: "carla.mendes@estudante.edu",
      metrics: {
        assignments: {
          completed: 10,
          total: 10,
        },
        timeSpent: 410,
        materials: {
          viewed: 24,
          total: 24,
        },
        lastActivity: "Hoje, 10:15",
      },
    },
    {
      id: "student4",
      name: "Lucas Oliveira",
      email: "lucas.oliveira@estudante.edu",
      metrics: {
        assignments: {
          completed: 5,
          total: 10,
        },
        timeSpent: 180,
        materials: {
          viewed: 12,
          total: 24,
        },
        lastActivity: "3 dias atrás",
      },
    },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="teacher" />
      
      <div className="flex">
        <Sidebar courseId={courseId} userType="teacher" />
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{courseName}</h1>
          
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
              icon={BookOpen}
              trend={{ value: 4, isPositive: false }}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <EngagementChart
              title="Engajamento do Curso"
              data={chartData}
            />
          </div>
          
          <StudentTable students={students} />
        </main>
      </div>
    </div>
  );
};

export default CourseTeacher;
