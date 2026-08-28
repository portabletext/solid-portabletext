import type { PortableTextMarkComponent } from '../../src'

interface LinkMark {
  _type: 'link'
  href: string
}

const Link: PortableTextMarkComponent<LinkMark> = props => {
  const href = () => props.value?.href || ''
  return (
    <a href={href()} target={href().startsWith('http') ? '_blank' : undefined}>
      {props.children}
    </a>
  )
}

export default Link
