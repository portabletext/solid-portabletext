import type { TypedObject } from '@portabletext/types'
import type { PortableTextMarkComponent } from '../types'

interface DefaultLink extends TypedObject {
  _type: 'link'
  href: string
}

const link: PortableTextMarkComponent<DefaultLink> = props => (
  <a href={props.value?.href}>{props.children}</a>
)

const underlineStyle = { textDecoration: 'underline' }

export const defaultMarks: Record<string, PortableTextMarkComponent | undefined> = {
  em: props => <em>{props.children}</em>,
  strong: props => <strong>{props.children}</strong>,
  code: props => <code>{props.children}</code>,
  underline: props => <span style={underlineStyle}>{props.children}</span>,
  'strike-through': props => <del>{props.children}</del>,
  link,
}
