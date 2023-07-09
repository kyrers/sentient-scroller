import React from "react";
import { SVGAttributes } from "react";

export const ScrollIcon = (props?: SVGAttributes<SVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={20}
    height={20}
    {...props}
  >
    <path d="M12 2l-10 8h20l-10-8zm0 20l10-8H2l10 8z" />
  </svg>
);
