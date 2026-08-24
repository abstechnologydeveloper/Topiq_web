"use client";

import type { ReactNode } from "react";
import type { NavItem } from "../navConfig";

export default function Tabbar({
  items,
  renderItem,
}: {
  items: NavItem[];
  renderItem: (item: NavItem, surface: "tab", index: number) => ReactNode;
}) {
  return (
    <nav className="sticky bottom-0 z-20 flex border-t border-ash-line bg-paper px-1.5 pt-2 pb-[calc(8px+env(safe-area-inset-bottom))] nav:hidden">
      <div className="contents">{items.map((i, idx) => renderItem(i, "tab", idx))}</div>
    </nav>
  );
}