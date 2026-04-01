"use client";

import { useMemo, useState } from "react";
import { mockSocialActions } from "@/lib/mock/social.mock";
import type { SocialAction } from "@/lib/types";

const statusOptions: Array<SocialAction["status"] | "all"> = [
  "all",
  "pendente",
  "respondido",
  "convertido",
  "sem_resposta",
];

export function ActionFeed() {
  const [status, setStatus] = useState<SocialAction["status"] | "all">("all");
  const [query, setQuery] = useState("");

  const actions = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return mockSocialActions.filter((action) => {
      const statusMatch = status === "all" || action.status === status;
      const queryMatch =
        normalized.length === 0 ||
        action.targetName.toLowerCase().includes(normalized) ||
        (action.targetCompany ?? "").toLowerCase().includes(normalized);
      return statusMatch && queryMatch;
    });
  }, [status, query]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
          placeholder="Buscar por nome ou empresa"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
          value={status}
          onChange={(event) => setStatus(event.target.value as SocialAction["status"] | "all")}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <article key={action.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">
                {action.type} - {action.targetName}
              </p>
              <span className="rounded-full bg-background px-2 py-1 text-xs text-muted-foreground">{action.status}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {action.platform} | {action.targetCompany ?? "Sem empresa"} | {action.date}
            </p>
            {action.notes ? <p className="mt-2 text-sm text-muted-foreground">{action.notes}</p> : null}
          </article>
        ))}
      </div>
    </section>
  );
}
