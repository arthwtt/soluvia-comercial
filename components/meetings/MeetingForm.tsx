"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { mockClients } from "@/lib/mock/clients.mock";
import type { Meeting } from "@/lib/types";

const initialState = {
  title: "",
  clientId: mockClients[0]?.id ?? "",
  date: "",
  time: "",
  format: "online" as Meeting["format"],
  status: "agendada" as Meeting["status"],
  responsible: "",
};

export function MeetingForm() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(initialState);
  const [saved, setSaved] = useState(false);

  const canSubmit = useMemo(() => {
    return Boolean(values.title && values.clientId && values.date && values.time && values.responsible);
  }, [values]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSaved(true);
    setTimeout(() => {
      setOpen(false);
      setSaved(false);
      setValues(initialState);
    }, 900);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Nova reuniao</Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Nova reuniao</h3>
              <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                Fechar
              </button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-3">
              <input
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Titulo / pauta"
                value={values.title}
                onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
              />
              <select
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                value={values.clientId}
                onChange={(event) => setValues((current) => ({ ...current, clientId: event.target.value }))}
              >
                {mockClients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.company}
                  </option>
                ))}
              </select>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="date"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.date}
                  onChange={(event) => setValues((current) => ({ ...current, date: event.target.value }))}
                />
                <input
                  type="time"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.time}
                  onChange={(event) => setValues((current) => ({ ...current, time: event.target.value }))}
                />
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.format}
                  onChange={(event) => setValues((current) => ({ ...current, format: event.target.value as Meeting["format"] }))}
                >
                  <option value="online">online</option>
                  <option value="presencial">presencial</option>
                </select>
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.status}
                  onChange={(event) => setValues((current) => ({ ...current, status: event.target.value as Meeting["status"] }))}
                >
                  <option value="agendada">agendada</option>
                  <option value="realizada">realizada</option>
                  <option value="cancelada">cancelada</option>
                  <option value="no-show">no-show</option>
                </select>
              </div>
              <input
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Responsavel"
                value={values.responsible}
                onChange={(event) => setValues((current) => ({ ...current, responsible: event.target.value }))}
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  Salvar
                </Button>
              </div>
              {saved ? <p className="text-sm text-green-400">Reuniao mock salva com sucesso.</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
