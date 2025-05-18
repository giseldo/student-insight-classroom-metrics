
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, BookOpen, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export type CourseData = {
  id: string;
  title: string;
  subject: string;
  teacher: string;
  coverColor: string;
  metrics?: {
    views: number;
    timeSpent: number;
    materials: number;
    students: number;
  };
};

type CourseCardProps = {
  course: CourseData;
  userType: "teacher" | "student";
};

export default function CourseCard({ course, userType }: CourseCardProps) {
  const navigate = useNavigate();
  const { id, title, subject, teacher, coverColor, metrics } = course;
  
  const handleCardClick = () => {
    if (userType === "teacher") {
      navigate(`/course/${id}/teacher`);
    } else {
      navigate(`/course/${id}/student`);
    }
  };
  
  return (
    <Card className="classroom-card cursor-pointer overflow-hidden" onClick={handleCardClick}>
      <div className="classroom-header" style={{ backgroundColor: coverColor }}>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge variant="outline" className="mb-2">{subject}</Badge>
            <p className="text-sm text-muted-foreground">Prof. {teacher}</p>
          </div>
        </div>
        
        {userType === "teacher" && metrics && (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="engagement-metric">
              <Eye size={16} />
              <span>{metrics.views} visualizações</span>
            </div>
            <div className="engagement-metric">
              <Clock size={16} />
              <span>{metrics.timeSpent}h tempo total</span>
            </div>
            <div className="engagement-metric">
              <BookOpen size={16} />
              <span>{metrics.materials} materiais</span>
            </div>
            <div className="engagement-metric">
              <Users size={16} />
              <span>{metrics.students} alunos</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
