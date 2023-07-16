import React, { useEffect, useState } from "react";
import { StyledButton } from "./styles";
import { ScrollIcon } from "./Icons/ScrollIcon";
import { SentientScrollerProps } from "../types";

export default function SentientScroller({
  children,
  timeThreshold,
  positionThreshold = 0,
  behavior = "sequential",
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

    /**
     * Note that reverse().find() is used instead of findLast() because the latter was introduced in ES2023.
     * At the time of writing, it is still very recent and available only in the most recent versions of Nodejs.
     * For instance, jest uses jsdom which does not yet support it.
     * Since this array contains at most 2 values, performance does not suffer, so for the sake of compatibility, findLast() was not used.
     */
    const to =
      behavior === "sequential"
        ? storedPositions.reverse().find((p) => p !== currentPosition)
        : storedPositions.find((p) => p !== currentPosition);

    window.scrollTo({
      top: to,
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
          data-testid="scroll-button"
          onClick={scrollToStoredPosition}
          title="Move to where you were"
        >
          <ScrollIcon fill="white" />
        </StyledButton>
      )}
    </>
  );
}
