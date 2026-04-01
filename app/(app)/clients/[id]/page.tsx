import { notFound } from "next/navigation";
import { ClientDetail } from "@/components/clients/ClientDetail";
import { mockClients } from "@/lib/mock/clients.mock";

export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const client = mockClients.find((item) => item.id === id);

  if (!client) {
    notFound();
  }

  return (
    <ClientDetail client={client} />
  );
}
