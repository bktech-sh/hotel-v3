"use client";

import { useCallback, useEffect, useState, type RefObject } from "react";

export type PopoverPosition = { top: number; left: number };

const MARGIN = 8;

/**
 * Tracks fixed-position coordinates for a portal-rendered popover anchored to
 * a trigger element. getBoundingClientRect() is already viewport-relative,
 * matching position:fixed — do not add window.scrollX/scrollY here, or the
 * popover drifts on scroll.
 */
export function usePopoverPosition(
  triggerRef: RefObject<HTMLElement | null>,
  open: boolean,
  popoverWidth: number,
) {
  const [position, setPosition] = useState<PopoverPosition | null>(null);

  const recompute = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const left = Math.min(
      Math.max(rect.left, MARGIN),
      Math.max(viewportWidth - popoverWidth - MARGIN, MARGIN),
    );
    setPosition({ top: rect.bottom + MARGIN, left });
  }, [triggerRef, popoverWidth]);

  useEffect(() => {
    if (!open) return;
    recompute();
    window.addEventListener("scroll", recompute, true);
    window.addEventListener("resize", recompute);
    return () => {
      window.removeEventListener("scroll", recompute, true);
      window.removeEventListener("resize", recompute);
    };
  }, [open, recompute]);

  return position;
}

/**
 * Closes an open portal popover on outside pointerdown or Escape. Checks both
 * the trigger root and the portaled panel so clicks inside either are ignored.
 */
export function useOutsideClose(
  open: boolean,
  onClose: () => void,
  refs: RefObject<HTMLElement | null>[],
) {
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      const inside = refs.some((ref) => ref.current?.contains(target));
      if (!inside) onClose();
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, refs]);
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);
}
