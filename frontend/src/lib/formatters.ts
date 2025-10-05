/**
 * Utilitários para formatação e validação de campos de formulário
 */

// Estados do Brasil
export const BRAZILIAN_STATES = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
]

/**
 * Formatar CPF no formato xxx.xxx.xxx-xx
 */
export const formatCPF = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)
  
  // Aplica a formatação
  return limited
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

/**
 * Formatar telefone no formato (xx)xxxxx-xxxx
 */
export const formatPhone = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")
  
  // Limita a 11 dígitos
  const limited = numbers.slice(0, 11)
  
  // Aplica a formatação
  if (limited.length <= 2) {
    return limited
  } else if (limited.length <= 7) {
    return limited.replace(/(\d{2})(\d)/, "($1)$2")
  } else {
    return limited.replace(/(\d{2})(\d{5})(\d)/, "($1)$2-$3")
  }
}

/**
 * Formatar CEP no formato xxxxx-xxx
 */
export const formatCEP = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")
  
  // Limita a 8 dígitos
  const limited = numbers.slice(0, 8)
  
  // Aplica a formatação
  return limited.replace(/(\d{5})(\d)/, "$1-$2")
}

/**
 * Formatar data no formato dd/mm/aaaa
 */
export const formatDate = (value: string): string => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, "")
  
  // Limita a 8 dígitos
  const limited = numbers.slice(0, 8)
  
  // Aplica a formatação
  return limited
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
}

/**
 * Validar email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validar CPF
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove formatação
  const numbers = cpf.replace(/\D/g, "")
  
  // Verifica se tem 11 dígitos
  if (numbers.length !== 11) return false
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(numbers)) return false
  
  // Validação do primeiro dígito verificador
  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(numbers[i]) * (10 - i)
  }
  let remainder = sum % 11
  let digit1 = remainder < 2 ? 0 : 11 - remainder
  
  if (parseInt(numbers[9]) !== digit1) return false
  
  // Validação do segundo dígito verificador
  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(numbers[i]) * (11 - i)
  }
  remainder = sum % 11
  let digit2 = remainder < 2 ? 0 : 11 - remainder
  
  return parseInt(numbers[10]) === digit2
}

/**
 * Validar telefone brasileiro
 */
export const validatePhone = (phone: string): boolean => {
  const numbers = phone.replace(/\D/g, "")
  // Telefone brasileiro deve ter 10 ou 11 dígitos
  return numbers.length === 10 || numbers.length === 11
}

/**
 * Validar CEP
 */
export const validateCEP = (cep: string): boolean => {
  const numbers = cep.replace(/\D/g, "")
  return numbers.length === 8
}

/**
 * Converter data do formato dd/mm/aaaa para aaaa-mm-dd (formato do input date)
 */
export const dateToInputFormat = (dateStr: string): string => {
  if (!dateStr) return ""
  
  // Se já está no formato correto (aaaa-mm-dd)
  if (dateStr.includes("-") && dateStr.length === 10) {
    return dateStr
  }
  
  // Se está no formato dd/mm/aaaa
  if (dateStr.includes("/")) {
    const [day, month, year] = dateStr.split("/")
    if (day && month && year && year.length === 4) {
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    }
  }
  
  return ""
}

/**
 * Converter data do formato aaaa-mm-dd para dd/mm/aaaa (para exibição)
 */
export const dateToDisplayFormat = (dateStr: string): string => {
  if (!dateStr) return ""
  
  // Se está no formato aaaa-mm-dd
  if (dateStr.includes("-") && dateStr.length === 10) {
    const [year, month, day] = dateStr.split("-")
    return `${day}/${month}/${year}`
  }
  
  return dateStr
}