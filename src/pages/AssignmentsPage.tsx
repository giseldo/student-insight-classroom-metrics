
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import AssignmentList, { Assignment } from "@/components/AssignmentList";

const AssignmentsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseName, setCourseName] = useState("Carregando...");
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "assignment1",
      title: "Lista de Exercícios 3 - Derivadas",
      dueDate: "18/05/2025",
      status: "published",
      metrics: {
        submissions: 18,
        totalStudents: 32,
        averageTime: 35,
        views: 29
      }
    },
    {
      id: "assignment2",
      title: "Trabalho sobre Integrais",
      dueDate: "25/05/2025",
      status: "draft",
      metrics: {
        submissions: 0,
        totalStudents: 32,
        averageTime: 0,
        views: 5
      }
    },
    {
      id: "assignment3",
      title: "Questionário de Funções",
      dueDate: "10/05/2025",
      status: "published",
      metrics: {
        submissions: 30,
        totalStudents: 32,
        averageTime: 25,
        views: 32
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
  
  const handleCreateAssignment = () => {
    if (!title || !date) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos",
        variant: "destructive"
      });
      return;
    }
    
    const newAssignment: Assignment = {
      id: `assignment${assignments.length + 1}`,
      title,
      dueDate: format(date, "dd/MM/yyyy"),
      status: "draft",
      metrics: {
        submissions: 0,
        totalStudents: 32,
        averageTime: 0,
        views: 0
      }
    };
    
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setDate(undefined);
    setOpen(false);
    
    toast({
      title: "Atividade criada",
      description: "A atividade foi criada com sucesso"
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="teacher" />
      
      <div className="flex">
        <Sidebar courseId={courseId} activeItem="assignments" userType="teacher" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{courseName} - Atividades</h1>
            <Button onClick={() => setOpen(true)}>Nova Atividade</Button>
          </div>
          
          <AssignmentList assignments={assignments} userType="teacher" />
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Nova Atividade</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título da Atividade</Label>
                  <Input
                    id="title"
                    placeholder="Digite o título da atividade"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Data de Entrega</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                <Button onClick={handleCreateAssignment}>Criar Atividade</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default AssignmentsPage;
