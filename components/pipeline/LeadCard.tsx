"use client";

import { formatDistanceToNowStrict, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Lead } from "@/lib/types";

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const daysSinceUpdate = Math.floor(
    (new Date().getTime() - new Date(lead.lastUpdated).getTime()) / (1000 * 60 * 60 * 24),
  );
  const stale = daysSinceUpdate >= 7;

  return (
    <article className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="font-medium">{lead.company}</p>
        <span className="text-xs text-primary">R$ {lead.value.toLocaleString("pt-BR")}</span>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{lead.responsible}</p>
      <p className="mt-2 text-xs text-muted-foreground">Proximo: {lead.nextStep}</p>
      <p className={`mt-2 text-xs ${stale ? "text-destructive" : "text-muted-foreground"}`}>
        Atualizado {formatDistanceToNowStrict(parseISO(lead.lastUpdated), { addSuffix: true, locale: ptBR })}
      </p>
    </article>
  );
}
