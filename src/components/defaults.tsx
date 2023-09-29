import type { PortableTextBlockStyle } from '@portabletext/types'
import type { PortableTextBlockComponent, PortableTextSolidComponents } from '../types'
import { defaultMarks } from './marks'
import { defaultLists, DefaultListItem } from './list'
import {
  DefaultUnknownType,
  DefaultUnknownMark,
  DefaultUnknownList,
  DefaultUnknownListItem,
  DefaultUnknownBlockStyle,
} from './unknown'

export const DefaultHardBreak = () => <br />

export const defaultBlockStyles: Record<
  PortableTextBlockStyle,
  PortableTextBlockComponent | undefined
> = {
  normal: props => <p>{props.children}</p>,
  blockquote: props => <blockquote>{props.children}</blockquote>,
  h1: props => <h1>{props.children}</h1>,
  h2: props => <h2>{props.children}</h2>,
  h3: props => <h3>{props.children}</h3>,
  h4: props => <h4>{props.children}</h4>,
  h5: props => <h5>{props.children}</h5>,
  h6: props => <h6>{props.children}</h6>,
}

export const defaultComponents: PortableTextSolidComponents = {
  types: {},

  block: defaultBlockStyles,
  marks: defaultMarks,
  list: defaultLists,
  listItem: DefaultListItem,
  hardBreak: DefaultHardBreak,

  unknownType: DefaultUnknownType,
  unknownMark: DefaultUnknownMark,
  unknownList: DefaultUnknownList,
  unknownListItem: DefaultUnknownListItem,
  unknownBlockStyle: DefaultUnknownBlockStyle,
}
