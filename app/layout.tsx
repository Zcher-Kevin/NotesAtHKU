import { RootProvider } from "fumadocs-ui/provider";
import "katex/dist/katex.css";
import { Old_Standard_TT as Font } from "next/font/google";
import type { ReactNode } from "react";
import "./global.css";

const font = Font({
  weight: ["400", "700"],
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
