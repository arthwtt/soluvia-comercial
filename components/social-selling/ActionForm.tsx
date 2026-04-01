"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import type { SocialAction } from "@/lib/types";

const initialState = {
  type: "conexao" as SocialAction["type"],
  platform: "linkedin" as SocialAction["platform"],
  targetName: "",
  targetCompany: "",
  date: "",
  status: "pendente" as SocialAction["status"],
  notes: "",
  responsible: "",
};

export function ActionForm() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [values, setValues] = useState(initialState);

  const canSubmit = useMemo(() => {
    return Boolean(values.targetName && values.date && values.responsible);
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
      <Button onClick={() => setOpen(true)}>Nova acao</Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-xl rounded-lg border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Nova acao de social selling</h3>
              <button className="text-sm text-muted-foreground hover:text-foreground" onClick={() => setOpen(false)}>
                Fechar
              </button>
            </div>

            <form onSubmit={onSubmit} className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.type}
                  onChange={(event) => setValues((current) => ({ ...current, type: event.target.value as SocialAction["type"] }))}
                >
                  <option value="conexao">conexao</option>
                  <option value="dm">dm</option>
                  <option value="comentario">comentario</option>
                  <option value="post">post</option>
                  <option value="engajamento">engajamento</option>
                  <option value="compartilhamento">compartilhamento</option>
                </select>
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.platform}
                  onChange={(event) => setValues((current) => ({ ...current, platform: event.target.value as SocialAction["platform"] }))}
                >
                  <option value="linkedin">linkedin</option>
                  <option value="instagram">instagram</option>
                  <option value="twitter">twitter</option>
                  <option value="whatsapp">whatsapp</option>
                  <option value="outro">outro</option>
                </select>
              </div>
              <input
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Nome do alvo/perfil"
                value={values.targetName}
                onChange={(event) => setValues((current) => ({ ...current, targetName: event.target.value }))}
              />
              <input
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Empresa (opcional)"
                value={values.targetCompany}
                onChange={(event) => setValues((current) => ({ ...current, targetCompany: event.target.value }))}
              />
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="date"
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.date}
                  onChange={(event) => setValues((current) => ({ ...current, date: event.target.value }))}
                />
                <select
                  className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                  value={values.status}
                  onChange={(event) => setValues((current) => ({ ...current, status: event.target.value as SocialAction["status"] }))}
                >
                  <option value="pendente">pendente</option>
                  <option value="respondido">respondido</option>
                  <option value="convertido">convertido</option>
                  <option value="sem_resposta">sem_resposta</option>
                </select>
              </div>
              <input
                className="h-10 rounded-lg border border-border bg-background px-3 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Responsavel"
                value={values.responsible}
                onChange={(event) => setValues((current) => ({ ...current, responsible: event.target.value }))}
              />
              <textarea
                className="min-h-24 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-ring focus:ring-2"
                placeholder="Observacoes"
                value={values.notes}
                onChange={(event) => setValues((current) => ({ ...current, notes: event.target.value }))}
              />
              <div className="mt-2 flex items-center justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={!canSubmit}>
                  Salvar
                </Button>
              </div>
              {saved ? <p className="text-sm text-green-400">Acao mock salva com sucesso.</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
