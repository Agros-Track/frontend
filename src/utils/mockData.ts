// Mock data for the cattle farm management system

export interface Animal {
  id: string
  arete: string
  type: "vaca" | "toro" | "novillo" | "ternero"
  breed: string
  sex: "M" | "F"
  birthDate: string
  age: string
  finca: string
  lote: string
  status: "activo" | "vendido" | "muerto"
  weight?: number
  state?: "produccion" | "preñada" | "enfermo" | "vendido" | "muerto"
}

export interface Finca {
  id: string
  name: string
  description: string
  area: string
  lotes: Lote[]
}

export interface Lote {
  id: string
  name: string
  type: string
  status: "en-pastoreo" | "en-descanso" | "disponible"
  area: string
  animalCount: number
}

export interface Alert {
  id: string
  type: "vacuna" | "tratamiento" | "peso" | "produccion"
  priority: "alta" | "media" | "baja"
  title: string
  description: string
  date: string
  animalId?: string
}

export interface Task {
  id: string
  title: string
  description: string
  assignedTo: string
  dueDate: string
  status: "pendiente" | "en-proceso" | "completado"
  loteId?: string
  animalId?: string
}

export interface ProductionRecord {
  id: string
  date: string
  animalId: string
  liters?: number
  weight?: number
}

export interface HealthRecord {
  id: string
  date: string
  animalId: string
  type: "vacuna" | "enfermedad" | "tratamiento"
  description: string
  nextDate?: string
}

export interface FeedRecord {
  id: string
  date: string
  target: string // lote or animal ID
  feedType: string
  quantity: number
  unit: string
}

export interface User {
  id: string
  name: string
  email: string
  role: "ADMIN_TENANT" | "TRABAJADOR" | "VETERINARIO"
  status: "activo" | "bloqueado"
}

export interface Plan {
  id: string
  name: string
  price: number
  interval: "monthly" | "yearly"
  features: string[]
  limits: {
    users: number
    storage: string
    animals: number
  }
}

