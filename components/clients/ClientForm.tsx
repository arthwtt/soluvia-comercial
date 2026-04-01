"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { Client, ClientStatus } from "@/lib/types";

const initialState = {
  company: "",
  segment: "",
  size: "pequena" as Client["size"],
  status: "lead" as ClientStatus,
  responsible: "",
  origin: "inbound" as Client["origin"],
  monthlyValue: "",
  tags: "",
  contactName: "",
  contactRole: "",
  contactEmail: "",
};

export function ClientForm() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState(initialState);

  const canSubmit = useMemo(() => {
    return Boolean(values.company && values.segment && values.responsible && values.contactName && values.contactEmail);
  }, [values]);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setOpen(false);
      setValues(initialState);
    }, 900);
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Novo cliente</Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Cadastrar cliente</h3>
              <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                Fechar
              </button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-3">
              <input
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Empresa"
                value={values.company}
                onChange={(event) => setValues((current) => ({ ...current, company: event.target.value }))}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Segmento"
                  value={values.segment}
                  onChange={(event) => setValues((current) => ({ ...current, segment: event.target.value }))}
                />
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Responsavel"
                  value={values.responsible}
                  onChange={(event) => setValues((current) => ({ ...current, responsible: event.target.value }))}
                />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.size}
                  onChange={(event) => setValues((current) => ({ ...current, size: event.target.value as Client["size"] }))}
                >
                  <option value="micro">micro</option>
                  <option value="pequena">pequena</option>
                  <option value="media">media</option>
                  <option value="grande">grande</option>
                </select>
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.status}
                  onChange={(event) => setValues((current) => ({ ...current, status: event.target.value as ClientStatus }))}
                >
                  <option value="lead">lead</option>
                  <option value="ativo">ativo</option>
                  <option value="inativo">inativo</option>
                  <option value="churned">churned</option>
                </select>
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.origin}
                  onChange={(event) => setValues((current) => ({ ...current, origin: event.target.value as Client["origin"] }))}
                >
                  <option value="inbound">inbound</option>
                  <option value="outbound">outbound</option>
                  <option value="indicacao">indicacao</option>
                  <option value="social_selling">social_selling</option>
                </select>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Valor mensal (opcional)"
                  value={values.monthlyValue}
                  onChange={(event) => setValues((current) => ({ ...current, monthlyValue: event.target.value }))}
                />
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Tags (separadas por virgula)"
                  value={values.tags}
                  onChange={(event) => setValues((current) => ({ ...current, tags: event.target.value }))}
                />
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Contato principal"
                  value={values.contactName}
                  onChange={(event) => setValues((current) => ({ ...current, contactName: event.target.value }))}
                />
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Cargo"
                  value={values.contactRole}
                  onChange={(event) => setValues((current) => ({ ...current, contactRole: event.target.value }))}
                />
                <input
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  placeholder="Email do contato"
                  value={values.contactEmail}
                  onChange={(event) => setValues((current) => ({ ...current, contactEmail: event.target.value }))}
                />
              </div>

              <div className="mt-2 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  Salvar
                </Button>
              </div>
              {saved ? <p className="text-sm text-green-400">Cliente mock cadastrado com sucesso.</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
