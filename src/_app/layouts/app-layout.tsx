export function AppLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-screen">{children}</div>
  );
}
