export function OpenLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main className="grow flex flex-col">{children}</main>
    </div>
  );
}
