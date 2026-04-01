import type { KPIData } from "@/lib/types";

export const mockKPIs: KPIData = {
  totalLeads: 47,
  conversionRate: 18.2,
  meetingsThisMonth: 23,
  scheduledMeetings: 8,
  projectedRevenue: 124500,
  newLeadsLast7Days: 12,
};

export const mockLeadsByStage = [
  { stage: "Prospeccao", total: 12 },
  { stage: "Primeiro Contato", total: 9 },
  { stage: "Reuniao Agendada", total: 8 },
  { stage: "Proposta Enviada", total: 7 },
  { stage: "Negociacao", total: 6 },
  { stage: "Ganho", total: 3 },
  { stage: "Perdido", total: 2 },
];

export const mockLeadsEvolution = [
  { day: "01/03", total: 18 },
  { day: "05/03", total: 22 },
  { day: "10/03", total: 27 },
  { day: "15/03", total: 30 },
  { day: "20/03", total: 35 },
  { day: "25/03", total: 41 },
  { day: "30/03", total: 47 },
];

export const mockRecentActivities = [
  "Lead Tech Solutions movido para Reuniao Agendada.",
  "Reuniao de diagnostico registrada com Vitta Saude.",
  "Nova conexao no LinkedIn com contato da Retail Prime.",
  "Proposta enviada para cliente do segmento industria.",
  "Nota adicionada no cliente Tech Solutions.",
];
