import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Briefcase, Plus, Search, Filter, TrendingUp, Users, Phone, Mail } from 'lucide-react'

export default function ComercialPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Sales</h1>
            <p className="text-muted-foreground">Sales management, leads and customer relationship</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Lead
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">Active Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-blue-600 transition-colors duration-300">127</div>
              <p className="text-xs text-muted-foreground">
                +12% compared to previous month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-green-600 transition-colors duration-300">Conversions</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-green-600 transition-colors duration-300">23</div>
              <p className="text-xs text-muted-foreground">
                +8% compared to previous month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-purple-600 transition-colors duration-300">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-purple-600 transition-colors duration-300">18.1%</div>
              <p className="text-xs text-muted-foreground">
                +2.3% compared to previous month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-emerald-600 transition-colors duration-300">Expected Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-emerald-600 transition-colors duration-300">$ 45,230</div>
              <p className="text-xs text-muted-foreground">
                +15% compared to previous month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filters and Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search by name, phone or email..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">New Leads</h4>
                    <p className="text-sm text-muted-foreground">45 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">45</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">In Contact</h4>
                    <p className="text-sm text-muted-foreground">32 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">32</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Interested</h4>
                    <p className="text-sm text-muted-foreground">28 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">28</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Negotiation</h4>
                    <p className="text-sm text-muted-foreground">15 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">15</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Call made</p>
                    <p className="text-xs text-muted-foreground">Maria Silva - 10:30</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Email sent</p>
                    <p className="text-xs text-muted-foreground">João Santos - 09:15</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Meeting scheduled</p>
                    <p className="text-xs text-muted-foreground">Ana Costa - 08:45</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Lead converted</p>
                    <p className="text-xs text-muted-foreground">Carlos Oliveira - 08:00</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads Table Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Leads List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Leads Table
              </h3>
              <p className="text-muted-foreground mb-4">
                Here will be displayed the table with all leads and prospects.
              </p>
              <p className="text-sm text-muted-foreground">
                Future features: lead management, follow-up, contact history, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}