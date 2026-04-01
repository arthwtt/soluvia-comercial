export type LeadStage =
  | "prospeccao"
  | "primeiro_contato"
  | "reuniao_agendada"
  | "proposta_enviada"
  | "negociacao"
  | "fechado_ganho"
  | "fechado_perdido";

export interface KPIData {
  totalLeads: number;
  conversionRate: number;
  meetingsThisMonth: number;
  scheduledMeetings: number;
  projectedRevenue: number;
  newLeadsLast7Days: number;
}

export interface Lead {
  id: string;
  company: string;
  contactName: string;
  contactEmail?: string;
  stage: LeadStage;
  value: number;
  responsible: string;
  nextStep: string;
  lastUpdated: string;
  tags: string[];
}

export type ClientStatus = "lead" | "ativo" | "inativo" | "churned";

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  linkedin?: string;
  isPrimary: boolean;
}

export interface Interaction {
  id: string;
  type: "email" | "call" | "meeting" | "note";
  date: string;
  description: string;
}

export interface Note {
  id: string;
  content: string;
  createdAt: string;
}

export interface Client {
  id: string;
  company: string;
  cnpj?: string;
  segment: string;
  size: "micro" | "pequena" | "media" | "grande";
  status: ClientStatus;
  responsible: string;
  origin: "inbound" | "outbound" | "indicacao" | "social_selling";
  monthlyValue?: number;
  startDate?: string;
  tags: string[];
  contacts: Contact[];
  notes: Note[];
  interactions: Interaction[];
}

export interface Meeting {
  id: string;
  title: string;
  clientId: string;
  leadId?: string;
  date: string;
  time: string;
  format: "online" | "presencial";
  meetingLink?: string;
  internalParticipants: string[];
  externalParticipants: string[];
  status: "agendada" | "realizada" | "cancelada" | "no-show";
  agenda?: string;
  minutes?: string;
  nextSteps?: string;
  responsible: string;
}

export interface SocialAction {
  id: string;
  type:
    | "conexao"
    | "dm"
    | "comentario"
    | "post"
    | "engajamento"
    | "compartilhamento";
  platform: "linkedin" | "instagram" | "twitter" | "whatsapp" | "outro";
  targetName: string;
  targetCompany?: string;
  targetProfileUrl?: string;
  date: string;
  status: "pendente" | "respondido" | "convertido" | "sem_resposta";
  notes?: string;
  linkedLeadId?: string;
  responsible: string;
}
