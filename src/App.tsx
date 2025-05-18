
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import CourseTeacher from "./pages/CourseTeacher";
import CourseStudent from "./pages/CourseStudent";
import MaterialsPage from "./pages/MaterialsPage";
import MaterialsStudentPage from "./pages/MaterialsStudentPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import AssignmentsStudentPage from "./pages/AssignmentsStudentPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/course/:courseId/teacher" element={<CourseTeacher />} />
          <Route path="/course/:courseId/student" element={<CourseStudent />} />
          <Route path="/course/:courseId/materials" element={<MaterialsPage />} />
          <Route path="/course/:courseId/materials/student" element={<MaterialsStudentPage />} />
          <Route path="/course/:courseId/assignments" element={<AssignmentsPage />} />
          <Route path="/course/:courseId/assignments/student" element={<AssignmentsStudentPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