export const mockPlans: Plan[] = [
  {
    id: "free",
    name: "Free Tier",
    price: 0,
    interval: "monthly",
    features: ["Gestión básica de animales", "1 Usuario", "Soporte comunitario"],
    limits: {
      users: 1,
      storage: "1GB",
      animals: 50,
    },
  },
  {
    id: "pro",
    name: "Pro",
    price: 29,
    interval: "monthly",
    features: ["Gestión avanzada", "Reportes PDF", "Soporte prioritario", "Múltiples usuarios"],
    limits: {
      users: 5,
      storage: "10GB",
      animals: 200,
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99,
    interval: "monthly",
    features: ["Todo ilimitado", "API Access", "Gerente de cuenta dedicado", "Auditoría avanzada"],
    limits: {
      users: 50,
      storage: "100GB",
      animals: 1000,
    },
  },
]

export interface PlatformUser {
  id: string
  name: string
  email: string
  role: "SUPER_ADMIN" | "SOPORTE" | "AUDITOR"
  status: "activo" | "bloqueado"
}

// Mock Platform Users
export const mockPlatformUsers: PlatformUser[] = [
  { id: "1", name: "José Admin", email: "jose@gmail.com", role: "SUPER_ADMIN", status: "activo" },
  { id: "2", name: "Soporte Técnico", email: "support@agrotrack.com", role: "SOPORTE", status: "activo" },
]

// Mock Animals
export const mockAnimals: Animal[] = [
  {
    id: "1",
    arete: "VA-001",
    type: "vaca",
    breed: "Holstein",
    sex: "F",
    birthDate: "2020-03-15",
    age: "4 años",
    finca: "La Esperanza",
    lote: "Lote A",
    status: "activo",
    weight: 580,
    state: "produccion",
  },
  {
    id: "2",
    arete: "VA-002",
    type: "vaca",
    breed: "Jersey",
    sex: "F",
    birthDate: "2019-07-22",
    age: "5 años",
    finca: "La Esperanza",
    lote: "Lote A",
    status: "activo",
    weight: 420,
    state: "preñada",
  },
  {
    id: "3",
    arete: "TO-001",
    type: "toro",
    breed: "Brahman",
    sex: "M",
    birthDate: "2018-11-10",
    age: "6 años",
    finca: "La Esperanza",
    lote: "Lote B",
    status: "activo",
    weight: 850,
    state: "produccion",
  },
  {
    id: "4",
    arete: "TE-001",
    type: "ternero",
    breed: "Holstein",
    sex: "M",
    birthDate: "2024-02-14",
    age: "9 meses",
    finca: "La Esperanza",
    lote: "Lote C",
    status: "activo",
    weight: 180,
  },
  {
    id: "5",
    arete: "VA-003",
    type: "vaca",
    breed: "Brown Swiss",
    sex: "F",
    birthDate: "2021-05-08",
    age: "3 años",
    finca: "La Esperanza",
    lote: "Lote A",
    status: "activo",
    weight: 540,
    state: "enfermo",
  },
  {
    id: "6",
    arete: "NO-001",
    type: "novillo",
    breed: "Angus",
    sex: "M",
    birthDate: "2023-01-20",
    age: "1 año",
    finca: "San José",
    lote: "Lote D",
    status: "activo",
    weight: 320,
  },
  {
    id: "7",
    arete: "VA-004",
    type: "vaca",
    breed: "Holstein",
    sex: "F",
    birthDate: "2019-09-12",
    age: "5 años",
    finca: "San José",
    lote: "Lote D",
    status: "activo",
    weight: 600,
    state: "produccion",
  },
  {
    id: "8",
    arete: "TE-002",
    type: "ternero",
    breed: "Jersey",
    sex: "F",
    birthDate: "2024-06-30",
    age: "5 meses",
    finca: "San José",
    lote: "Lote E",
    status: "activo",
    weight: 120,
  },
]

// Mock Fincas
export const mockFincas: Finca[] = [
  {
    id: "1",
    name: "La Esperanza",
    description: "Finca principal de producción lechera",
    area: "50 hectáreas",
    lotes: [
      { id: "L1", name: "Lote A", type: "Pastoreo rotativo", status: "en-pastoreo", area: "10 ha", animalCount: 25 },
      { id: "L2", name: "Lote B", type: "Corrales", status: "en-descanso", area: "5 ha", animalCount: 8 },
      { id: "L3", name: "Lote C", type: "Terneros", status: "en-pastoreo", area: "8 ha", animalCount: 15 },
    ],
  },
  {
    id: "2",
    name: "San José",
    description: "Finca secundaria para levante",
    area: "35 hectáreas",
    lotes: [
      { id: "L4", name: "Lote D", type: "Pastoreo extensivo", status: "en-pastoreo", area: "15 ha", animalCount: 18 },
      { id: "L5", name: "Lote E", type: "Descanso", status: "disponible", area: "12 ha", animalCount: 0 },
    ],
  },
]

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: "1",
    type: "vacuna",
    priority: "alta",
    title: "Vacuna antiaftosa vencida",
    description: "Lote A - 12 animales requieren vacunación",
    date: "2024-11-28",
    animalId: "1",
  },
  {
    id: "2",
    type: "tratamiento",
    priority: "alta",
    title: "Tratamiento pendiente",
    description: "VA-003 requiere segunda dosis antibiótico",
    date: "2024-11-28",
    animalId: "5",
  },
  {
    id: "3",
    type: "peso",
    priority: "media",
    title: "Bajo peso detectado",
    description: "TE-002 por debajo del peso ideal",
    date: "2024-11-27",
    animalId: "8",
  },
  {
    id: "4",
    type: "produccion",
    priority: "baja",
    title: "Producción reducida",
    description: "VA-002 con 15% menos de producción esta semana",
    date: "2024-11-26",
    animalId: "2",
  },
]

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Vacunar Lote A",
    description: "Aplicar vacuna antiaftosa a todos los animales",
    assignedTo: "Juan Pérez",
    dueDate: "2024-11-28",
    status: "pendiente",
    loteId: "L1",
  },
  {
    id: "2",
    title: "Pesar terneros",
    description: "Control mensual de peso",
    assignedTo: "María González",
    dueDate: "2024-11-29",
    status: "en-proceso",
    loteId: "L3",
  },
  {
    id: "3",
    title: "Revisar animal enfermo",
    description: "Seguimiento a VA-003",
    assignedTo: "Dr. Carlos Ruiz",
    dueDate: "2024-11-28",
    status: "pendiente",
    animalId: "5",
  },
  {
    id: "4",
    title: "Rotación de pastoreo",
    description: "Mover ganado del Lote A al Lote B",
    assignedTo: "Juan Pérez",
    dueDate: "2024-11-30",
    status: "pendiente",
  },
]

// Mock Users
export const mockUsers: User[] = [
  { id: "1", name: "Roberto Martínez", email: "roberto@finca.com", role: "ADMIN_TENANT", status: "activo" },
  { id: "2", name: "Juan Pérez", email: "juan@finca.com", role: "TRABAJADOR", status: "activo" },
  { id: "3", name: "María González", email: "maria@finca.com", role: "TRABAJADOR", status: "activo" },
  { id: "4", name: "Dr. Carlos Ruiz", email: "carlos@finca.com", role: "VETERINARIO", status: "activo" },
  { id: "5", name: "Ana López", email: "ana@finca.com", role: "TRABAJADOR", status: "bloqueado" },
]

