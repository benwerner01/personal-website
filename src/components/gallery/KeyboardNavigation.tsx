"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

type KeyboardNavigationProps = {
  previousHref: string;
  nextHref: string;
};

// Renders nothing: the arrow keys move between the items of a collection
const KeyboardNavigation: React.FC<KeyboardNavigationProps> = ({
  previousHref,
  nextHref,
}) => {
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "ArrowLeft") {
        router.push(previousHref);
      } else if (key === "ArrowRight") {
        router.push(nextHref);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [router, previousHref, nextHref]);

  return null;
};

export default KeyboardNavigation;
