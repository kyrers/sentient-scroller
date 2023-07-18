/**
 * This example only aim is to display how to use the SentientScroller component in your code.
 * It is not runnable by default, but you can easily run it yourself if you choose to.
 * To see a working and editable example visit:
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { SentientScroller } from "../src";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <SentientScroller timeThreshold={2000}>
      Your Scrollable Content
    </SentientScroller>
  </React.StrictMode>
);
