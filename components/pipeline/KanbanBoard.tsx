"use client";

import { useMemo, useState } from "react";
import { closestCorners, DndContext, type DragEndEvent, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import type { Lead, LeadStage } from "@/lib/types";
import { KanbanColumn } from "@/components/pipeline/KanbanColumn";
import { LeadCard } from "@/components/pipeline/LeadCard";

const STAGES: Array<{ id: LeadStage; title: string }> = [
  { id: "prospeccao", title: "Prospeccao" },
  { id: "primeiro_contato", title: "Primeiro Contato" },
  { id: "reuniao_agendada", title: "Reuniao Agendada" },
  { id: "proposta_enviada", title: "Proposta Enviada" },
  { id: "negociacao", title: "Negociacao" },
  { id: "fechado_ganho", title: "Ganho" },
  { id: "fechado_perdido", title: "Perdido" },
];

function getStageFromId(id: string, leads: Lead[]): LeadStage | null {
  const asStage = STAGES.find((stage) => stage.id === id);
  if (asStage) return asStage.id;
  return leads.find((lead) => lead.id === id)?.stage ?? null;
}

export function KanbanBoard({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [activeLeadId, setActiveLeadId] = useState<string | null>(null);

  const leadsByStage = useMemo(() => {
    return STAGES.reduce<Record<LeadStage, Lead[]>>((acc, stage) => {
      acc[stage.id] = leads.filter((lead) => lead.stage === stage.id);
      return acc;
    }, {} as Record<LeadStage, Lead[]>);
  }, [leads]);

  function handleDragStart(event: DragStartEvent) {
    setActiveLeadId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveLeadId(null);
    const activeId = String(event.active.id);
    const overId = event.over ? String(event.over.id) : null;
    if (!overId) return;

    const targetStage = getStageFromId(overId, leads);
    if (!targetStage) return;

    setLeads((current) =>
      current.map((lead) =>
        lead.id === activeId
          ? {
              ...lead,
              stage: targetStage,
              lastUpdated: new Date().toISOString().slice(0, 10),
            }
          : lead,
      ),
    );
  }

  const activeLead = activeLeadId ? leads.find((lead) => lead.id === activeLeadId) : null;

  return (
    <DndContext collisionDetection={closestCorners} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => (
          <KanbanColumn key={stage.id} id={stage.id} title={stage.title} leads={leadsByStage[stage.id]} />
        ))}
      </div>
      <DragOverlay>{activeLead ? <LeadCard lead={activeLead} /> : null}</DragOverlay>
    </DndContext>
  );
}
