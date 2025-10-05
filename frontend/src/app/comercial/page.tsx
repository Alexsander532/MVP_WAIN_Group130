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
            <h1 className="text-3xl font-bold text-foreground">Comercial</h1>
            <p className="text-muted-foreground">Gestão de vendas, leads e relacionamento com clientes</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lead
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-blue-600 transition-colors duration-300">Leads Ativos</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-blue-600 transition-colors duration-300">127</div>
              <p className="text-xs text-muted-foreground">
                +12% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-green-600 transition-colors duration-300">Conversões</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-green-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-green-600 transition-colors duration-300">23</div>
              <p className="text-xs text-muted-foreground">
                +8% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-purple-600 transition-colors duration-300">Taxa de Conversão</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-purple-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-purple-600 transition-colors duration-300">18.1%</div>
              <p className="text-xs text-muted-foreground">
                +2.3% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium group-hover:text-emerald-600 transition-colors duration-300">Receita Prevista</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground group-hover:text-emerald-600 group-hover:scale-110 transition-all duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary group-hover:text-emerald-600 transition-colors duration-300">R$ 45.230</div>
              <p className="text-xs text-muted-foreground">
                +15% em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros e Busca</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar por nome, telefone ou email..."
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Leads Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Pipeline de Vendas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Novos Leads</h4>
                    <p className="text-sm text-muted-foreground">45 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">45</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Em Contato</h4>
                    <p className="text-sm text-muted-foreground">32 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">32</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Interessados</h4>
                    <p className="text-sm text-muted-foreground">28 leads</p>
                  </div>
                  <div className="text-2xl font-bold text-primary">28</div>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <div>
                    <h4 className="font-medium text-foreground">Negociação</h4>
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
              <CardTitle>Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Ligação realizada</p>
                    <p className="text-xs text-muted-foreground">Maria Silva - 10:30</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Mail className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Email enviado</p>
                    <p className="text-xs text-muted-foreground">João Santos - 09:15</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Users className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Reunião agendada</p>
                    <p className="text-xs text-muted-foreground">Ana Costa - 08:45</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Lead convertido</p>
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
            <CardTitle className="text-lg font-semibold">Lista de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Tabela de Leads
              </h3>
              <p className="text-muted-foreground mb-4">
                Aqui será exibida a tabela com todos os leads e prospects.
              </p>
              <p className="text-sm text-muted-foreground">
                Funcionalidades futuras: gestão de leads, follow-up, histórico de contatos, etc.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}