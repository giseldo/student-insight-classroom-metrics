
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Eye, Book, FileText, Video, Link, FileQuestion } from "lucide-react";

export type Material = {
  id: string;
  title: string;
  type: "document" | "video" | "link" | "quiz";
  dateAdded: string;
  metrics?: {
    views: number;
    totalStudents: number;
    averageTime: number;
    completion: number;
  };
};

type MaterialListProps = {
  materials: Material[];
  userType: "teacher" | "student";
};

export default function MaterialList({ materials, userType }: MaterialListProps) {
  const getTypeIcon = (type: Material["type"]) => {
    switch (type) {
      case "document":
        return <FileText size={20} className="text-classroom-primary" />;
      case "video":
        return <Video size={20} className="text-classroom-accent" />;
      case "link":
        return <Link size={20} className="text-gray-500" />;
      case "quiz":
        return <FileQuestion size={20} className="text-classroom-secondary" />;
      default:
        return <Book size={20} className="text-classroom-primary" />;
    }
  };

  const getTypeBadge = (type: Material["type"]) => {
    switch (type) {
      case "document":
        return <Badge className="bg-classroom-primary">Documento</Badge>;
      case "video":
        return <Badge className="bg-classroom-accent">Vídeo</Badge>;
      case "link":
        return <Badge variant="outline">Link</Badge>;
      case "quiz":
        return <Badge className="bg-classroom-secondary">Questionário</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Materiais do Curso</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {materials.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum material disponível nesta categoria.
            </div>
          ) : (
            materials.map((material) => (
              <div key={material.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(material.type)}
                    <div>
                      <h3 className="font-medium">{material.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        Adicionado em: {material.dateAdded}
                      </p>
                    </div>
                  </div>
                  {getTypeBadge(material.type)}
                </div>
                
                {userType === "teacher" && material.metrics && (
                  <div className="mt-4 flex flex-wrap gap-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye size={16} />
                      <span>
                        {material.metrics.views} visualizações
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock size={16} />
                      <span>{material.metrics.averageTime}min tempo médio</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users size={16} />
                      <span>{material.metrics.completion}% dos alunos completaram</span>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
