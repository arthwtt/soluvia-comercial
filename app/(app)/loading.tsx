export default function AppLoading() {
  return (
    <section className="space-y-4">
      <div className="h-6 w-48 animate-pulse rounded bg-card" />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="h-24 animate-pulse rounded-lg bg-card" />
        <div className="h-24 animate-pulse rounded-lg bg-card" />
        <div className="h-24 animate-pulse rounded-lg bg-card" />
      </div>
      <div className="h-72 animate-pulse rounded-lg bg-card" />
    </section>
  );
}
