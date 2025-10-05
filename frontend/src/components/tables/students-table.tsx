"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useStudents, Student } from "@/hooks/useStudents"
import { StudentForm } from "@/components/forms/student-form"
import { Edit, Trash2, Eye, Users, Phone, Mail } from "lucide-react"
import { toast } from "sonner"

interface StudentsTableProps {
  searchQuery?: string
}

export function StudentsTable({ searchQuery = "" }: StudentsTableProps) {
  const { students, loading, removeStudent, searchStudents } = useStudents()
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Filtrar alunos baseado na busca externa
  const filteredStudents = searchQuery.trim() 
    ? searchStudents(searchQuery) 
    : students

  const handleEdit = (student: Student) => {
    setEditingStudent(student)
    setIsEditDialogOpen(true)
  }

  const handleView = (student: Student) => {
    setViewingStudent(student)
    setIsViewDialogOpen(true)
  }

  const handleDelete = async (studentId: string) => {
    try {
      const success = removeStudent(studentId)
      if (success) {
        toast.success("Aluno removido com sucesso!")
      } else {
        toast.error("Erro ao remover aluno")
      }
    } catch (error) {
      console.error("Erro ao remover aluno:", error)
      toast.error("Erro ao remover aluno")
    }
  }

  const handleEditSubmit = () => {
    setIsEditDialogOpen(false)
    setEditingStudent(null)
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return "-"
    try {
      return new Date(dateString).toLocaleDateString("pt-BR")
    } catch {
      return dateString
    }
  }

  const formatPhone = (phone: string) => {
    if (!phone) return "-"
    // Formatar telefone brasileiro
    const cleaned = phone.replace(/\D/g, "")
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
    }
    return phone
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-muted-foreground">Carregando alunos...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">




      {/* Tabela */}
      <Card>
        <CardHeader>
          <CardTitle>Alunos Cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredStudents.length === 0 ? (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {searchQuery ? "Nenhum aluno encontrado" : "Nenhum aluno cadastrado"}
              </h3>
              <p className="text-muted-foreground">
                {searchQuery 
                  ? "Tente ajustar os termos da busca" 
                  : "Cadastre o primeiro aluno para começar"
                }
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Celular</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Data Nasc.</TableHead>
                    <TableHead>Cidade</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Cadastrado em</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.cpf || "-"}</TableCell>
                      <TableCell>{formatPhone(student.phone)}</TableCell>
                      <TableCell>{student.email || "-"}</TableCell>
                      <TableCell>{formatDate(student.birthDate)}</TableCell>
                      <TableCell>{student.city || "-"}</TableCell>
                      <TableCell>
                        {student.state && (
                          <Badge variant="outline">{student.state}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{formatDate(student.createdAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleView(student)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(student)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                          <AlertDialogTrigger>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Tem certeza que deseja excluir o aluno <strong>{student.name}</strong>? 
                                  Esta ação não pode ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(student.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Excluir
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog de Edição */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Aluno</DialogTitle>
            <DialogDescription>
              Faça as alterações necessárias nos dados do aluno.
            </DialogDescription>
          </DialogHeader>
          {editingStudent && (
            <StudentForm
              studentId={editingStudent.id}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog de Visualização */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Aluno</DialogTitle>
          </DialogHeader>
          {viewingStudent && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nome Completo</Label>
                  <p className="text-sm">{viewingStudent.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Nome da Mãe</Label>
                  <p className="text-sm">{viewingStudent.motherName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">CPF</Label>
                  <p className="text-sm">{viewingStudent.cpf}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Data de Nascimento</Label>
                  <p className="text-sm">{formatDate(viewingStudent.birthDate)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Celular</Label>
                  <p className="text-sm flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    {formatPhone(viewingStudent.phone)}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {viewingStudent.email || "-"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Endereço Completo</Label>
                  <p className="text-sm">
                    {viewingStudent.address}, {viewingStudent.number} - {viewingStudent.neighborhood}
                    <br />
                    {viewingStudent.city} - {viewingStudent.state}, CEP: {viewingStudent.zipCode}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Cadastrado em</Label>
                  <p className="text-sm">{formatDate(viewingStudent.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Última atualização</Label>
                  <p className="text-sm">{formatDate(viewingStudent.updatedAt)}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDialogOpen(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}