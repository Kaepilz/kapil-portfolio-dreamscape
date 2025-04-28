
import React from 'react';
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const FinanceDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium p-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Finance Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-kapil-blue-medium/50 border-kapil-blue-light/20">
            <h3 className="text-xl font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-kapil-red">$24,890</p>
            <p className="text-sm text-muted-foreground">+12% from last month</p>
          </Card>
          
          <Card className="p-6 bg-kapil-blue-medium/50 border-kapil-blue-light/20">
            <h3 className="text-xl font-semibold mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-kapil-red">1,234</p>
            <p className="text-sm text-muted-foreground">+8% from last month</p>
          </Card>
          
          <Card className="p-6 bg-kapil-blue-medium/50 border-kapil-blue-light/20">
            <h3 className="text-xl font-semibold mb-2">Profit Margin</h3>
            <p className="text-3xl font-bold text-kapil-red">32%</p>
            <p className="text-sm text-muted-foreground">+5% from last month</p>
          </Card>
        </div>
        
        <Card className="p-6 bg-kapil-blue-medium/50 border-kapil-blue-light/20">
          <h2 className="text-2xl font-semibold mb-4">Revenue Overview</h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#ea384c" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinanceDashboard;

