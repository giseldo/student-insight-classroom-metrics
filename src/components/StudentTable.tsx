
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Eye, Clock } from "lucide-react";

type Student = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  metrics: {
    assignments: {
      completed: number;
      total: number;
    };
    timeSpent: number; // minutes
    materials: {
      viewed: number;
      total: number;
    };
    lastActivity: string;
  };
};

type StudentTableProps = {
  students: Student[];
};

export default function StudentTable({ students }: StudentTableProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Engajamento dos Alunos</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aluno</TableHead>
              <TableHead>Atividades</TableHead>
              <TableHead>Tempo</TableHead>
              <TableHead>Materiais</TableHead>
              <TableHead>Última Atividade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => {
              const assignmentPercentage = (student.metrics.assignments.completed / student.metrics.assignments.total) * 100;
              const materialsPercentage = (student.metrics.materials.viewed / student.metrics.materials.total) * 100;
              
              return (
                <TableRow key={student.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-muted-foreground">{student.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={assignmentPercentage} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">
                        {student.metrics.assignments.completed}/{student.metrics.assignments.total}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-muted-foreground" />
                      <span>{student.metrics.timeSpent}min</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={materialsPercentage} className="h-2 w-24" />
                      <span className="text-xs text-muted-foreground">
                        <Eye size={14} className="inline mr-1" />
                        {student.metrics.materials.viewed}/{student.metrics.materials.total}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.metrics.lastActivity}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
