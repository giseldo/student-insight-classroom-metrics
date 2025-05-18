
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import MaterialList, { Material } from "@/components/MaterialList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MaterialsStudentPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseName, setCourseName] = useState("Carregando...");
  
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
    {
      id: "material4",
      title: "Link para Khan Academy",
      type: "link",
      dateAdded: "08/05/2025"
    },
    {
      id: "material5",
      title: "Questionário de Revisão",
      type: "quiz",
      dateAdded: "10/05/2025"
    },
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
        <Sidebar courseId={courseId} activeItem="materials" userType="student" />
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{courseName} - Materiais</h1>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="quizzes">Questionários</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <MaterialList materials={materials} userType="student" />
            </TabsContent>
            <TabsContent value="documents">
              <MaterialList materials={materials.filter(m => m.type === 'document')} userType="student" />
            </TabsContent>
            <TabsContent value="videos">
              <MaterialList materials={materials.filter(m => m.type === 'video')} userType="student" />
            </TabsContent>
            <TabsContent value="links">
              <MaterialList materials={materials.filter(m => m.type === 'link')} userType="student" />
            </TabsContent>
            <TabsContent value="quizzes">
              <MaterialList materials={materials.filter(m => m.type === 'quiz')} userType="student" />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default MaterialsStudentPage;
