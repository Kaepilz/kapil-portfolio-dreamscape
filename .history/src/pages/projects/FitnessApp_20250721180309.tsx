
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity, Calendar, Dumbbell, Heart, Settings, BarChart3, Trophy, Clock, Flame, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend, PieChart, Pie, Cell } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { FloatingShapes } from "@/components/FloatingShapes";

// Sample workout data
const WORKOUTS = [
  {
    id: 1,
    name: "Morning Cardio",
    duration: "30 min",
    calories: 320,
    completed: true,
    time: "06:30 AM"
  },
  {
    id: 2,
    name: "Upper Body Strength",
    duration: "45 min",
    calories: 280,
    completed: false,
    time: "04:00 PM"
  },
  {
    id: 3,
    name: "Core Workout",
    duration: "20 min",
    calories: 180,
    completed: false,
    time: "07:30 PM"
  }
];

// Sample progress data
const ACTIVITY_DATA = [
  { name: "Mon", steps: 8432, calories: 420, target: 10000 },
  { name: "Tue", steps: 9721, calories: 510, target: 10000 },
  { name: "Wed", steps: 12453, calories: 670, target: 10000 },
  { name: "Thu", steps: 7854, calories: 390, target: 10000 },
  { name: "Fri", steps: 10832, calories: 540, target: 10000 },
  { name: "Sat", steps: 8932, calories: 430, target: 10000 },
  { name: "Sun", steps: 6423, calories: 320, target: 10000 },
];

