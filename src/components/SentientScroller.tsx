import React, { PropsWithChildren, useEffect, useState } from "react";
import { StyledButton } from "./styles";
import { ScrollIcon } from "./Icons/ScrollIcon";

type SentientScrollerProps = PropsWithChildren & {
  timeThreshold: number;
  positionThreshold?: number;
};

export default function SentientScroller({
  children,
  timeThreshold,
  positionThreshold = 0,
}: SentientScrollerProps) {
  const [storedPositions, setStoredPositions] = useState<number[]>([]);

  let timeout: number;

  const handleScroll = () => {
    window.clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      const currentPosition = window.scrollY;

      setStoredPositions((storedPositions) => {
        const [previousPosition] = storedPositions.slice(-1);

        /**
         * Checking if previousPosition is undefined causes errors when previousPosition is 0.
         * This is because 0 is a falsy value in javascript, meaning it would be considered undefined...
         */
        if (
          storedPositions.length < 2 ||
          Math.abs(currentPosition - previousPosition) > positionThreshold
        ) {
          return [previousPosition, currentPosition];
        } else {
          return storedPositions;
        }
      });
    }, timeThreshold);
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
        <StyledButton
          onClick={scrollToStoredPosition}
          title="Move to where you were"
        >
          <ScrollIcon fill="white" />
        </StyledButton>
      )}
    </>
  );
}
