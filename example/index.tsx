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
    <div style={{ display: "flex" }}>
      {/* Sequential Behavior example usage */}
      <div style={{ height: 100, overflow: "auto" }}>
        <SentientScroller timeThreshold={2000}>
          <div style={{ height: 1000 }}>Your Scrollable Content</div>
        </SentientScroller>
      </div>

      {/* Static Behavior example usage */}
      <div style={{ height: 100, overflow: "auto" }}>
        <SentientScroller timeThreshold={2000} behavior="static">
          <div style={{ height: 1000 }}>Your Scrollable Content</div>
        </SentientScroller>
      </div>
    </div>
  </React.StrictMode>
);
