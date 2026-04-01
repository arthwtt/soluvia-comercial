interface ActivityFeedProps {
  items: string[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="mb-4 text-sm text-muted-foreground">Atividades recentes</p>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
