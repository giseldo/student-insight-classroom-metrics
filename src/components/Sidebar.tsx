
import { cn } from "@/lib/utils";
import { BookOpen, Clock, Eye, Users, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  courseId?: string;
  activeItem?: string;
  userType: "teacher" | "student";
};

export default function Sidebar({ courseId, activeItem = "overview", userType }: SidebarProps) {
  const navigate = useNavigate();
  
  const teacherNavItems = [
    {
      id: "overview",
      name: "Visão Geral",
      icon: Eye,
      route: `/course/${courseId}/teacher`,
    },
    {
      id: "materials",
      name: "Materiais",
      icon: BookOpen,
      route: `/course/${courseId}/materials`,
    },
    {
      id: "assignments",
      name: "Atividades",
      icon: Book,
      route: `/course/${courseId}/assignments`,
    },
    {
      id: "students",
      name: "Alunos",
      icon: Users,
      route: `/course/${courseId}/students`,
    },
    {
      id: "analytics",
      name: "Análise",
      icon: Clock,
      route: `/course/${courseId}/analytics`,
    },
  ];
  
  const studentNavItems = [
    {
      id: "overview",
      name: "Visão Geral",
      icon: Eye,
      route: `/course/${courseId}/student`,
    },
    {
      id: "materials",
      name: "Materiais",
      icon: BookOpen,
      route: `/course/${courseId}/materials/student`,
    },
    {
      id: "assignments",
      name: "Atividades",
      icon: Book,
      route: `/course/${courseId}/assignments/student`,
    },
  ];
  
  const navItems = userType === "teacher" ? teacherNavItems : studentNavItems;
  
  const handleNavigation = (route: string) => {
    navigate(route);
  };
  
  return (
    <aside className="w-64 border-r border-classroom-border h-[calc(100vh-64px)] sticky top-16 bg-white">
      <div className="p-4">
        <Button variant="outline" className="w-full justify-start" onClick={() => navigate(userType === "teacher" ? "/teacher" : "/student")}>
          ← Voltar para Cursos
        </Button>
      </div>
      <nav className="px-2 py-4">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={cn(
              "nav-item",
              activeItem === item.id && "active"
            )}
            onClick={() => handleNavigation(item.route)}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
}
