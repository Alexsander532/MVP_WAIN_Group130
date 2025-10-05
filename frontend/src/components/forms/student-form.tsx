"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectItem } from "@/components/ui/select"
import { useStudents } from "@/hooks/useStudents"
import { toast } from "sonner"
import { 
  formatCPF, 
  formatPhone, 
  formatCEP, 
  formatDate,
  validateEmail,
  validateCPF,
  validatePhone,
  validateCEP,
  BRAZILIAN_STATES,
  dateToInputFormat,
  dateToDisplayFormat
} from "@/lib/formatters"

interface StudentFormProps {
  onSubmit?: (data: StudentFormData) => void
  onCancel?: () => void
  studentId?: string // Para edição
}

export interface StudentFormData {
  name: string
  motherName: string
  email: string
  phone: string
  cpf: string
  birthDate: string
  address: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export function StudentForm({ onSubmit, onCancel, studentId }: StudentFormProps) {
  const { addStudent, updateStudent, getStudentById } = useStudents()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Inicializar dados do formulário (para edição ou novo cadastro)
  const [formData, setFormData] = useState<StudentFormData>(() => {
    if (studentId) {
      const existingStudent = getStudentById(studentId)
      if (existingStudent) {
        const { id, createdAt, updatedAt, ...studentData } = existingStudent
        return studentData
      }
    }
    return {
      name: "",
      motherName: "",
      email: "",
      phone: "",
      cpf: "",
      birthDate: "",
      address: "",
      number: "",
      neighborhood: "",
      city: "",
      state: "",
      zipCode: "",
    }
  })

  // Estados para controle de validação
  const [errors, setErrors] = useState<Partial<StudentFormData>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof StudentFormData, boolean>>>({})

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    let formattedValue = value
    let error = ""

    // Aplicar formatação automática baseada no campo
    switch (field) {
      case "cpf":
        formattedValue = formatCPF(value)
        if (touched[field] && formattedValue && !validateCPF(formattedValue)) {
          error = "CPF inválido"
        }
        break
      case "phone":
        formattedValue = formatPhone(value)
        if (touched[field] && formattedValue && !validatePhone(formattedValue)) {
          error = "Telefone inválido"
        }
        break
      case "zipCode":
        formattedValue = formatCEP(value)
        if (touched[field] && formattedValue && !validateCEP(formattedValue)) {
          error = "CEP inválido"
        }
        break
      case "birthDate":
        formattedValue = formatDate(value)
        break
      case "email":
        if (touched[field] && value && !validateEmail(value)) {
          error = "Email inválido"
        }
        break
    }

    setFormData(prev => ({
      ...prev,
      [field]: formattedValue
    }))

    // Atualizar erros
    setErrors(prev => ({
      ...prev,
      [field]: error
    }))
  }

