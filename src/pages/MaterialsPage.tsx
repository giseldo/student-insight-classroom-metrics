
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";
import MaterialList, { Material } from "@/components/MaterialList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";

const MaterialsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [courseName, setCourseName] = useState("Carregando...");
  const [open, setOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    title: "",
    type: "document" as Material["type"],
    file: null as File | null,
    link: ""
  });
  
  const [materials, setMaterials] = useState<Material[]>([
    {
      id: "material1",
      title: "Apostila de Cálculo",
      type: "document",
      dateAdded: "01/05/2025",
      metrics: {
        views: 128,
        totalStudents: 32,
        averageTime: 45,
        completion: 78
      }
    },
    {
      id: "material2",
      title: "Videoaula sobre Derivadas",
      type: "video",
      dateAdded: "03/05/2025",
      metrics: {
        views: 95,
        totalStudents: 32,
        averageTime: 22,
        completion: 64
      }
    },
    {
      id: "material3",
      title: "Exercícios Complementares",
      type: "document",
      dateAdded: "05/05/2025",
      metrics: {
        views: 87,
        totalStudents: 32,
        averageTime: 30,
        completion: 56
      }
    },
    {
      id: "material4",
      title: "Link para Khan Academy",
      type: "link",
      dateAdded: "08/05/2025",
      metrics: {
        views: 45,
        totalStudents: 32,
        averageTime: 15,
        completion: 42
      }
    },
    {
      id: "material5",
      title: "Questionário de Revisão",
      type: "quiz",
      dateAdded: "10/05/2025",
      metrics: {
        views: 76,
        totalStudents: 32,
        averageTime: 35,
        completion: 92
      }
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMaterial({ ...newMaterial, [name]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewMaterial({ ...newMaterial, file: e.target.files[0] });
    }
  };
  
  const handleTypeChange = (value: string) => {
    setNewMaterial({ ...newMaterial, type: value as Material["type"] });
  };
  
  const handleAddMaterial = () => {
    // In a real app, this would upload the file to storage and save to database
    const now = new Date();
    const dateString = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    
    const newMaterialItem: Material = {
      id: `material${materials.length + 1}`,
      title: newMaterial.title,
      type: newMaterial.type,
      dateAdded: dateString,
      metrics: {
        views: 0,
        totalStudents: 32,
        averageTime: 0,
        completion: 0
      }
    };
    
    setMaterials([...materials, newMaterialItem]);
    setNewMaterial({
      title: "",
      type: "document",
      file: null,
      link: ""
    });
    setOpen(false);
    toast({
      title: "Material adicionado",
      description: `${newMaterial.title} foi adicionado aos materiais do curso.`,
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header userType="teacher" />
      
      <div className="flex">
        <Sidebar courseId={courseId} activeItem="materials" userType="teacher" />
        
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">{courseName} - Materiais</h1>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="bg-classroom-primary">
                  <Plus className="mr-2 h-4 w-4" /> Adicionar Material
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Adicionar Material</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      name="title"
                      value={newMaterial.title}
                      onChange={handleInputChange}
                      placeholder="Nome do material"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="type">Tipo</Label>
                    <Select onValueChange={handleTypeChange} defaultValue={newMaterial.type}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="document">Documento</SelectItem>
                        <SelectItem value="video">Vídeo</SelectItem>
                        <SelectItem value="link">Link</SelectItem>
                        <SelectItem value="quiz">Questionário</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {newMaterial.type === 'link' ? (
                    <div className="grid gap-2">
                      <Label htmlFor="link">URL</Label>
                      <Input
                        id="link"
                        name="link"
                        value={newMaterial.link}
                        onChange={handleInputChange}
                        placeholder="https://..."
                      />
                    </div>
                  ) : (
                    <div className="grid gap-2">
                      <Label htmlFor="file">Arquivo</Label>
                      <Input
                        id="file"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                  <Button 
                    onClick={handleAddMaterial} 
                    disabled={!newMaterial.title || (newMaterial.type === 'link' ? !newMaterial.link : !newMaterial.file)}
                  >
                    Adicionar
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">Todos</TabsTrigger>
              <TabsTrigger value="documents">Documentos</TabsTrigger>
              <TabsTrigger value="videos">Vídeos</TabsTrigger>
              <TabsTrigger value="links">Links</TabsTrigger>
              <TabsTrigger value="quizzes">Questionários</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <MaterialList materials={materials} userType="teacher" />
            </TabsContent>
            <TabsContent value="documents">
              <MaterialList materials={materials.filter(m => m.type === 'document')} userType="teacher" />
            </TabsContent>
            <TabsContent value="videos">
              <MaterialList materials={materials.filter(m => m.type === 'video')} userType="teacher" />
            </TabsContent>
            <TabsContent value="links">
              <MaterialList materials={materials.filter(m => m.type === 'link')} userType="teacher" />
            </TabsContent>
            <TabsContent value="quizzes">
              <MaterialList materials={materials.filter(m => m.type === 'quiz')} userType="teacher" />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default MaterialsPage;
