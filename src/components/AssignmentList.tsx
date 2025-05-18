
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Eye } from "lucide-react";

export type Assignment = {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "completed" | "late" | "draft" | "published";
  metrics?: {
    submissions: number;
    totalStudents: number;
    averageTime: number;
    views: number;
  };
};

type AssignmentListProps = {
  assignments: Assignment[];
  userType: "teacher" | "student";
};

export default function AssignmentList({ assignments, userType }: AssignmentListProps) {
  const getStatusBadge = (status: Assignment["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-classroom-secondary">Concluída</Badge>;
      case "pending":
        return <Badge variant="outline">Pendente</Badge>;
      case "late":
        return <Badge variant="destructive">Atrasada</Badge>;
      case "draft":
        return <Badge variant="outline">Rascunho</Badge>;
      case "published":
        return <Badge className="bg-classroom-primary">Publicada</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{userType === "teacher" ? "Atividades da Turma" : "Minhas Atividades"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    Data de entrega: {assignment.dueDate}
                  </p>
                </div>
                {getStatusBadge(assignment.status)}
              </div>
              
              {userType === "teacher" && assignment.metrics && (
                <div className="mt-4 flex gap-6">
                  <div className="engagement-metric">
                    <Users size={16} />
                    <span>
                      {assignment.metrics.submissions}/{assignment.metrics.totalStudents} entregas
                    </span>
                  </div>
                  <div className="engagement-metric">
                    <Clock size={16} />
                    <span>{assignment.metrics.averageTime}min em média</span>
                  </div>
                  <div className="engagement-metric">
                    <Eye size={16} />
                    <span>{assignment.metrics.views} visualizações</span>
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
