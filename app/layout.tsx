import { RootProvider } from "fumadocs-ui/provider";
import "katex/dist/katex.css";
import { Ubuntu } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const ubuntu = Ubuntu({
  weight: ["400", "500", "300", "700"],
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={ubuntu.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
