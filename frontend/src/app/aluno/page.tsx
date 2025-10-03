"use client"

import { useState, lazy, Suspense } from 'react'
import { AppLayout } from '@/components/app-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Loading } from '@/components/ui/loading'
import { Users, Plus, Search, Filter, FileText, Printer, ClipboardList, Activity } from 'lucide-react'
import { StudentFormData } from '@/components/forms/student-form'

// Lazy loading do StudentForm para melhor performance
const StudentForm = lazy(() => import('@/components/forms/student-form').then(module => ({ default: module.StudentForm })))

// Importação do tipo
// (remove this line – the duplicate type import is deleted)

export default function AlunoPage() {
  const [activeTab, setActiveTab] = useState("cadastro")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleNewStudent = () => {
    setIsModalOpen(true)
  }

  const handleStudentSubmit = (data: StudentFormData) => {
    console.log('Dados do aluno:', data)
    // Aqui você implementaria a lógica para salvar o aluno
    setIsModalOpen(false)
    // Mostrar mensagem de sucesso
  }

  const handleStudentSubmitInline = (data: StudentFormData) => {
    console.log('Dados do aluno (inline):', data)
    // Aqui você implementaria a lógica para salvar o aluno
    // Mostrar mensagem de sucesso
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Removido: não abre mais o modal quando clica na aba cadastro
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestão de Alunos</h1>
            <p className="text-gray-600">Gerencie todos os alunos da autoescola</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleNewStudent}
          >
            <Plus className="w-4 h-4 mr-2" />
            Novo Cadastro
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total de Alunos
              </CardTitle>
              <Users className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-gray-500">+12 este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Ativos
              </CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">198</div>
              <p className="text-xs text-gray-500">80% do total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Em Formação
              </CardTitle>
              <Users className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">35</div>
              <p className="text-xs text-gray-500">14% do total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Formados
              </CardTitle>
              <Users className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-gray-500">6% do total</p>
            </CardContent>
          </Card>
        </div>

        {/* Sub-abas */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="cadastro" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Cadastro
            </TabsTrigger>
            <TabsTrigger value="historico" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="dae" className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Impressão de DAE
            </TabsTrigger>
            <TabsTrigger value="ticket" className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4" />
              Impressão de Ticket
            </TabsTrigger>
            <TabsTrigger value="exames" className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Acompanhamento de Exames
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cadastro" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro de Alunos</CardTitle>
                <CardDescription>
                  Preencha os dados abaixo para cadastrar um novo aluno
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Loading />}>
                  <StudentForm 
                    onSubmit={handleStudentSubmitInline}
                    onCancel={() => setActiveTab("historico")}
                  />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="historico" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Alunos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Aqui será exibido o histórico completo dos alunos, incluindo aulas realizadas, progresso e avaliações.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dae" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Impressão de DAE</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Printer className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Funcionalidade para gerar e imprimir Documentos de Arrecadação Estadual (DAE) para os alunos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ticket" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Impressão de Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <ClipboardList className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Gere e imprima tickets e comprovantes para os alunos, incluindo recibos de pagamento e agendamentos.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="exames" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Acompanhamento de Exames</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Acompanhe o status dos exames teóricos e práticos dos alunos, incluindo agendamentos e resultados.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
                    placeholder="Buscar por nome, CPF ou telefone..."
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

        {/* Modal de Cadastro */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastro de Novo Aluno</DialogTitle>
              <DialogDescription>
                Preencha os dados abaixo para cadastrar um novo aluno na autoescola.
              </DialogDescription>
            </DialogHeader>
            <Suspense fallback={<Loading />}>
              <StudentForm 
                onSubmit={handleStudentSubmit}
                onCancel={() => setIsModalOpen(false)}
              />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  )
}