import type { PortableTextSolidComponents, PortableTextComponents } from '../types'

export function mergeComponents(
  parent: PortableTextSolidComponents,
  overrides: PortableTextComponents,
): PortableTextSolidComponents {
  const { block, list, listItem, marks, types, ...rest } = overrides
  // @todo figure out how to not `as ...` these
  return {
    ...parent,
    block: mergeDeeply(parent, overrides, 'block') as PortableTextSolidComponents['block'],
    list: mergeDeeply(parent, overrides, 'list') as PortableTextSolidComponents['list'],
    listItem: mergeDeeply(parent, overrides, 'listItem') as PortableTextSolidComponents['listItem'],
    marks: mergeDeeply(parent, overrides, 'marks') as PortableTextSolidComponents['marks'],
    types: mergeDeeply(parent, overrides, 'types') as PortableTextSolidComponents['types'],
    ...rest,
  }
}

function mergeDeeply(
  parent: PortableTextSolidComponents,
  overrides: PortableTextComponents,
  key: 'block' | 'list' | 'listItem' | 'marks' | 'types',
): PortableTextSolidComponents[typeof key] {
  const override = overrides[key]
  const parentVal = parent[key]

  if (typeof override === 'function') {
    return override
  }

  if (override && typeof parentVal === 'function') {
    return override
  }

  if (override) {
    return {
      ...parentVal,
      ...override,
    } as PortableTextSolidComponents[typeof key]
  }

  return parentVal
}
