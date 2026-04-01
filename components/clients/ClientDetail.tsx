import type { Client } from "@/lib/types";

export function ClientDetail({ client }: { client: Client }) {
  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <h3 className="text-lg font-semibold">{client.company}</h3>
        <p className="mt-2 text-sm text-muted-foreground">Segmento: {client.segment}</p>
        <p className="text-sm text-muted-foreground">Origem: {client.origin}</p>
        <p className="text-sm text-muted-foreground">Tags: {client.tags.join(", ")}</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="font-medium">Contatos</h4>
        <div className="mt-3 space-y-2">
          {client.contacts.map((contact) => (
            <article key={contact.id} className="rounded-md border border-border bg-background p-3">
              <p className="font-medium">{contact.name}</p>
              <p className="text-sm text-muted-foreground">{contact.role}</p>
              <p className="text-sm text-muted-foreground">{contact.email}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4">
        <h4 className="font-medium">Historico de interacoes</h4>
        <ul className="mt-3 space-y-2">
          {client.interactions.map((interaction) => (
            <li key={interaction.id} className="rounded-md border border-border bg-background p-3 text-sm text-muted-foreground">
              {interaction.date} - {interaction.description}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
