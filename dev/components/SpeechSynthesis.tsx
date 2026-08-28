import type { PortableTextMarkComponent } from '../../src'

export interface SpeechSynthesisMark {
  _type: 'speech'
  pitch?: number
}

export const hasSpeechApi = typeof window !== 'undefined' && 'speechSynthesis' in window

export const SpeechSynthesis: PortableTextMarkComponent<SpeechSynthesisMark> = props => {
  const handleSynthesis = () => {
    const msg = new SpeechSynthesisUtterance()
    msg.text = props.text
    msg.pitch = props.value?.pitch || 1
    window.speechSynthesis.speak(msg)
  }

  return (
    <button type="button" onClick={handleSynthesis}>
      {props.children}
    </button>
  )
}
