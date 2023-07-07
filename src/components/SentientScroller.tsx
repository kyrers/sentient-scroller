import React, { PropsWithChildren, useEffect, useState } from "react";
import { StyledButton } from "./styles";

type SentientScrollerProps = PropsWithChildren & {
  interval: number;
};

export default function SentientScroller({
  children,
  interval,
}: SentientScrollerProps) {
  const [storedPosition, setStoredPosition] = useState<number | undefined>(
    undefined
  );

  let timeout: number;

  const handleScroll = () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      const currentPosition = window.scrollY;
      setStoredPosition(currentPosition);
    }, interval);
  };

  const scrollToStoredPosition = () => {
    window.scrollTo({
      top: storedPosition,
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
      {storedPosition && (
        <StyledButton onClick={scrollToStoredPosition}>
          Scroll to Stored Position
        </StyledButton>
      )}
    </>
  );
}
