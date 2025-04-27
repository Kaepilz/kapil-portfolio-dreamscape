
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, CreditCard, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, 
  ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell 
} from "recharts";
import { useState } from "react";

// Sample data for our finance dashboard
const revenueData = [
  { month: "Jan", revenue: 5000, expenses: 3200 },
  { month: "Feb", revenue: 7800, expenses: 3800 },
  { month: "Mar", revenue: 4200, expenses: 2900 },
  { month: "Apr", revenue: 9800, expenses: 4100 },
  { month: "May", revenue: 7500, expenses: 3500 },
  { month: "Jun", revenue: 10200, expenses: 4800 },
];

const portfolioData = [
  { name: "Stocks", value: 65 },
  { name: "Bonds", value: 15 },
  { name: "Real Estate", value: 10 },
  { name: "Cash", value: 10 },
];

const transactionData = [
  { id: 1, name: "Coffee Shop", date: "Today, 9:15 AM", amount: -4.50, category: "Food" },
  { id: 2, name: "Salary Deposit", date: "Apr 25, 2025", amount: 3200, category: "Income" },
  { id: 3, name: "Grocery Store", date: "Apr 23, 2025", amount: -65.30, category: "Food" },
  { id: 4, name: "Gas Station", date: "Apr 22, 2025", amount: -45.00, category: "Transport" },
  { id: 5, name: "Online Subscription", date: "Apr 21, 2025", amount: -12.99, category: "Entertainment" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const FinanceDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const totalBalance = 8245.60;
  const totalIncome = 4120.50;
  const totalExpenses = 1875.25;
  const savingsRate = 18.5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-kapil-blue-dark via-kapil-blue-medium to-kapil-blue-dark">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <Link to="/#projects">
            <Button variant="outline" className="mb-2">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Button>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-gradient">Finance Dashboard</h1>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="grid grid-cols-4 w-full max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <Button size="sm" variant="outline" className="hidden md:flex">
              <DollarSign className="mr-1 h-4 w-4" /> Add Transaction
            </Button>
          </div>
          
          <TabsContent value="overview" className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader className="pb-2">
                  <CardDescription>Total Balance</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    ${totalBalance.toLocaleString()}
                    <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">+5.25% from last month</p>
                </CardFooter>
              </Card>
              
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Income</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    ${totalIncome.toLocaleString()}
                    <TrendingUp className="ml-2 h-5 w-5 text-green-500" />
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">+2.1% from last month</p>
                </CardFooter>
              </Card>
              
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader className="pb-2">
                  <CardDescription>Monthly Expenses</CardDescription>
                  <CardTitle className="text-2xl flex items-center">
                    ${totalExpenses.toLocaleString()}
                    <TrendingDown className="ml-2 h-5 w-5 text-red-500" />
                  </CardTitle>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">-3.4% from last month</p>
                </CardFooter>
              </Card>
              
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader className="pb-2">
                  <CardDescription>Savings Rate</CardDescription>
                  <CardTitle className="text-2xl">{savingsRate}%</CardTitle>
                </CardHeader>
                <CardFooter className="pt-2">
                  <p className="text-xs text-muted-foreground">Target: 20%</p>
                </CardFooter>
              </Card>
            </div>
            
            {/* Revenue Chart */}
            <Card className="bg-kapil-blue-medium/50">
              <CardHeader>
                <CardTitle>Revenue vs Expenses</CardTitle>
                <CardDescription>Financial overview for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={revenueData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" />
                      <Bar dataKey="expenses" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Recent Transactions */}
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>Recent Transactions</CardTitle>
                      <CardDescription>Your latest financial activities</CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {transactionData.slice(0, 3).map((transaction) => (
                      <li key={transaction.id} className="flex items-center justify-between pb-3 border-b border-kapil-blue-light/20">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.amount > 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                            {transaction.amount > 0 ? (
                              <ArrowUpRight className="h-5 w-5 text-green-500" />
                            ) : (
                              <CreditCard className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{transaction.name}</p>
                            <p className="text-sm text-muted-foreground">{transaction.date}</p>
                          </div>
                        </div>
                        <span className={transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}>
                          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Portfolio Allocation */}
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader>
                  <CardTitle>Portfolio Allocation</CardTitle>
                  <CardDescription>Current investment breakdown</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center pt-2">
                  <div className="h-[200px] w-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={portfolioData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions" className="space-y-4">
            <Card className="bg-kapil-blue-medium/50">
              <CardHeader>
                <div className="flex justify-between">
                  <CardTitle>All Transactions</CardTitle>
                  <Button size="sm">Export Data</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-kapil-blue-light/20">
                        <th className="text-left py-3 px-2">Name</th>
                        <th className="text-left py-3 px-2">Date</th>
                        <th className="text-left py-3 px-2">Category</th>
                        <th className="text-right py-3 px-2">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactionData.map((transaction) => (
                        <tr key={transaction.id} className="border-b border-kapil-blue-light/10 hover:bg-kapil-blue-light/5">
                          <td className="py-3 px-2">{transaction.name}</td>
                          <td className="py-3 px-2 text-muted-foreground text-sm">{transaction.date}</td>
                          <td className="py-3 px-2">
                            <span className="px-2 py-1 rounded-full text-xs bg-kapil-blue-dark">
                              {transaction.category}
                            </span>
                          </td>
                          <td className={`py-3 px-2 text-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.amount > 0 ? '+' : ''}${transaction.amount.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="portfolio" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="bg-kapil-blue-medium/50 lg:col-span-2">
                <CardHeader>
                  <CardTitle>Asset Performance</CardTitle>
                  <CardDescription>6 month performance of your assets</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={[
                          { month: "Jan", stocks: 100, bonds: 100, realEstate: 100, cash: 100 },
                          { month: "Feb", stocks: 110, bonds: 102, realEstate: 101, cash: 100 },
                          { month: "Mar", stocks: 105, bonds: 103, realEstate: 103, cash: 100 },
                          { month: "Apr", stocks: 115, bonds: 104, realEstate: 105, cash: 100 },
                          { month: "May", stocks: 125, bonds: 105, realEstate: 108, cash: 100 },
                          { month: "Jun", stocks: 135, bonds: 107, realEstate: 110, cash: 100 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="stocks" stroke="#8884d8" />
                        <Line type="monotone" dataKey="bonds" stroke="#82ca9d" />
                        <Line type="monotone" dataKey="realEstate" stroke="#ffc658" />
                        <Line type="monotone" dataKey="cash" stroke="#ff8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-kapil-blue-medium/50">
                <CardHeader>
                  <CardTitle>Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolioData.map((asset, i) => (
                      <div key={asset.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{asset.name}</span>
                          <span>{asset.value}%</span>
                        </div>
                        <div className="h-2 bg-kapil-blue-dark rounded-full">
                          <div 
                            className="h-2 rounded-full" 
                            style={{ 
                              width: `${asset.value}%`, 
                              backgroundColor: COLORS[i % COLORS.length] 
                            }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-kapil-blue-medium/50">
              <CardHeader>
                <CardTitle>Investment Opportunities</CardTitle>
                <CardDescription>Potential investments based on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Tech ETF", risk: "Medium", returns: "10-15%", type: "ETF" },
                    { name: "Green Energy Fund", risk: "High", returns: "12-20%", type: "Mutual Fund" },
                    { name: "Blue Chip Portfolio", risk: "Low", returns: "5-8%", type: "Stocks" }
                  ].map((investment, i) => (
                    <Card key={i} className="bg-kapil-blue-dark">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">{investment.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <p className="text-sm">Risk Level: <span className="text-muted-foreground">{investment.risk}</span></p>
                        <p className="text-sm">Expected Returns: <span className="text-muted-foreground">{investment.returns}</span></p>
                        <p className="text-sm">Type: <span className="text-muted-foreground">{investment.type}</span></p>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm" variant="outline" className="w-full">Learn More</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-kapil-blue-medium/50">
              <CardHeader>
                <CardTitle>Dashboard Settings</CardTitle>
                <CardDescription>Customize your finance dashboard experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Display Options</h3>
                  <div className="flex flex-col space-y-3">
                    {["Show portfolio balance", "Show transaction history", "Enable notifications", "Dark mode"].map((option, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span>{option}</span>
                        <div className="w-12 h-6 bg-kapil-blue-dark rounded-full relative cursor-pointer">
                          <div className={`absolute ${i < 2 ? 'right-0' : 'left-0'} top-[2px] w-5 h-5 rounded-full bg-white transition-transform ${i < 2 ? 'translate-x-[-2px]' : 'translate-x-[2px]'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Currency Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-muted-foreground">Default Currency</label>
                      <Button variant="outline" className="w-full mt-1 justify-between">
                        USD - US Dollar <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Date Format</label>
                      <Button variant="outline" className="w-full mt-1 justify-between">
                        MM/DD/YYYY <ArrowDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button>Save Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FinanceDashboard;
