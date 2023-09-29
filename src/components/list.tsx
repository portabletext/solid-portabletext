import type { PortableTextListComponent, PortableTextListItemComponent } from '../types'

export const defaultLists: Record<'number' | 'bullet', PortableTextListComponent> = {
  number: props => <ol>{props.children}</ol>,
  bullet: props => <ul>{props.children}</ul>,
}

export const DefaultListItem: PortableTextListItemComponent = props => <li>{props.children}</li>
