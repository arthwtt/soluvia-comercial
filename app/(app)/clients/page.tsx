import { ClientList } from "@/components/clients/ClientList";
import { ClientForm } from "@/components/clients/ClientForm";

export default function ClientsPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">Clientes</h2>
        <ClientForm />
      </div>
      <ClientList />
    </section>
  );
}
