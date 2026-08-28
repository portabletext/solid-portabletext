import type { PortableTextTypeComponent } from '../../src'

export interface CodeBlock {
  _type: 'code'
  code: string
  language?: string
}

const Code: PortableTextTypeComponent<CodeBlock> = props => {
  return (
    <pre class={`language-${props.value.language || 'js'}`}>
      <code>{props.value.code}</code>
    </pre>
  )
}

export default Code
