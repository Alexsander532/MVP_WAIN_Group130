'use client'

import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CreditCard, 
  DollarSign, 
  Activity, 
  Zap, 
  TrendingUp, 
  Calendar,
  Download,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export default function BillingPage() {
  // Mock data
  const currentPlan = {
    name: "Plus",
    price: 29.99,
    currency: "USD",
    billingCycle: "monthly",
    features: [
      "10,000 API calls/month",
      "Priority support",
      "Advanced analytics",
      "Unlimited integrations",
      "Automatic backup"
    ]
  }

  const usage = {
    apiCalls: {
      used: 7543,
      limit: 10000,
      percentage: 75.43
    },
    totalSpent: 89.97,
    currentMonth: 29.99,
    lastBillingDate: "2024-01-15",
    nextBillingDate: "2024-02-15"
  }

  const apiCallsHistory = [
    { date: "2024-01-20", calls: 1250, cost: 3.75 },
    { date: "2024-01-19", calls: 980, cost: 2.94 },
    { date: "2024-01-18", calls: 1100, cost: 3.30 },
    { date: "2024-01-17", calls: 850, cost: 2.55 },
    { date: "2024-01-16", calls: 1200, cost: 3.60 }
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Billing</h1>
            <p className="text-muted-foreground">Manage your plan, usage and platform expenses</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download Invoice
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <CreditCard className="w-4 h-4 mr-2" />
              Update Plan
            </Button>
          </div>
        </div>

        {/* Current Plan */}
        <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {currentPlan.name} Plan
                    <Badge className="bg-blue-600 text-white">Active</Badge>
                  </CardTitle>
                  <p className="text-muted-foreground">
                    ${currentPlan.price}/{currentPlan.billingCycle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Next billing</p>
                <p className="font-semibold">{usage.nextBillingDate}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Included features:</h4>
                <ul className="space-y-2">
                  {currentPlan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">API usage this month</span>
                    <span className="text-sm text-muted-foreground">
                      {usage.apiCalls.used.toLocaleString()} / {usage.apiCalls.limit.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={usage.apiCalls.percentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {(100 - usage.apiCalls.percentage).toFixed(1)}% remaining
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">
                API Calls (Month)
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-blue-600 transition-colors duration-300">
                {usage.apiCalls.used.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                of {usage.apiCalls.limit.toLocaleString()} included
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-green-600 transition-colors duration-300">
                Total Spent
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-green-600 transition-colors duration-300">
                ${usage.totalSpent.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Last 3 months
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-purple-600 transition-colors duration-300">
                Current Invoice
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-purple-600 transition-colors duration-300">
                ${usage.currentMonth.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                Due on {usage.nextBillingDate}
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-orange-600 transition-colors duration-300">
                Savings
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-orange-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-orange-600 transition-colors duration-300">
                $15.00
              </div>
              <p className="text-xs text-muted-foreground">
                vs. Basic plan
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Usage History and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Calls History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Usage History (Last 5 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiCallsHistory.map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{day.date}</p>
                      <p className="text-sm text-muted-foreground">
                        {day.calls.toLocaleString()} calls
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${day.cost.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">cost</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts and Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Alerts and Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">
                      High usage detected
                    </p>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      You have already used 75% of your monthly API limit. Consider optimizing your calls.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Payment processed
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Your invoice of ${usage.currentMonth.toFixed(2)} was successfully paid on {usage.lastBillingDate}.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">
                      Upgrade available
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      The Pro plan offers 50,000 API calls for just $10 more.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium">•••• •••• •••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 12/26</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Primary</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Card
                </Button>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Invoice History</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <span className="text-sm">January 2024</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$29.99</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <span className="text-sm">December 2023</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$29.99</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded">
                    <span className="text-sm">November 2023</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">$29.99</span>
                      <Button variant="ghost" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}