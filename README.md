# @portabletext/solid

[![npm version](https://img.shields.io/npm/v/@portabletext/solid.svg?style=flat-square)](https://www.npmjs.com/package/@portabletext/solid)[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@portabletext/solid?style=flat-square)](https://bundlephobia.com/result?p=@portabletext/solid)

Render [Portable Text](https://portabletext.org/) with Solid JS.

## Table of contents

- [Installation](#installation)
- [Basic usage](#basic-usage)

## Installation

```
npm install --save @portabletext/solid
```

## Basic usage

```tsx
import { PortableText, type PortableTextComponents } from '@portabletext/solid'
import type { PortableTextBlock } from '@portabletext/types'
import type { Component } from 'solid-js'

const blocks: PortableTextBlock[] = [
  /* array of portable text blocks */
]

const components: PortableTextComponents = {
  /* optional object of custom components to use */
}

const App: Component = () => {
  return <PortableText value={blocks} components={components} />
}
```

## Credits

This repository is based on [`solid-portabletext`](https://github.com/nonphoto/solid-portabletext/tree/main), shoutout to [@nonphoto](https://github.com/nonphoto) for the original work 💖

## License

MIT
