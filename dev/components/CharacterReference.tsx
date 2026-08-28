import { Show } from 'solid-js'

import type { PortableTextMarkComponent } from '../../src'

interface CharacterDefinition {
  name: string
  description: string
}

interface CharacterReferenceMark {
  _type: 'characterReference'
  characterId: string
}

// Obviously you'd want to do this async against some API in a real world scenario
const characters: Record<string, CharacterDefinition> = {
  nedStark: {
    name: 'Eddard Stark',
    description:
      'The head of House Stark, the Lord of Winterfell, Lord Paramount and Warden of the North.',
  },
}

const CharacterReference: PortableTextMarkComponent<CharacterReferenceMark> = props => {
  const data = () => characters[props.value?.characterId || '']
  return (
    <Show when={data()} fallback={props.children} keyed>
      {character => (
        <a
          href={`#/pretend-this-works/${props.value?.characterId}`}
          title={`${character.name}: ${character.description}`}
          style={{ 'white-space': 'nowrap' }}
          onClick={event => event.preventDefault()}
        >
          {props.children}
        </a>
      )}
    </Show>
  )
}

export default CharacterReference
