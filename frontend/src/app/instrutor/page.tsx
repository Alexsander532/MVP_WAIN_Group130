import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GraduationCap, Plus, Search, Filter, Clock, Users, Calendar, CheckCircle } from 'lucide-react'

export default function InstrutorPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Instructor</h1>
            <p className="text-muted-foreground">Management of instructors, classes and schedules</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Instructor
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-primary transition-colors duration-300">Active Instructors</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground">
                +2 new this month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">Classes Today</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-blue-600 transition-colors duration-300">28</div>
              <p className="text-xs text-muted-foreground">
                6 classes remaining
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-green-600 transition-colors duration-300">Hours Worked</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-green-600 transition-colors duration-300">156h</div>
              <p className="text-xs text-muted-foreground">
                This month
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-emerald-600 transition-colors duration-300">Approval Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-emerald-600 transition-colors duration-300">87%</div>
              <p className="text-xs text-muted-foreground">
                +5% compared to previous month
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
                    placeholder="Search by name, ID or specialty..."
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
          {/* Daily Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">08:00 - 09:00</h4>
                    <p className="text-sm text-muted-foreground">João Silva - Practical Class</p>
                  </div>
                  <div className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                    In progress
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">09:00 - 10:00</h4>
                    <p className="text-sm text-muted-foreground">Maria Santos - Theory Class</p>
                  </div>
                  <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    Next
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">10:00 - 11:00</h4>
                    <p className="text-sm text-muted-foreground">Carlos Oliveira - Mock Test</p>
                  </div>
                  <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    Scheduled
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">11:00 - 12:00</h4>
                    <p className="text-sm text-muted-foreground">Ana Costa - Practical Class</p>
                  </div>
                  <div className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                    Scheduled
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance dos Instrutores */}
          <Card>
            <CardHeader>
              <CardTitle>Performance dos Instrutores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Prof. Roberto</h4>
                      <p className="text-sm text-muted-foreground">95% aprovação</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">45 alunos</p>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Prof. Mariana</h4>
                      <p className="text-sm text-muted-foreground">92% aprovação</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">38 alunos</p>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Prof. Carlos</h4>
                      <p className="text-sm text-muted-foreground">88% aprovação</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">32 alunos</p>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">Prof. Ana</h4>
                      <p className="text-sm text-muted-foreground">90% aprovação</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">29 alunos</p>
                    <p className="text-xs text-muted-foreground">Este mês</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instrutores Table Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Lista de Instrutores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <GraduationCap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Tabela de Instrutores
              </h3>
              <p className="text-muted-foreground mb-4">
                Aqui será exibida a tabela com todos os instrutores cadastrados.
              </p>
              <p className="text-sm text-muted-foreground">
                Funcionalidades futuras: gestão de horários, avaliações, histórico de aulas, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}