// Sample nutrition data
const NUTRITION_DATA = [
  { name: "Protein", value: 35 },
  { name: "Carbs", value: 45 },
  { name: "Fat", value: 20 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const FitnessApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Calculate today's progress
  const todaySteps = 8432;
  const stepsTarget = 10000;
  const stepsCompletion = (todaySteps / stepsTarget) * 100;
  
  const caloriesBurned = 420;
  const caloriesTarget = 600;
  const caloriesCompletion = (caloriesBurned / caloriesTarget) * 100;
  
  const waterConsumed = 5;
  const waterTarget = 8;
  const waterCompletion = (waterConsumed / waterTarget) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-[#2d1b2d] to-kapil-blue-dark relative overflow-hidden">
      <FloatingShapes />
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <Link to="/">
            <Button variant="outline" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-bold text-gradient hidden md:block">Fitness App Interface</h1>
          
          <Button variant="outline" size="icon" className="rounded-full">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Mobile Header - Only shown on small screens */}
        <div className="md:hidden mb-6">
          <h1 className="text-2xl font-bold text-gradient mb-2">Fitness App</h1>
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JP</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Jamie Powell</p>
              <p className="text-xs text-muted-foreground">Premium Member</p>
            </div>
          </div>
        </div>

        {/* App Interface */}
        <div className="bg-kapil-blue-dark/70 border border-kapil-blue-light/20 rounded-xl overflow-hidden max-w-3xl mx-auto">
          {/* Desktop Header - Only shown on medium screens and up */}
          <div className="hidden md:flex justify-between items-center p-4 border-b border-kapil-blue-light/20">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">Jamie Powell</p>
                <p className="text-xs text-muted-foreground">Premium Member</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="text-xs">
                <Trophy className="h-3 w-3 mr-1" />
                Goals
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                <User className="h-3 w-3 mr-1" />
                Profile
              </Button>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="p-4">
            <Tabs defaultValue="dashboard" onValueChange={setActiveTab} value={activeTab}>
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="dashboard">
                  <Activity className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Dashboard</span>
                </TabsTrigger>
                <TabsTrigger value="workouts">
                  <Dumbbell className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Workouts</span>
                </TabsTrigger>
                <TabsTrigger value="nutrition">
                  <Flame className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Nutrition</span>
                </TabsTrigger>
                <TabsTrigger value="progress">
                  <BarChart3 className="h-4 w-4 md:mr-2" />
                  <span className="hidden md:inline">Progress</span>
                </TabsTrigger>
              </TabsList>
              
              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Today's Activity</h2>
                    <p className="text-sm text-muted-foreground">April 26, 2025</p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {/* Steps Card */}
                    <Card className="bg-kapil-blue-medium/30">
                      <CardHeader className="pb-2">
                        <CardDescription>Steps</CardDescription>
                        <CardTitle className="text-xl">{todaySteps.toLocaleString()}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <Progress value={stepsCompletion} className="h-2" />
                      </CardContent>
                      <CardFooter className="pt-0">
                        <p className="text-xs text-muted-foreground">
                          Goal: {stepsTarget.toLocaleString()}
                        </p>
                      </CardFooter>
                    </Card>
                    
                    {/* Calories Card */}
                    <Card className="bg-kapil-blue-medium/30">
                      <CardHeader className="pb-2">
                        <CardDescription>Calories</CardDescription>
                        <CardTitle className="text-xl">{caloriesBurned}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <Progress value={caloriesCompletion} className="h-2" />
                      </CardContent>
                      <CardFooter className="pt-0">
                        <p className="text-xs text-muted-foreground">
                          Goal: {caloriesTarget}
                        </p>
                      </CardFooter>
                    </Card>
                    
                    {/* Water Card */}
                    <Card className="bg-kapil-blue-medium/30">
                      <CardHeader className="pb-2">
                        <CardDescription>Water (cups)</CardDescription>
                        <CardTitle className="text-xl">{waterConsumed} / {waterTarget}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <Progress value={waterCompletion} className="h-2" />
                      </CardContent>
                      <CardFooter className="pt-0">
                        <p className="text-xs text-muted-foreground">
                          {waterTarget - waterConsumed} more to go
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
                
                {/* Today's Workouts */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium">Today's Workouts</h2>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {WORKOUTS.map(workout => (
                      <Card key={workout.id} className={`bg-kapil-blue-medium/30 ${workout.completed ? 'border-green-500/50' : ''}`}>
                        <CardContent className="p-3 flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${workout.completed ? 'bg-green-500/20' : 'bg-kapil-blue-light/20'}`}>
                              <Dumbbell className={`h-5 w-5 ${workout.completed ? 'text-green-500' : ''}`} />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{workout.name}</p>
                              <div className="flex items-center text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {workout.duration}
                                <span className="mx-1">•</span>
                                <Flame className="h-3 w-3 mr-1" />
                                {workout.calories} cal
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-1">{workout.time}</p>
                            <Button size="sm" variant={workout.completed ? "outline" : "default"} className="h-7 text-xs">
                              {workout.completed ? "Completed" : "Start"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
                
                {/* Weekly Activity Chart */}
                <Card className="bg-kapil-blue-medium/30">
                  <CardHeader>
                    <CardTitle className="text-lg">Weekly Activity</CardTitle>
                    <CardDescription>Your steps activity for the past week</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[200px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={ACTIVITY_DATA}
                          margin={{
                            top: 5,
                            right: 10,
                            left: -20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Bar dataKey="steps" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Workouts Tab */}
              <TabsContent value="workouts" className="space-y-6">
                <Card className="bg-kapil-blue-medium/30">
                  <CardHeader>
                    <CardTitle>Workout Programs</CardTitle>
                    <CardDescription>Choose a workout program to start</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "30 Day Weight Loss", level: "Beginner", duration: "30 min/day", image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=1470" },
                      { name: "Strength Builder", level: "Intermediate", duration: "45 min/day", image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470" },
                      { name: "HIIT Challenge", level: "Advanced", duration: "25 min/day", image: "https://images.unsplash.com/photo-1434682881908-b43d0467b798?q=80&w=1474" },
                    ].map((program, i) => (
                      <div key={i} className="flex items-center bg-kapil-blue-dark/50 rounded-lg overflow-hidden">
                        <div className="w-20 h-20">
                          <img
                            src={program.image}
                            alt={program.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 flex-grow">
                          <p className="font-medium">{program.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{program.level}</span>
                            <span className="mx-1">•</span>
                            <span>{program.duration}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="mr-2">
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Browse All Workouts</Button>
                  </CardFooter>
                </Card>
                
                <Card className="bg-kapil-blue-medium/30">
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your workout history</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { name: "Morning Run", type: "Cardio", duration: "35 min", date: "Today" },
                      { name: "Full Body Workout", type: "Strength", duration: "48 min", date: "Yesterday" },
                      { name: "Yoga Session", type: "Flexibility", duration: "30 min", date: "2 days ago" },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-kapil-blue-light/10 last:border-0">
                        <div>
                          <p className="font-medium">{activity.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <span>{activity.type}</span>
                            <span className="mx-1">•</span>
                            <span>{activity.duration}</span>
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{activity.date}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Nutrition Tab */}
              <TabsContent value="nutrition" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-kapil-blue-medium/30">
                    <CardHeader>
                      <CardTitle>Daily Macros</CardTitle>
                      <CardDescription>Nutritional breakdown for today</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-center">
                      <div className="h-[200px] w-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={NUTRITION_DATA}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {NUTRITION_DATA.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#0088FE] mr-1"></div>
                        Protein: 100g
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#00C49F] mr-1"></div>
                        Carbs: 130g
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#FFBB28] mr-1"></div>
                        Fat: 55g
                      </div>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-kapil-blue-medium/30">
                    <CardHeader>
                      <CardTitle>Calorie Summary</CardTitle>
                      <CardDescription>Intake vs. burned today</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-6 py-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Calories consumed</span>
                            <span className="font-medium">1,850</span>
                          </div>
                          <Progress value={75} className="h-2" />
                          <div className="text-xs text-right text-muted-foreground">
                            Goal: 2,200
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Calories burned</span>
                            <span className="font-medium">420</span>
                          </div>
                          <Progress value={70} className="h-2" />
                          <div className="text-xs text-right text-muted-foreground">
                            Goal: 600
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t border-kapil-blue-light/20">
                          <span className="font-medium">Net Calories</span>
                          <span className="font-bold text-lg">1,430</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-kapil-blue-medium/30">
                  <CardHeader>
                    <CardTitle>Meal Plan</CardTitle>
                    <CardDescription>Your nutrition plan for today</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { meal: "Breakfast", time: "7:30 AM", food: "Oatmeal with berries, Greek yogurt" },
                      { meal: "Snack", time: "10:00 AM", food: "Apple, mixed nuts" },
                      { meal: "Lunch", time: "12:30 PM", food: "Grilled chicken salad, whole grain bread" },
                      { meal: "Snack", time: "3:30 PM", food: "Protein shake" },
                      { meal: "Dinner", time: "7:00 PM", food: "Salmon, quinoa, roasted vegetables" }
                    ].map((meal, i) => (
                      <div key={i} className="flex items-start py-2 border-b border-kapil-blue-light/10 last:border-0">
                        <div className="w-16 text-xs text-muted-foreground mt-1">{meal.time}</div>
                        <div>
                          <p className="font-medium">{meal.meal}</p>
                          <p className="text-sm text-muted-foreground">{meal.food}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline" className="w-full">
                      Customize Meal Plan
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              {/* Progress Tab */}
              <TabsContent value="progress" className="space-y-6">
                <Card className="bg-kapil-blue-medium/30">
                  <CardHeader>
                    <CardTitle>Weekly Progress</CardTitle>
                    <CardDescription>Your fitness metrics over time</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { week: "Week 1", weight: 185, body_fat: 24 },
                            { week: "Week 2", weight: 183, body_fat: 23.5 },
                            { week: "Week 3", weight: 181, body_fat: 23 },
                            { week: "Week 4", weight: 180, body_fat: 22.5 },
                            { week: "Week 5", weight: 178, body_fat: 22 },
                            { week: "Week 6", weight: 177, body_fat: 21.5 },
                          ]}
                          margin={{
                            top: 5,
                            right: 20,
                            left: 0,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="week" />
                          <YAxis yAxisId="left" />
                          <YAxis yAxisId="right" orientation="right" />
                          <Tooltip />
                          <Legend />
                          <Line
                            yAxisId="left"
                            type="monotone"
                            dataKey="weight"
                            stroke="#8884d8"
                            name="Weight (lbs)"
                          />
                          <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="body_fat"
                            stroke="#82ca9d"
                            name="Body Fat (%)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-kapil-blue-medium/30">
                    <CardHeader>
                      <CardTitle>Body Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Current Weight</span>
                          <span>177 lbs</span>
                        </div>
                        <Progress value={85} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Starting: 185 lbs</span>
                          <span>Goal: 170 lbs</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Body Fat</span>
                          <span>21.5%</span>
                        </div>
                        <Progress value={70} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Starting: 24%</span>
                          <span>Goal: 18%</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Muscle Mass</span>
                          <span>135 lbs</span>
                        </div>
                        <Progress value={60} className="h-1.5" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Starting: 132 lbs</span>
                          <span>Goal: 140 lbs</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="ghost" className="text-xs w-full">
                        Update Measurements
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card className="bg-kapil-blue-medium/30">
                    <CardHeader>
                      <CardTitle>Achievements</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {[
                        { name: "10K Steps", description: "Complete 10,000 steps in a day", progress: 84, icon: Trophy },
                        { name: "7 Day Streak", description: "Work out for 7 consecutive days", progress: 57, icon: Flame },
                        { name: "Weight Goal", description: "Reach your target weight", progress: 70, icon: Heart },
                      ].map((achievement, i) => (
                        <div key={i} className="flex items-start">
                          <div className="w-10 h-10 rounded-full bg-kapil-blue-dark flex items-center justify-center mr-3 shrink-0">
                            <achievement.icon className="h-5 w-5" />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between mb-1">
                              <p className="font-medium text-sm">{achievement.name}</p>
                              <span className="text-xs text-muted-foreground">{achievement.progress}%</span>
                            </div>
                            <Progress value={achievement.progress} className="h-1.5 mb-1" />
                            <p className="text-xs text-muted-foreground">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="ghost" className="text-xs w-full">
                        View All Achievements
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Bottom Navigation - Mobile only */}
          <div className="md:hidden border-t border-kapil-blue-light/20 p-2">
            <div className="flex justify-between">
              <Button variant="ghost" size="sm" className="flex-1">
                <Calendar className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessApp;
