
import Header from "@/components/Header";
import CourseCard, { CourseData } from "@/components/CourseCard";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Users, Clock, BookOpen, Eye } from "lucide-react";
import MetricCard from "@/components/MetricCard";
import EngagementChart from "@/components/EngagementChart";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const courseFormSchema = z.object({
  title: z.string().min(3, { message: "O título deve ter pelo menos 3 caracteres" }),
  subject: z.string().min(2, { message: "A disciplina deve ter pelo menos 2 caracteres" }),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;

const TeacherDashboard = () => {
  const [courses, setCourses] = useState<CourseData[]>([
    {
      id: "course1",
      title: "Matemática Avançada",
      subject: "Matemática",
      teacher: "Silva",
      coverColor: "#1967d2",
      metrics: {
        views: 1245,
        timeSpent: 87,
        materials: 24,
        students: 32
      }
    },
    {
      id: "course2",
      title: "Literatura Brasileira",
      subject: "Português",
      teacher: "Silva",
      coverColor: "#34a853",
      metrics: {
        views: 986,
        timeSpent: 65,
        materials: 18,
        students: 28
      }
    },
    {
      id: "course3",
      title: "Física Quântica",
      subject: "Física",
      teacher: "Silva",
      coverColor: "#ea4335",
      metrics: {
        views: 875,
        timeSpent: 52,
        materials: 15,
        students: 24
      }
    },
  ]);
  
  const [openDialog, setOpenDialog] = useState(false);
  
  const form = useForm<CourseFormValues>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      title: "",
      subject: ""
    }
  });
  
  const onSubmit = (values: CourseFormValues) => {
    const colors = ["#1967d2", "#34a853", "#ea4335", "#4285f4", "#fbbc05", "#5f6368"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newCourse: CourseData = {
      id: `course${courses.length + 1}`,
      title: values.title,
      subject: values.subject,
      teacher: "Silva",
      coverColor: randomColor,
      metrics: {
        views: 0,
        timeSpent: 0,
        materials: 0,
        students: 0
      }
    };
    
    setCourses([...courses, newCourse]);
    setOpenDialog(false);
    toast.success("Curso criado com sucesso!");
    form.reset();
  };
  
  const chartData = [
    { date: "01/05", views: 120, timeSpent: 45, participation: 92 },
    { date: "02/05", views: 132, timeSpent: 48, participation: 89 },
    { date: "03/05", views: 101, timeSpent: 38, participation: 78 },
    { date: "04/05", views: 134, timeSpent: 52, participation: 85 },
    { date: "05/05", views: 190, timeSpent: 65, participation: 95 },
    { date: "06/05", views: 210, timeSpent: 70, participation: 98 },
    { date: "07/05", views: 220, timeSpent: 75, participation: 96 },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="teacher" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Painel do Professor</h1>
          <Button onClick={() => setOpenDialog(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Criar Novo Curso
          </Button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <MetricCard
            title="Total de Alunos"
            value={84}
            description="Alunos ativos em todos os cursos"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <MetricCard
            title="Horas de Engajamento"
            value={204}
            description="Tempo total de estudo esta semana"
            icon={Clock}
            trend={{ value: 8, isPositive: true }}
          />
          <MetricCard
            title="Materiais Visualizados"
            value={1832}
            description="Total de visualizações de conteúdo"
            icon={Eye}
            trend={{ value: 5, isPositive: true }}
          />
          <MetricCard
            title="Taxa de Conclusão"
            value="85%"
            description="Média de conclusão das atividades"
            icon={BookOpen}
            trend={{ value: 3, isPositive: false }}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <EngagementChart
            title="Métricas de Engajamento dos Alunos"
            data={chartData}
          />
        </div>
        
        <h2 className="text-xl font-medium mb-4">Seus Cursos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} userType="teacher" />
          ))}
        </div>
      </main>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Criar Novo Curso</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Curso</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Matemática Avançada" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disciplina</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Matemática" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit">Criar Curso</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherDashboard;
