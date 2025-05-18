
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import StudentTable from "@/components/StudentTable";

const StudentsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseName, setCourseName] = useState("Carregando...");
  
  const [students] = useState([
    {
      id: "student1",
      name: "Ana Silva",
      email: "ana.silva@estudante.edu",
      avatar: "",
      metrics: {
        assignments: {
          completed: 7,
          total: 10
        },
        timeSpent: 320, // minutes
        materials: {
          viewed: 15,
          total: 24
        },
        lastActivity: "Hoje, 14:30"
      }
    },
    {
      id: "student2",
      name: "Carlos Oliveira",
      email: "carlos.oliveira@estudante.edu",
      avatar: "",
      metrics: {
        assignments: {
          completed: 5,
          total: 10
        },
        timeSpent: 240, // minutes
        materials: {
          viewed: 12,
          total: 24
        },
        lastActivity: "Ontem, 16:45"
      }
    },
    {
      id: "student3",
      name: "Mariana Santos",
      email: "mariana.santos@estudante.edu",
      avatar: "",
      metrics: {
        assignments: {
          completed: 9,
          total: 10
        },
        timeSpent: 420, // minutes
        materials: {
          viewed: 22,
          total: 24
        },
        lastActivity: "Hoje, 08:15"
      }
    },
    {
      id: "student4",
      name: "Rafael Costa",
      email: "rafael.costa@estudante.edu",
      avatar: "",
      metrics: {
        assignments: {
          completed: 3,
          total: 10
        },
        timeSpent: 150, // minutes
        materials: {
          viewed: 8,
          total: 24
        },
        lastActivity: "2 dias atrás"
      }
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
      <Header userType="teacher" />
      
      <div className="flex">
        <Sidebar courseId={courseId} activeItem="students" userType="teacher" />
        
        <main className="flex-1 p-6">
          <h1 className="text-2xl font-bold mb-6">{courseName} - Alunos</h1>
          
          <div className="grid grid-cols-1 gap-6">
            <StudentTable students={students} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentsPage;
