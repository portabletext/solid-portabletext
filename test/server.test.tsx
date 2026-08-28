import { describe, expect, test } from 'vitest'
import { renderToString } from 'solid-js/web'
import { PortableText } from '../src'
import type { PortableTextProps } from '../src'
import {
  basicParagraph,
  customStyledListItem,
  customStyledListItemOutput,
  normalListItems,
  styledListItems,
  styledListItemsOutput,
} from './fixtures'

function renderToHtml(props: PortableTextProps): string {
  return renderToString(() => <PortableText {...props} />)
}

describe('server-side rendering', () => {
  test('renders a basic paragraph', () => {
    expect(renderToHtml({ value: basicParagraph })).toBe('<p>Just a paragraph</p>')
  })

  test('renders list items with the normal style', () => {
    expect(renderToHtml({ value: normalListItems })).toBe(
      '<ul><li>Item one</li><li>Item two</li></ul>',
    )
  })

  test('renders styled list items', () => {
    expect(renderToHtml({ value: styledListItems })).toBe(styledListItemsOutput)
  })

  test('renders custom block styles on list items (#56)', () => {
    expect(
      renderToHtml({
        value: customStyledListItem,
        components: {
          block: {
            medium: props => <p class="font-medium text-lg">{props.children}</p>,
          },
        },
      }),
    ).toBe(customStyledListItemOutput)
  })
})
