import React, { PropsWithChildren, useEffect, useState } from "react";
import { StyledButton } from "./styles";

type SentientScrollerProps = PropsWithChildren & {
  threshold: number;
};

export default function SentientScroller({
  children,
  threshold,
}: SentientScrollerProps) {
  const [storedPositions, setStoredPositions] = useState<number[]>([]);

  let timeout: number;

  const handleScroll = () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      const currentPosition = window.scrollY;
      setStoredPositions((storedPositions) => [
        ...storedPositions,
        currentPosition,
      ]);
    }, threshold);
  };

  const scrollToStoredPosition = () => {
    const currentPosition = window.scrollY;

    window.scrollTo({
      top: storedPositions.findLast((p) => p !== currentPosition),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {children}
      {storedPositions.length > 0 && (
        <StyledButton onClick={scrollToStoredPosition}>
          Scroll to where you were
        </StyledButton>
      )}
    </>
  );
}
