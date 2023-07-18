# Sentient Scroller

[![npm version][npm-image]][npm-url]
![npm bundle size][bundle-size-image]
![npm-typescript]
![npm][weekly-downloads]
[![License][github-license]][github-license-url]
<a href="https://codesandbox.io/s/sentient-scroller-y5pf8m" target="_blank">![Edit on Codesandbox](https://img.shields.io/badge/demo-Edit%20on%20Codesandbox-2385f7?style=for-the-badge&logo=codesandbox)</a>

A React library that provides a scroll management component for remembering and navigating back to previous scroll positions.

<b> Please note that the `SentientScroller` component currently works for scrolling events in the entire window, as it relies on the `window` object. 
Support for scrolling within specific elements (e.g. `divs`) will be introduced in future versions.</b>

### Installation

```sh
# npm
npm i sentient-scroller

# yarn
yarn add sentient-scroller

# pnpm
pnpm add sentient-scroller
```

### Usage

```js
import { SentientScroller } from "sentient-scroller";

export default function Home() {
  return (
    <main className={styles.main}>
      <SentientScroller timeThreshold={1000}>
        {...}
      </SentientScroller>
    </main>
  );
}

```

## Props

| Name              | Required | Description                                       |
| ----------------- | -------- | ------------------------------------------------- |
| timeThreshold     | Yes      | The threshold (in milliseconds) for considering a position as stable before storing it. A new position will only be stored if the user remains in the same position for longer than this threshold. |
| positionThreshold | No       | <b> Defaults to 0.</b> The threshold (in pixels) for considering a position worthy of storing. A new position will only be stored if the distance to the last stored position is longer than this threshold. |
| behavior          | No       | The behavior of the scroll button. <br/> <b>"sequential" (default):</b> Scrolls to the last stored position that's different from the current position. <br/> <b>"static":</b> Scrolls to the first stored position that's different from the current position. |



[bundle-size-image]: https://img.shields.io/bundlephobia/minzip/sentient-scroller?style=for-the-badge
[github-license]: https://img.shields.io/github/license/kyrers/sentient-scroller?style=for-the-badge
[github-license-url]: https://github.com/kyrers/sentient-scroller/blob/master/LICENSE
[npm-image]: https://img.shields.io/npm/v/sentient-scroller?style=for-the-badge
[npm-typescript]: https://img.shields.io/npm/types/sentient-scroller?style=for-the-badge
[npm-url]: https://www.npmjs.com/package/sentient-scroller
[weekly-downloads]: https://img.shields.io/npm/dw/sentient-scroller?style=for-the-badge

#### [kyrers](https://twitter.com/kyre_rs)