  const handleBlur = (field: keyof StudentFormData) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
    }))

    // Revalidar o campo quando perder o foco
    const value = formData[field]
    handleInputChange(field, value)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<StudentFormData> = {}
    
    // Validações obrigatórias
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório"
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório"
    else if (!validateEmail(formData.email)) newErrors.email = "Email inválido"
    
    if (!formData.cpf.trim()) newErrors.cpf = "CPF é obrigatório"
    else if (!validateCPF(formData.cpf)) newErrors.cpf = "CPF inválido"
    
    if (!formData.phone.trim()) newErrors.phone = "Telefone é obrigatório"
    else if (!validatePhone(formData.phone)) newErrors.phone = "Telefone inválido"
    
    if (formData.zipCode && !validateCEP(formData.zipCode)) {
      newErrors.zipCode = "CEP inválido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Marcar todos os campos como tocados para mostrar erros
    const allFields = Object.keys(formData) as (keyof StudentFormData)[]
    setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
    
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário")
      setIsSubmitting(false)
      return
    }

    try {
      let result
      if (studentId) {
        // Atualizar aluno existente
        result = updateStudent(studentId, formData)
        if (result) {
          toast.success("Aluno atualizado com sucesso!")
        } else {
          toast.error("Erro ao atualizar aluno")
          return
        }
      } else {
        // Adicionar novo aluno
        result = addStudent(formData)
        toast.success("Aluno cadastrado com sucesso!")
        
        // Limpar formulário após cadastro
        setFormData({
          name: "",
          motherName: "",
          email: "",
          phone: "",
          cpf: "",
          birthDate: "",
          address: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
          zipCode: "",
        })
        setErrors({})
        setTouched({})
      }

      // Chamar callback personalizado se fornecido
      onSubmit?.(formData)
      
    } catch (error) {
      console.error("Erro ao salvar aluno:", error)
      toast.error("Erro ao salvar dados do aluno")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nome Completo */}
        <div className="md:col-span-2">
          <Label htmlFor="name">Nome Completo *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={errors.name ? "border-red-500" : ""}
            placeholder="Digite o nome completo"
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        {/* Nome da Mãe */}
        <div className="md:col-span-2">
          <Label htmlFor="motherName">Nome da Mãe</Label>
          <Input
            id="motherName"
            type="text"
            value={formData.motherName}
            onChange={(e) => handleInputChange("motherName", e.target.value)}
            onBlur={() => handleBlur("motherName")}
            className={errors.motherName ? "border-red-500" : ""}
            placeholder="Digite o nome completo da mãe"
          />
          {errors.motherName && <p className="text-sm text-red-500 mt-1">{errors.motherName}</p>}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={errors.email ? "border-red-500" : ""}
            placeholder="email@exemplo.com"
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

        {/* Celular */}
        <div>
          <Label htmlFor="phone">Celular *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={errors.phone ? "border-red-500" : ""}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
        </div>

        {/* CPF */}
        <div>
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            type="text"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            onBlur={() => handleBlur("cpf")}
            className={errors.cpf ? "border-red-500" : ""}
            placeholder="000.000.000-00"
          />
          {errors.cpf && <p className="text-sm text-red-500 mt-1">{errors.cpf}</p>}
        </div>



        {/* Data de Nascimento */}
        <div>
          <Label htmlFor="birthDate">Data de Nascimento</Label>
          <Input
            id="birthDate"
            type="text"
            value={formData.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
            onBlur={() => handleBlur("birthDate")}
            className={errors.birthDate ? "border-red-500" : ""}
            placeholder="dd/mm/aaaa"
            maxLength={10}
          />
          {errors.birthDate && <p className="text-sm text-red-500 mt-1">{errors.birthDate}</p>}
        </div>

        {/* CEP */}
        <div>
          <Label htmlFor="zipCode">CEP</Label>
          <Input
            id="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            onBlur={() => handleBlur("zipCode")}
            className={errors.zipCode ? "border-red-500" : ""}
            placeholder="00000-000"
            maxLength={9}
          />
          {errors.zipCode && <p className="text-sm text-red-500 mt-1">{errors.zipCode}</p>}
        </div>

        {/* Endereço */}
        <div>
          <Label htmlFor="address">Endereço *</Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
            placeholder="Nome da rua"
          />
        </div>

        {/* Número */}
        <div>
          <Label htmlFor="number">Número *</Label>
          <Input
            id="number"
            type="text"
            value={formData.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
            required
            placeholder="123"
          />
        </div>

        {/* Bairro */}
        <div>
          <Label htmlFor="neighborhood">Bairro *</Label>
          <Input
            id="neighborhood"
            type="text"
            value={formData.neighborhood}
            onChange={(e) => handleInputChange("neighborhood", e.target.value)}
            required
            placeholder="Nome do bairro"
          />
        </div>

        {/* Cidade */}
        <div>
          <Label htmlFor="city">Cidade</Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            placeholder="Nome da cidade"
          />
        </div>

        {/* Estado */}
        <div>
          <Label htmlFor="state">Estado</Label>
          <Select
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            onBlur={() => handleBlur("state")}
            className={errors.state ? "border-red-500" : ""}
          >
            <option value="">Selecione um estado</option>
            {BRAZILIAN_STATES.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </Select>
          {errors.state && <p className="text-sm text-red-500 mt-1">{errors.state}</p>}
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? (studentId ? "Atualizando..." : "Cadastrando...") 
            : (studentId ? "Atualizar Aluno" : "Cadastrar Aluno")
          }
        </Button>
      </div>
    </form>
  )
}

// StudentFormData is already exported above; no re-export needed
