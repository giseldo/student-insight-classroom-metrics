
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Eye, Book } from "lucide-react";

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
          {materials.map((material) => (
            <div key={material.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <Book size={20} className="text-classroom-primary" />
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
                <div className="mt-4 flex gap-6">
                  <div className="engagement-metric">
                    <Eye size={16} />
                    <span>
                      {material.metrics.views} visualizações
                    </span>
                  </div>
                  <div className="engagement-metric">
                    <Clock size={16} />
                    <span>{material.metrics.averageTime}min tempo médio</span>
                  </div>
                  <div className="engagement-metric">
                    <Users size={16} />
                    <span>{material.metrics.completion}% dos alunos completaram</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
