"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { mockClients } from "@/lib/mock/clients.mock";
import type { ClientStatus } from "@/lib/types";

const statusOptions: Array<{ label: string; value: ClientStatus | "all" }> = [
  { label: "Todos", value: "all" },
  { label: "Lead", value: "lead" },
  { label: "Ativo", value: "ativo" },
  { label: "Inativo", value: "inativo" },
  { label: "Churned", value: "churned" },
];

export function ClientList() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<ClientStatus | "all">("all");

  const filteredClients = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return mockClients.filter((client) => {
      const statusMatch = status === "all" || client.status === status;
      const searchMatch =
        normalized.length === 0 ||
        client.company.toLowerCase().includes(normalized) ||
        client.contacts.some((contact) => contact.name.toLowerCase().includes(normalized) || contact.email.toLowerCase().includes(normalized));
      return statusMatch && searchMatch;
    });
  }, [query, status]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <input
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
          placeholder="Buscar por empresa, contato ou email"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
          value={status}
          onChange={(event) => setStatus(event.target.value as ClientStatus | "all")}
        >
          {statusOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        {filteredClients.map((client) => (
          <article key={client.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{client.company}</p>
              <span className="rounded-full bg-background px-2 py-1 text-xs text-muted-foreground">{client.status}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Responsavel: {client.responsible} | Segmento: {client.segment}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Origem: {client.origin}</p>
            <Link className="mt-3 inline-block text-sm text-primary hover:underline" href={`/clients/${client.id}`}>
              Ver detalhes
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
