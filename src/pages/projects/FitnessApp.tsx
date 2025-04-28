
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const workoutData = [
  { day: 'Mon', calories: 320 },
  { day: 'Tue', calories: 450 },
  { day: 'Wed', calories: 280 },
  { day: 'Thu', calories: 390 },
  { day: 'Fri', calories: 480 },
  { day: 'Sat', calories: 220 },
  { day: 'Sun', calories: 300 },
];

const workouts = [
  {
    name: "Morning Cardio",
    duration: "30 min",
    calories: "250 kcal",
    type: "Cardio",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=870"
  },
  {
    name: "Strength Training",
    duration: "45 min",
    calories: "380 kcal",
    type: "Strength",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=870"
  },
  {
    name: "Yoga Flow",
    duration: "60 min",
    calories: "200 kcal",
    type: "Flexibility",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=870"
  }
];

const FitnessApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-kapil-blue-dark to-kapil-blue-medium p-6">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Fitness Tracker</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-kapil-blue-medium/50 border-kapil-blue-light/20">
            <h2 className="text-2xl font-semibold mb-4">Weekly Progress</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={workoutData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="calories" stroke="#ea384c" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-kapil-blue-medium/50 border-kapil-blue-light/20">
            <h2 className="text-2xl font-semibold mb-4">Today's Stats</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-kapil-blue-dark/30 rounded-lg">
                <h3 className="text-lg mb-2">Calories Burned</h3>
                <p className="text-3xl font-bold text-kapil-red">480</p>
              </div>
              <div className="p-4 bg-kapil-blue-dark/30 rounded-lg">
                <h3 className="text-lg mb-2">Active Minutes</h3>
                <p className="text-3xl font-bold text-kapil-red">45</p>
              </div>
            </div>
          </Card>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-8">Recommended Workouts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map((workout, index) => (
              <Card key={index} className="overflow-hidden bg-kapil-blue-medium/50 border-kapil-blue-light/20 hover:border-kapil-red transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={workout.image}
                    alt={workout.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{workout.name}</h3>
                  <p className="text-kapil-red mb-2">{workout.type}</p>
                  <div className="flex justify-between text-muted-foreground">
                    <span>{workout.duration}</span>
                    <span>{workout.calories}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FitnessApp;

