
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import AssignmentList, { Assignment } from "@/components/AssignmentList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AssignmentsStudentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseName, setCourseName] = useState("Carregando...");
  
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
    {
      id: "assignment3",
      title: "Questionário de Funções",
      dueDate: "10/05/2025",
      status: "completed"
    }
  ]);
  
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
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="student" />
      
      <div className="flex">
        <Sidebar courseId={courseId} activeItem="assignments" userType="student" />
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{courseName} - Atividades</h1>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="pending">Pendentes</TabsTrigger>
              <TabsTrigger value="completed">Concluídas</TabsTrigger>
              <TabsTrigger value="late">Atrasadas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <AssignmentList assignments={assignments} userType="student" />
            </TabsContent>
            <TabsContent value="pending">
              <AssignmentList assignments={assignments.filter(a => a.status === 'pending')} userType="student" />
            </TabsContent>
            <TabsContent value="completed">
              <AssignmentList assignments={assignments.filter(a => a.status === 'completed')} userType="student" />
            </TabsContent>
            <TabsContent value="late">
              <AssignmentList assignments={assignments.filter(a => a.status === 'late')} userType="student" />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AssignmentsStudentPage;
