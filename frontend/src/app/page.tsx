import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Car, FileText, DollarSign, TrendingUp, AlertCircle } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    {
      title: 'Total de Alunos',
      value: '248',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Users,
    },
    {
      title: 'Veículos Ativos',
      value: '15',
      change: '+2',
      changeType: 'positive' as const,
      icon: Car,
    },
    {
      title: 'Aulas Hoje',
      value: '32',
      change: '+5%',
      changeType: 'positive' as const,
      icon: FileText,
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 45.280',
      change: '+8%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
  ]

  const recentActivities = [
    { id: 1, activity: 'Novo aluno cadastrado: Maria Silva', time: '2 min atrás' },
    { id: 2, activity: 'Aula prática concluída: João Santos', time: '15 min atrás' },
    { id: 3, activity: 'Veículo ABC-1234 em manutenção', time: '1 hora atrás' },
    { id: 4, activity: 'Pagamento recebido: Ana Costa', time: '2 horas atrás' },
  ]

  const alerts = [
    { id: 1, message: 'Renovação de CNH vencendo em 5 dias', type: 'warning' },
    { id: 2, message: 'Veículo XYZ-5678 precisa de revisão', type: 'info' },
    { id: 3, message: '3 alunos com mensalidade em atraso', type: 'error' },
  ]

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="flex items-center space-x-1 text-xs">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                    <span className="text-green-500">{stat.change}</span>
                    <span className="text-muted-foreground">vs mês anterior</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Atividades Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Alertas e Notificações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3">
                    <AlertCircle className={`h-4 w-4 mt-0.5 ${
                      alert.type === 'error' ? 'text-red-500' :
                      alert.type === 'warning' ? 'text-yellow-500' :
                      'text-blue-500'
                    }`} />
                    <p className="text-sm text-foreground">{alert.message}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Novo Aluno</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <FileText className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Agendar Aula</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <Car className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Registrar Veículo</p>
              </button>
              <button className="p-4 border border-border rounded-lg hover:bg-accent transition-colors">
                <DollarSign className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-foreground">Nova Cobrança</p>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
