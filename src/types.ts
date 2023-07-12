import { PropsWithChildren } from "react";

export type SentientScrollerProps = PropsWithChildren & {
  /**
   * The threshold (in milliseconds) for considering a position as stable before storing it.
   * A new position will only be stored if the user remains in the same position for longer than this threshold.
   */
  timeThreshold: number;

  /**
   * The threshold (in pixels) for considering a position worthy of storing.
   * A new position will only be stored if the distance to the last stored position is longer than this threshold.
   * Defaults to 0.
   */
  positionThreshold?: number;

  /**
   * The behavior of the scroll button.
   * - "sequential" (default): Scrolls to the last stored position that's different from the current position.
   * - "static": Scrolls to the first stored position that's different from the current position.
   */
  behavior?: "sequential" | "static";
};
