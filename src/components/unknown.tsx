import { Show } from 'solid-js'
import type { PortableTextSolidComponents } from '../types'
import { unknownTypeWarning } from '../warnings'

const hidden = { display: 'none' }

export const DefaultUnknownType: PortableTextSolidComponents['unknownType'] = props => {
  const warning = () => unknownTypeWarning(props.value._type)
  return (
    <Show when={props.isInline} fallback={<div style={hidden}>{warning()}</div>}>
      <span style={hidden}>{warning()}</span>
    </Show>
  )
}

export const DefaultUnknownMark: PortableTextSolidComponents['unknownMark'] = props => {
  return <span class={`unknown__pt__mark__${props.markType}`}>{props.children}</span>
}

export const DefaultUnknownBlockStyle: PortableTextSolidComponents['unknownBlockStyle'] = props => {
  return <p>{props.children}</p>
}

export const DefaultUnknownList: PortableTextSolidComponents['unknownList'] = props => {
  return <ul>{props.children}</ul>
}

export const DefaultUnknownListItem: PortableTextSolidComponents['unknownListItem'] = props => {
  return <li>{props.children}</li>
}
