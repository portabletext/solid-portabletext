export interface Geopoint {
  _type: 'geopoint'
  lat: number
  lng: number
}

export interface MapMarker {
  _type: 'mapMarker'
  _key: string
  position: Geopoint
  title: string
  description?: string
}

export interface AnnotatedMapBlock {
  _type: 'annotatedMap'
  center?: Geopoint
  markers?: MapMarker[]
}

export default function AnnotatedMap() {
  return <></>
}
