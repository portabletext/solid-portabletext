import type { Component } from 'solid-js'
import { PortableText, PortableTextComponents } from '../src'
import { blocks } from './fixture'
import Code from './components/Code'
import CurrencyAmount from './components/CurrencyAmount'
import AnnotatedMap from './components/AnnotatedMap'
import LinkableHeader from './components/LinkableHeadert'
import SchnauzerList from './components/SchnauzerList'
import Link from './components/Link'
import CharacterReference from './components/CharacterReference'
import { hasSpeechApi, SpeechSynthesis } from './components/SpeechSynthesis'
import TermDefinition from './components/TermDefinition'

const components: PortableTextComponents = {
  // Components for totally custom types outside the scope of Portable Text
  types: {
    code: Code,
    currencyAmount: CurrencyAmount,
    annotatedMap: AnnotatedMap,
  },

  // Overrides for specific block styles - in this case just the `h2` style
  block: {
    h2: LinkableHeader,
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
