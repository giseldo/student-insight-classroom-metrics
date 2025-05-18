
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

type EngagementChartProps = {
  title: string;
  data: Array<{
    date: string;
    views: number;
    timeSpent: number;
    participation: number;
  }>;
};

export default function EngagementChart({ title, data }: EngagementChartProps) {
  const [period, setPeriod] = useState("7d");
  
  return (
    <Card className="col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md font-medium">{title}</CardTitle>
        <Select defaultValue={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Dias</SelectItem>
            <SelectItem value="30d">30 Dias</SelectItem>
            <SelectItem value="90d">Trimestre</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="pt-4">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="views" 
              stroke="#1967d2" 
              activeDot={{ r: 8 }} 
              name="Visualizações"
            />
            <Line 
              type="monotone" 
              dataKey="timeSpent" 
              stroke="#34a853" 
              name="Tempo (min)"
            />
            <Line 
              type="monotone" 
              dataKey="participation" 
              stroke="#ea4335" 
              name="Participação (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
