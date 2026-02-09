import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { AuthCodeHandler } from "@/components/auth-code-handler";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthCodeHandler />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
