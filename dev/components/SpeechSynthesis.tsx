export interface SpeechSynthesisMark {
  _type: 'speech'
  pitch?: number
}

export const hasSpeechApi = typeof window !== 'undefined' && 'speechSynthesis' in window

export function SpeechSynthesis() {
  return <></>
}
