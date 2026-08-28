---
'@portabletext/solid': patch
---

Fix custom block styles on list items crashing with a stack overflow. List items with a style other than `normal` now render through the matching `components.block` style component, like `@portabletext/react`.
