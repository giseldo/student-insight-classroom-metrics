
import Header from "@/components/Header";
import CourseCard, { CourseData } from "@/components/CourseCard";
import { useState } from "react";
import { Clock, BookOpen, Eye } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import AssignmentList, { Assignment } from "@/components/AssignmentList";

const StudentDashboard = () => {
  const [courses] = useState<CourseData[]>([
    {
      id: "course1",
      title: "Matemática Avançada",
      subject: "Matemática",
      teacher: "Silva",
      coverColor: "#1967d2"
    },
    {
      id: "course2",
      title: "Literatura Brasileira",
      subject: "Português",
      teacher: "Silva",
      coverColor: "#34a853"
    },
    {
      id: "course3",
      title: "Física Quântica",
      subject: "Física",
      teacher: "Silva",
      coverColor: "#ea4335"
    },
  ]);
  
  const [assignments] = useState<Assignment[]>([
    {
      id: "assignment1",
      title: "Lista de Exercícios 3 - Derivadas",
      dueDate: "18/05/2025",
      status: "pending"
    },
    {
      id: "assignment2",
      title: "Análise de 'Memórias Póstumas de Brás Cubas'",
      dueDate: "15/05/2025",
      status: "completed"
    },
    {
      id: "assignment3",
      title: "Trabalho sobre Partículas Quânticas",
      dueDate: "10/05/2025",
      status: "late"
    }
  ]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="student" />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Painel do Aluno</h1>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <MetricCard
            title="Tempo de Estudo"
            value="12h 30m"
            description="Esta semana"
            icon={Clock}
            trend={{ value: 15, isPositive: true }}
          />
          <MetricCard
            title="Materiais Visualizados"
            value={28}
            description="De 57 materiais disponíveis"
            icon={Eye}
          />
          <MetricCard
            title="Taxa de Conclusão"
            value="78%"
            description="Das atividades atribuídas"
            icon={BookOpen}
            trend={{ value: 5, isPositive: true }}
          />
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-8">
          <AssignmentList assignments={assignments} userType="student" />
        </div>
        
        <h2 className="text-xl font-medium mb-4">Seus Cursos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} userType="student" />
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;
