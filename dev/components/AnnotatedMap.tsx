import { For } from 'solid-js'

import type { PortableTextTypeComponent } from '../../src'

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

const AnnotatedMap: PortableTextTypeComponent<AnnotatedMapBlock> = props => {
  return (
    <figure class="annotated-map">
      <figcaption>
        Annotated map centered at {props.value.center?.lat.toFixed(4)},{' '}
        {props.value.center?.lng.toFixed(4)} — rendered from structured JSON
      </figcaption>
      <ul>
        <For each={props.value.markers}>
          {marker => (
            <li>
              {marker.title}{' '}
              <small>
                ({marker.position.lat.toFixed(4)}, {marker.position.lng.toFixed(4)})
              </small>
            </li>
          )}
        </For>
      </ul>
    </figure>
  )
}

export default AnnotatedMap
