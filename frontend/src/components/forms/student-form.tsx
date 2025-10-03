"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface StudentFormProps {
  onSubmit?: (data: StudentFormData) => void
  onCancel?: () => void
}

export interface StudentFormData {
  name: string
  email: string
  phone: string
  cpf: string
  rg: string
  birthDate: string
  address: string
  city: string
  state: string
  zipCode: string
  course: string
  enrollmentDate: string
}

export function StudentForm({ onSubmit, onCancel }: StudentFormProps) {
  const [formData, setFormData] = useState<StudentFormData>({
    name: "",
    email: "",
    phone: "",
    cpf: "",
    rg: "",
    birthDate: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    course: "",
    enrollmentDate: "",
  })

  const handleInputChange = (field: keyof StudentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit?.(formData)
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
            required
            placeholder="Digite o nome completo"
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
            placeholder="email@exemplo.com"
          />
        </div>

        {/* Telefone */}
        <div>
          <Label htmlFor="phone">Telefone *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
            placeholder="(11) 99999-9999"
          />
        </div>

        {/* CPF */}
        <div>
          <Label htmlFor="cpf">CPF *</Label>
          <Input
            id="cpf"
            type="text"
            value={formData.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            required
            placeholder="000.000.000-00"
          />
        </div>

        {/* RG */}
        <div>
          <Label htmlFor="rg">RG</Label>
          <Input
            id="rg"
            type="text"
            value={formData.rg}
            onChange={(e) => handleInputChange("rg", e.target.value)}
            placeholder="00.000.000-0"
          />
        </div>

        {/* Data de Nascimento */}
        <div>
          <Label htmlFor="birthDate">Data de Nascimento *</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => handleInputChange("birthDate", e.target.value)}
            required
          />
        </div>

        {/* Data de Matrícula */}
        <div>
          <Label htmlFor="enrollmentDate">Data de Matrícula *</Label>
          <Input
            id="enrollmentDate"
            type="date"
            value={formData.enrollmentDate}
            onChange={(e) => handleInputChange("enrollmentDate", e.target.value)}
            required
          />
        </div>

        {/* Endereço */}
        <div className="md:col-span-2">
          <Label htmlFor="address">Endereço *</Label>
          <Input
            id="address"
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
            placeholder="Rua, número, complemento"
          />
        </div>

        {/* Cidade */}
        <div>
          <Label htmlFor="city">Cidade *</Label>
          <Input
            id="city"
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
            placeholder="Nome da cidade"
          />
        </div>

        {/* Estado */}
        <div>
          <Label htmlFor="state">Estado *</Label>
          <Input
            id="state"
            type="text"
            value={formData.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
            required
            placeholder="SP"
            maxLength={2}
          />
        </div>

        {/* CEP */}
        <div>
          <Label htmlFor="zipCode">CEP *</Label>
          <Input
            id="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange("zipCode", e.target.value)}
            required
            placeholder="00000-000"
          />
        </div>

        {/* Curso */}
        <div>
          <Label htmlFor="course">Curso *</Label>
          <Input
            id="course"
            type="text"
            value={formData.course}
            onChange={(e) => handleInputChange("course", e.target.value)}
            required
            placeholder="Nome do curso"
          />
        </div>
      </div>

      {/* Botões */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button type="submit">
          Cadastrar Aluno
        </Button>
      </div>
    </form>
  )
}

// StudentFormData is already exported above; no re-export needed
