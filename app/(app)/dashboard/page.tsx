import { mockKPIs } from "@/lib/mock/kpis.mock";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { KPICard } from "@/components/dashboard/KPICard";
import { LeadsLineChart } from "@/components/dashboard/LeadsLineChart";
import { mockLeadsByStage, mockLeadsEvolution, mockRecentActivities } from "@/lib/mock/kpis.mock";

const cards = [
  { label: "Total de leads ativos", value: mockKPIs.totalLeads },
  { label: "Taxa de conversao", value: `${mockKPIs.conversionRate}%` },
  { label: "Reunioes no mes", value: mockKPIs.meetingsThisMonth },
  { label: "Reunioes agendadas", value: mockKPIs.scheduledMeetings },
  { label: "Receita projetada", value: `R$ ${mockKPIs.projectedRevenue.toLocaleString("pt-BR")}` },
  { label: "Novos leads (7 dias)", value: mockKPIs.newLeadsLast7Days },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <h2 className="mb-4 text-xl font-semibold">Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <KPICard key={card.label} label={card.label} value={String(card.value)} />
        ))}
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <FunnelChart data={mockLeadsByStage} />
        <LeadsLineChart data={mockLeadsEvolution} />
      </div>
      <ActivityFeed items={mockRecentActivities} />
    </section>
  );
}
