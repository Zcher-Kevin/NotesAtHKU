"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Fragment, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import { cn } from "./utils/cn";
import { useI18n } from "./contexts/i18n";
import { useTreeContext, useTreePath } from "./contexts/tree";
import { useSidebar } from "./contexts/sidebar";
import { usePathname } from "next/navigation";
import { useNav } from "./components/layout/nav";
import { getBreadcrumbItemsFromPath } from "fumadocs-core/breadcrumb";
import { usePageStyles } from "./contexts/layout";

export function Footer({ items }) {
  const { root } = useTreeContext();
  const { text } = useI18n();
  const pathname = usePathname();
  const { previous, next } = useMemo(() => {
    if (items) return items;
    const cached = listCache.get(root);
    const list = cached ?? scanNavigationList(root.children);
    listCache.set(root, list);
    const idx = list.findIndex((item) => item.url === pathname);
    if (idx === -1) return {};
    return {
      previous: list[idx - 1],
      next: list[idx + 1],
    };
  }, [items, pathname, root]);
  return _jsxs("div", {
    className: "grid grid-cols-2 gap-4 pb-6",
    children: [
      previous
        ? _jsxs(Link, {
            href: previous.url,
            className: cn(itemVariants()),
            children: [
              _jsxs("div", {
                className: cn(itemLabel()),
                children: [
                  _jsx(ChevronLeft, {
                    className: "-ms-1 size-4 shrink-0 rtl:rotate-180",
                  }),
                  _jsx("p", { children: text.previousPage }),
                ],
              }),
              _jsx("p", { className: "font-medium", children: previous.name }),
            ],
          })
        : null,
      next
        ? _jsxs(Link, {
            href: next.url,
            className: cn(itemVariants({ className: "col-start-2 text-end" })),
            children: [
              _jsxs("div", {
                className: cn(itemLabel({ className: "flex-row-reverse" })),
                children: [
                  _jsx(ChevronRight, {
                    className: "-me-1 size-4 shrink-0 rtl:rotate-180",
                  }),
                  _jsx("p", { children: text.nextPage }),
                ],
              }),
              _jsx("p", { className: "font-medium", children: next.name }),
            ],
          })
        : null,
    ],
  });
}