// Production data for charts
export const mockProductionData = [
  { date: "2024-11-22", liters: 420 },
  { date: "2024-11-23", liters: 435 },
  { date: "2024-11-24", liters: 410 },
  { date: "2024-11-25", liters: 445 },
  { date: "2024-11-26", liters: 430 },
  { date: "2024-11-27", liters: 450 },
  { date: "2024-11-28", liters: 440 },
]

export const mockWeightData = [
  { month: "Jul", weight: 165 },
  { month: "Ago", weight: 182 },
  { month: "Sep", weight: 198 },
  { month: "Oct", weight: 215 },
  { month: "Nov", weight: 228 },
]

// Health records
export const mockHealthRecords: HealthRecord[] = [
  {
    id: "1",
    date: "2024-11-15",
    animalId: "1",
    type: "vacuna",
    description: "Vacuna antiaftosa",
    nextDate: "2025-05-15",
  },
  {
    id: "2",
    date: "2024-11-20",
    animalId: "5",
    type: "enfermedad",
    description: "Mastitis - Tratamiento con antibiótico",
  },
  { id: "3", date: "2024-11-10", animalId: "3", type: "tratamiento", description: "Desparasitación" },
]

// Feed records
export const mockFeedRecords: FeedRecord[] = [
  { id: "1", date: "2024-11-28", target: "L1", feedType: "Concentrado", quantity: 150, unit: "kg" },
  { id: "2", date: "2024-11-28", target: "L3", feedType: "Suplemento mineral", quantity: 20, unit: "kg" },
  { id: "3", date: "2024-11-27", target: "1", feedType: "Concentrado premium", quantity: 5, unit: "kg" },
]

export interface Vaccine {
  id: string
  date: string
  animalId?: string // For individual animals
  loteId?: string // For batch application
  vaccineType: string
  dose: string
  responsible: string
  nextDose?: string
  notes?: string
  appliedAnimals?: string[] // IDs of animals when applied to a batch
}

export interface DiseaseRecord {
  id: string
  date: string
  animalId: string
  symptoms: string
  diagnosis: string
  severity: "leve" | "moderada" | "grave"
  treatment: string
  medicine?: string
  duration?: string
  status: "pendiente" | "en-proceso" | "completado"
  notes?: string
  veterinarian: string
}

export const mockVaccines: Vaccine[] = [
  {
    id: "1",
    date: "2024-11-15",
    animalId: "1",
    vaccineType: "Antiaftosa",
    dose: "2ml",
    responsible: "Dr. Carlos Ruiz",
    nextDose: "2025-05-15",
    notes: "Aplicación sin complicaciones",
  },
  {
    id: "2",
    date: "2024-11-20",
    loteId: "L1",
    vaccineType: "Brucelosis",
    dose: "1ml",
    responsible: "Dr. Carlos Ruiz",
    nextDose: "2025-11-20",
    appliedAnimals: ["1", "2", "5"],
    notes: "Vacunación masiva Lote A",
  },
  {
    id: "3",
    date: "2024-11-10",
    animalId: "3",
    vaccineType: "Rabia",
    dose: "2ml",
    responsible: "Dr. Carlos Ruiz",
    nextDose: "2025-11-10",
  },
  {
    id: "4",
    date: "2024-11-25",
    loteId: "L3",
    vaccineType: "Antiaftosa",
    dose: "1ml",
    responsible: "Dr. Carlos Ruiz",
    nextDose: "2025-05-25",
    appliedAnimals: ["4", "8"],
    notes: "Terneros - primera dosis",
  },
]

export const mockDiseaseRecords: DiseaseRecord[] = [
  {
    id: "1",
    date: "2024-11-20",
    animalId: "5",
    symptoms: "Ubre inflamada, fiebre, disminución en producción de leche",
    diagnosis: "Mastitis clínica",
    severity: "moderada",
    treatment: "Antibiótico intramamario",
    medicine: "Cefalexina 200mg",
    duration: "5 días",
    status: "en-proceso",
    veterinarian: "Dr. Carlos Ruiz",
    notes: "Revisar en 3 días",
  },
  {
    id: "2",
    date: "2024-11-18",
    animalId: "8",
    symptoms: "Diarrea, deshidratación, pérdida de apetito",
    diagnosis: "Parasitosis intestinal",
    severity: "leve",
    treatment: "Desparasitación y rehidratación",
    medicine: "Ivermectina",
    duration: "1 día",
    status: "completado",
    veterinarian: "Dr. Carlos Ruiz",
  },
  {
    id: "3",
    date: "2024-11-22",
    animalId: "2",
    symptoms: "Cojera en pata trasera derecha",
    diagnosis: "Pododermatitis",
    severity: "leve",
    treatment: "Limpieza y aplicación de antibiótico tópico",
    medicine: "Oxitetraciclina spray",
    duration: "7 días",
    status: "en-proceso",
    veterinarian: "Dr. Carlos Ruiz",
    notes: "Mantener en corral seco",
  },
]

// Export new mock data;
