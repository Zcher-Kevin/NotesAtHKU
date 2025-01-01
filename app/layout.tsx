import { RootProvider } from "fumadocs-ui/provider";
import "katex/dist/katex.css";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const font = Geist({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
