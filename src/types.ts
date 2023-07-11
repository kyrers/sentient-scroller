import { PropsWithChildren } from "react";

export type SentientScrollerProps = PropsWithChildren & {
  timeThreshold: number;
  positionThreshold?: number;
  behavior?: "sequential" | "static";
};
