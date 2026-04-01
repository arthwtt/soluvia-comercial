"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Lead, LeadStage } from "@/lib/types";
import { SortableLeadCard } from "@/components/pipeline/SortableLeadCard";

interface KanbanColumnProps {
  id: LeadStage;
  title: string;
  leads: Lead[];
}

export function KanbanColumn({ id, title, leads }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const totalValue = leads.reduce((sum, lead) => sum + lead.value, 0);

  return (
    <section
      ref={setNodeRef}
      className={`w-72 shrink-0 rounded-lg border p-3 ${isOver ? "border-primary bg-background" : "border-border bg-background"}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted-foreground">{leads.length} leads</p>
        </div>
        <p className="text-xs text-primary">R$ {totalValue.toLocaleString("pt-BR")}</p>
      </div>
      <SortableContext items={leads.map((lead) => lead.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {leads.map((lead) => (
            <SortableLeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      </SortableContext>
    </section>
  );
}
