import { toPlainText } from '../../src'
import type { PortableTextBlockComponent } from '../../src'

/**
 * This is obviously extremely simplistic, you'd want to use something "proper"
 */
function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

const LinkableHeader: PortableTextBlockComponent = props => {
  const slug = () => slugify(toPlainText(props.value))
  return (
    <h2 id={slug()}>
      {props.children}{' '}
      <a class="slug-anchor" href={`#${slug()}`}>
        #
      </a>
    </h2>
  )
}

export default LinkableHeader
