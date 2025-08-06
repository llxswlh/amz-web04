import { ReactNode } from "react";
import Header from "./shared/Header";
import Footer from "./shared/Footer";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export default function Layout({
  children,
  showHeader = true,
  showFooter = true,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {showHeader && <Header />}
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}
