import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface DashboardStats {
  totalVisitors: number;
  totalMessages: number;
  topQuestions: Array<{ question: string; count: number }>;
  dailyStats: Array<{ date: string; visitors: number; messages: number }>;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Get visitor count
      const { count: visitorCount } = await supabase
        .from('user_sessions')
        .select('*', { count: 'exact', head: true });

      // Get message count  
      const { count: messageCount } = await supabase
        .from('chatbot_messages')
        .select('*', { count: 'exact', head: true });

      // Get top questions
      const { data: topQuestions } = await supabase
        .from('faq_tracking')
        .select('question, count')
        .order('count', { ascending: false })
        .limit(5);

      setStats({
        totalVisitors: visitorCount || 0,
        totalMessages: messageCount || 0,
        topQuestions: topQuestions || [],
        dailyStats: [] // Simplified for now
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-8">Loading dashboard...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Portfolio Analytics Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Visitors</CardTitle>
            <CardDescription>Unique sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalVisitors}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat Messages</CardTitle>
            <CardDescription>Total conversations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalMessages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Most Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {stats?.topQuestions.slice(0, 3).map((q, i) => (
                <div key={i} className="text-sm">
                  <span className="font-medium">{q.count}x</span> - {q.question.slice(0, 50)}...
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.topQuestions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="question" tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};