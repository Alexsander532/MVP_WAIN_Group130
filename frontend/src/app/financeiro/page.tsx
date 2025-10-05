import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { DollarSign, Plus, TrendingUp, TrendingDown, CreditCard, AlertCircle, Calendar, PieChart } from 'lucide-react'

export default function FinanceiroPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
            <p className="text-gray-600">Controle completo das finanças da autoescola</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Relatório
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-green-600 transition-colors duration-300">
                Receita Mensal
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">R$ 45.280</div>
              <p className="text-xs text-gray-500">+8% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-red-600 transition-colors duration-300">
                Despesas Mensais
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600 group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">R$ 18.450</div>
              <p className="text-xs text-gray-500">+3% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-300">
                Lucro Líquido
              </CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">R$ 26.830</div>
              <p className="text-xs text-gray-500">+12% vs mês anterior</p>
            </CardContent>
          </Card>

          <Card className="transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-1 hover:scale-105 cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600 group-hover:text-yellow-600 transition-colors duration-300">
                Contas a Receber
              </CardTitle>
              <CreditCard className="h-4 w-4 text-yellow-600 group-hover:scale-110 transition-transform duration-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">R$ 12.340</div>
              <p className="text-xs text-gray-500">23 pendências</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Management Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Contas a Receber */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                Contas a Receber
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">Maria Silva</p>
                    <p className="text-sm text-green-600">Mensalidade - Vence hoje</p>
                  </div>
                  <span className="font-bold text-green-700">R$ 380</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-900">João Santos</p>
                    <p className="text-sm text-yellow-600">Aulas extras - Vence em 3 dias</p>
                  </div>
                  <span className="font-bold text-yellow-700">R$ 240</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-900">Ana Costa</p>
                    <p className="text-sm text-red-600">Mensalidade - 5 dias em atraso</p>
                  </div>
                  <span className="font-bold text-red-700">R$ 380</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contas a Pagar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                Contas a Pagar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-red-900">Aluguel</p>
                    <p className="text-sm text-red-600">Vence amanhã</p>
                  </div>
                  <span className="font-bold text-red-700">R$ 3.500</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-yellow-900">Combustível</p>
                    <p className="text-sm text-yellow-600">Vence em 5 dias</p>
                  </div>
                  <span className="font-bold text-yellow-700">R$ 1.200</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium text-blue-900">Salários</p>
                    <p className="text-sm text-blue-600">Vence em 10 dias</p>
                  </div>
                  <span className="font-bold text-blue-700">R$ 8.500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resumo Financeiro */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                Resumo do Mês
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Mensalidades</span>
                    <span className="font-medium text-green-600">R$ 32.400</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '72%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Aulas Extras</span>
                    <span className="font-medium text-blue-600">R$ 8.640</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '19%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Taxas</span>
                    <span className="font-medium text-purple-600">R$ 4.240</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '9%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Fluxo de Caixa</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Gráfico de Fluxo de Caixa
                </h3>
                <p className="text-muted-foreground mb-4">
                  Aqui será exibido o gráfico de entradas e saídas mensais.
                </p>
                <p className="text-sm text-muted-foreground">
                  Funcionalidades futuras: gráficos interativos, comparações anuais, etc.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Relatórios Financeiros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="w-4 h-4 mr-2" />
                  Relatório Mensal
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <PieChart className="w-4 h-4 mr-2" />
                  Análise de Receitas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Controle de Despesas
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Inadimplência
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Demonstrativo de Resultados
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}