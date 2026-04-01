"use client";

import { useMemo, useState } from "react";
import { mockClients } from "@/lib/mock/clients.mock";
import { mockMeetings } from "@/lib/mock/meetings.mock";
import type { Meeting } from "@/lib/types";

const statusOptions: Array<Meeting["status"] | "all"> = ["all", "agendada", "realizada", "cancelada", "no-show"];

function resolveClientName(clientId: string) {
  return mockClients.find((client) => client.id === clientId)?.company ?? "Cliente nao encontrado";
}

export function MeetingList() {
  const [status, setStatus] = useState<Meeting["status"] | "all">("all");
  const [responsible, setResponsible] = useState("");

  const meetings = useMemo(() => {
    const normalizedResponsible = responsible.trim().toLowerCase();
    return mockMeetings.filter((meeting) => {
      const statusMatch = status === "all" || meeting.status === status;
      const responsibleMatch =
        normalizedResponsible.length === 0 || meeting.responsible.toLowerCase().includes(normalizedResponsible);
      return statusMatch && responsibleMatch;
    });
  }, [status, responsible]);

  return (
    <section className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <select
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
          value={status}
          onChange={(event) => setStatus(event.target.value as Meeting["status"] | "all")}
        >
          {statusOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <input
          className="h-10 rounded-lg border border-border bg-card px-3 text-sm outline-none ring-ring focus:ring-2"
          placeholder="Filtrar por responsavel"
          value={responsible}
          onChange={(event) => setResponsible(event.target.value)}
        />
      </div>

      <div className="space-y-3">
        {meetings.map((meeting) => (
          <article key={meeting.id} className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{meeting.title}</p>
              <span className="rounded-full bg-background px-2 py-1 text-xs text-muted-foreground">{meeting.status}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {meeting.date} as {meeting.time} | {meeting.format}
            </p>
            <p className="text-sm text-muted-foreground">Cliente: {resolveClientName(meeting.clientId)}</p>
            <p className="text-sm text-muted-foreground">Responsavel: {meeting.responsible}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
