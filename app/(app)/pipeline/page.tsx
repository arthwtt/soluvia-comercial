import { mockLeads } from "@/lib/mock/leads.mock";
import { KanbanBoard } from "@/components/pipeline/KanbanBoard";

export default function PipelinePage() {
  return (
    <section className="space-y-4">
      <h2 className="mb-4 text-xl font-semibold">Pipeline</h2>
      <KanbanBoard initialLeads={mockLeads} />
    </section>
  );
}
