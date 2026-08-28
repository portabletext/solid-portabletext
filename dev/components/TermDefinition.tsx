import type { PortableTextMarkComponent } from '../../src'

interface DefinitionMark {
  _type: 'definition'
  details: string
}

const TermDefinition: PortableTextMarkComponent<DefinitionMark> = props => {
  return (
    <span
      style={{ 'text-decoration': 'underline', 'text-decoration-style': 'dotted' }}
      title={props.value?.details}
    >
      {props.children}
    </span>
  )
}

export default TermDefinition
