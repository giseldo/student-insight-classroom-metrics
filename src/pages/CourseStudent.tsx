
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import MetricCard from "@/components/MetricCard";
import { Clock, Eye, BookOpen } from "lucide-react";
import AssignmentList, { Assignment } from "@/components/AssignmentList";
import MaterialList, { Material } from "@/components/MaterialList";

const CourseStudent = () => {
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
  
  const [assignments] = useState<Assignment[]>([
    {
      id: "assignment1",
      title: "Lista de Exercícios 3 - Derivadas",
      dueDate: "18/05/2025",
      status: "pending"
    },
    {
      id: "assignment2",
      title: "Trabalho sobre Integrais",
      dueDate: "25/05/2025",
      status: "pending"
    },
  ]);
  
  const [materials] = useState<Material[]>([
    {
      id: "material1",
      title: "Apostila de Cálculo",
      type: "document",
      dateAdded: "01/05/2025"
    },
    {
      id: "material2",
      title: "Videoaula sobre Derivadas",
      type: "video",
      dateAdded: "03/05/2025"
    },
    {
      id: "material3",
      title: "Exercícios Complementares",
      type: "document",
      dateAdded: "05/05/2025"
    },
  ]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="student" />
      
      <div className="flex">
        <Sidebar courseId={courseId} userType="student" />
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{courseName}</h1>
          
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            <MetricCard
              title="Seu Tempo de Estudo"
              value="4h 15m"
              description="Neste curso"
              icon={Clock}
              trend={{ value: 20, isPositive: true }}
            />
            <MetricCard
              title="Materiais Vistos"
              value="12/24"
              description="50% do conteúdo"
              icon={Eye}
            />
            <MetricCard
              title="Atividades Concluídas"
              value="7/10"
              description="70% completo"
              icon={BookOpen}
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 mb-8">
            <AssignmentList assignments={assignments} userType="student" />
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <MaterialList materials={materials} userType="student" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseStudent;
