<p align="center">
  <a href="https://github.com/AnakinYuen/scroll-direction"><img src="./logo.svg" alt="Scroll Direction Logo" width="500"></a>
</p>

# scroll-direction

[![license](https://img.shields.io/npm/l/@anakinyuen/scroll-direction.svg)](https://github.com/AnakinYuen/scroll-direction/blob/master/LICENSE)
[![npm version](https://img.shields.io/npm/v/@anakinyuen/scroll-direction.svg)](https://www.npmjs.com/package/@anakinyuen/scroll-direction)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@anakinyuen/scroll-direction.svg)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

0 dependency JavaScript library for monitoring scroll direction in the element. (Inspired by [scrolldir](https://github.com/dollarshaveclub/scrolldir))

## Key Features

- **no dependency**
- **minimal size:** weighing `1.9KB` only (`scroll-direction.esm.js`)
- **noise cancellation:** only changing its direction attribute when scrolled a significant amount
- **support any DOM element:** any scrollable DOM element can be observed
- **support event system:** just provide a `Dispatchable` object, `ScrollDirection` will notify when the scroll direction changes

## Installation

### npm

```bash
$ npm install @anakinyuen/scroll-direction
```

### Direct include

Simply download and include with a `script` tag.

```html
<script src="dist/scroll-direction.umd.js"></script>
```

or

### Using `import` statement

You may also import `scroll-direction` directly to your source code

```js
import ScrollDirection from '@anakinyuen/scroll-direction';
```

## Usage

### Create `ScrollDirection` instance in ts

```js
const scrollDirection = new ScrollDirection();
scrollDirection.start(); // start listening to scroll event
```

## Options

### `attribute`

Type: `string`
Default: `"data-scroll-direction"`

Attribute name for storing the scroll direction.

### `direction`

Type: `"up" | "down"`
Default: `"down"`

Initial value for `data-scroll-direction`.

### `addAttributeTo`

Type: `HTMLElement`
Default: `document.documentElement`

The element that `data-scroll-direction` will be added to.

### `element`

Type: `HTMLElement`
Default: `document.documentElement`

The element that `ScrollDirection` should observe.

### `thresholdPixels`

Type: `number`
Default: `64`

The number of pixels to scroll before re-evaluating the direction

### `historyMaxAge`

Type: `number`
Default: `512`

The maximum duration for a record to determine the scroll direction.

### `historyLength`

Type: `number`
Default: `32`

The number of records to keep to determine the scroll direction.

### `eventTarget`

Type: `{ dispatchEvent: (event: Event) => boolean; }`

[Object that can receive events and may have listeners for them.](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)

## Compatibility

### For `scroll-direction.umd.js`

This file is compiled by [Babel](https://github.com/babel/babel) with the following [browserslist](https://github.com/browserslist/browserslist).

```
>0.2%
not dead
not op_mini all
```

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Opera |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| &check; | &check; | &check; | &check; | &check; | &check;

### For `scroll-direction.esm.js`

Requires [ES2015 classes](https://caniuse.com/es6-class) and [ES2015 module](https://caniuse.com/#feat=es6-module). IE11 and below not supported.

## Licensing

[MIT license](https://github.com/AnakinYuen/scroll-direction/blob/master/LICENSE)
