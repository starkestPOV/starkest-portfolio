"use client";

import { gsap } from "gsap";
import { useLayoutEffect, type RefObject } from "react";

/** Scoped GSAP setup with automatic cleanup for future animated sections. */
export function useGsap(scope: RefObject<HTMLElement | null>, setup: () => void) {
  useLayoutEffect(() => {
    const context = gsap.context(setup, scope);
    return () => context.revert();
  }, [scope, setup]);
}
