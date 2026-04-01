import { ClientList } from "@/components/clients/ClientList";

export default function ClientsPage() {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold">Clientes</h2>
      <ClientList />
    </section>
  );
}
