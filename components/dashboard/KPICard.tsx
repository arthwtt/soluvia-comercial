interface KPICardProps {
  label: string;
  value: string;
}

export function KPICard({ label, value }: KPICardProps) {
  return (
    <article className="rounded-lg border border-border bg-card p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </article>
  );
}
