import type { Component } from 'solid-js'

import { PortableText, PortableTextComponents } from '../src'
import AnnotatedMap from './components/AnnotatedMap'
import CharacterReference from './components/CharacterReference'
import Code from './components/Code'
import CurrencyAmount from './components/CurrencyAmount'
import Link from './components/Link'
import LinkableHeader from './components/LinkableHeader'
import SchnauzerList from './components/SchnauzerList'
import { hasSpeechApi, SpeechSynthesis } from './components/SpeechSynthesis'
import TermDefinition from './components/TermDefinition'
import { blocks } from './fixture'

const components: PortableTextComponents = {
  // Components for totally custom types outside the scope of Portable Text
  types: {
    code: Code,
    currencyAmount: CurrencyAmount,
    annotatedMap: AnnotatedMap,
  },

  // Overrides for specific block styles - the `h2` style, and a custom
  // `medium` style that also works on list items (https://github.com/portabletext/solid-portabletext/issues/56)
  block: {
    h2: LinkableHeader,
    medium: props => <p class="medium">{props.children}</p>,
  },

  // Implements a custom component to handle the `schnauzer` list item type
  list: {
    schnauzer: SchnauzerList,
  },

  // Custom components for marks - note that `link` overrides the default component,
  // while the others define components for totally custom types.
  marks: {
    link: Link,
    characterReference: CharacterReference,
    speech: hasSpeechApi ? SpeechSynthesis : undefined,
    definition: TermDefinition,
  },
}

const App: Component = () => {
  return <PortableText value={blocks} components={components} />
}

export default App
