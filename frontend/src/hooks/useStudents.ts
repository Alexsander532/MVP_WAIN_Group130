"use client"

import { useState, useEffect } from 'react'
import { StudentFormData } from '@/components/forms/student-form'

export interface Student extends StudentFormData {
  id: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = 'autogestor_students'

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    try {
      const storedStudents = localStorage.getItem(STORAGE_KEY)
      if (storedStudents) {
        const parsedStudents = JSON.parse(storedStudents)
        setStudents(parsedStudents)
      }
    } catch (error) {
      console.error('Erro ao carregar dados dos alunos:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Salvar dados no localStorage sempre que a lista de alunos mudar
  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students))
      } catch (error) {
        console.error('Erro ao salvar dados dos alunos:', error)
      }
    }
  }, [students, loading])

  // Adicionar novo aluno
  const addStudent = (studentData: StudentFormData): Student => {
    const newStudent: Student = {
      ...studentData,
      id: generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setStudents(prev => [...prev, newStudent])
    return newStudent
  }

  // Atualizar aluno existente
  const updateStudent = (id: string, studentData: Partial<StudentFormData>): Student | null => {
    let updatedStudent: Student | null = null

    setStudents(prev => prev.map(student => {
      if (student.id === id) {
        updatedStudent = {
          ...student,
          ...studentData,
          updatedAt: new Date().toISOString()
        }
        return updatedStudent
      }
      return student
    }))

    return updatedStudent
  }

  // Remover aluno
  const removeStudent = (id: string): boolean => {
    const studentExists = students.some(student => student.id === id)
    if (studentExists) {
      setStudents(prev => prev.filter(student => student.id !== id))
      return true
    }
    return false
  }

  // Buscar aluno por ID
  const getStudentById = (id: string): Student | undefined => {
    return students.find(student => student.id === id)
  }

  // Buscar alunos por filtros
  const searchStudents = (query: string): Student[] => {
    if (!query.trim()) return students

    const lowercaseQuery = query.toLowerCase()
    return students.filter(student => 
      student.name.toLowerCase().includes(lowercaseQuery) ||
      student.cpf.includes(query) ||
      student.phone.includes(query) ||
      student.email.toLowerCase().includes(lowercaseQuery) ||
      student.motherName.toLowerCase().includes(lowercaseQuery)
    )
  }

  // Limpar todos os dados
  const clearAllStudents = (): void => {
    setStudents([])
  }

  // Gerar ID único
  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Estatísticas
  const getStats = () => {
    return {
      total: students.length,
      addedToday: students.filter(student => {
        const today = new Date().toDateString()
        const studentDate = new Date(student.createdAt).toDateString()
        return today === studentDate
      }).length,
      addedThisMonth: students.filter(student => {
        const now = new Date()
        const studentDate = new Date(student.createdAt)
        return studentDate.getMonth() === now.getMonth() && 
               studentDate.getFullYear() === now.getFullYear()
      }).length
    }
  }

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    removeStudent,
    getStudentById,
    searchStudents,
    clearAllStudents,
    getStats
  }
}