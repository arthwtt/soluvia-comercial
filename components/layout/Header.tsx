export function Header() {
  const today = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date());

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-6">
      <div>
        <p className="text-sm text-muted-foreground">Operacao comercial</p>
        <h1 className="text-base font-semibold">Visao geral</h1>
      </div>
      <p className="text-sm text-muted-foreground">{today}</p>
    </header>
  );
}
