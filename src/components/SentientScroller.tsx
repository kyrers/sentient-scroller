import React, { useEffect, useState } from "react";
import { StyledButton } from "./styles";

type SentientScrollerProps = {
  children: any;
};

export default function SentientScroller({ children }: SentientScrollerProps) {
  const [scrollPosition, setScrollPosition] = useState<number | undefined>(
    undefined
  );
  const [storedPosition, setStoredPosition] = useState<number | undefined>(
    undefined
  );
  const [scrollDirection, setScrollDirection] = useState<string | undefined>(
    undefined
  );
  const [lastScrollTime, setLastScrollTime] = useState(0);

  const handleScroll = () => {
    const currentPosition = window.scrollY;

    if (currentPosition === storedPosition) {
      // User has scrolled back to the stored position
      setScrollDirection(undefined);
    } else if (currentPosition > (scrollPosition ?? 0)) {
      // User is scrolling downwards
      setScrollDirection("down");
    } else {
      // User is scrolling upwards
      setScrollDirection("up");
    }

    const now = Date.now();

    if (
      scrollDirection !== null &&
      currentPosition !== storedPosition &&
      now - lastScrollTime >= 2000
    ) {
      setStoredPosition(scrollPosition);
    }

    setScrollPosition(currentPosition);
    setLastScrollTime(now);
  };

  const scrollToStoredPosition = () => {
    console.log(storedPosition);
    if (storedPosition !== null) {
      window.scrollTo({
        top: storedPosition,
        behavior: "smooth",
      });
    }
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
      <StyledButton onClick={scrollToStoredPosition}>
        Scroll to Stored Position
      </StyledButton>
    </>
  );
}
