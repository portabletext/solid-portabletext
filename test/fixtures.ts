import type { PortableTextBlock } from '@portabletext/types'

export const basicParagraph: PortableTextBlock = {
  _type: 'block',
  _key: 'basic',
  style: 'normal',
  markDefs: [],
  children: [{ _type: 'span', _key: 'a', text: 'Just a paragraph', marks: [] }],
}

export const normalListItems: PortableTextBlock[] = [
  {
    _type: 'block',
    _key: 'item-one',
    listItem: 'bullet',
    style: 'normal',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: 'a', text: 'Item one', marks: [] }],
  },
  {
    _type: 'block',
    _key: 'item-two',
    listItem: 'bullet',
    style: 'normal',
    level: 1,
    markDefs: [],
    children: [{ _type: 'span', _key: 'b', text: 'Item two', marks: [] }],
  },
]

// https://github.com/portabletext/react-portabletext/blob/main/test/fixtures/027-styled-list-items.ts
export const styledListItems: PortableTextBlock[] = [
  {
    style: 'normal',
    _type: 'block',
    _key: 'f94596b05b41',
    markDefs: [],
    children: [{ _type: 'span', text: 'Test some of these lists!', marks: [] }],
  },
  {
    listItem: 'bullet',
    style: 'normal',
    level: 1,
    _type: 'block',
    _key: '937effb1cd06',
    markDefs: [],
    children: [{ _type: 'span', text: 'Bullet 1', marks: [] }],
  },
  {
    listItem: 'bullet',
    style: 'h1',
    level: 1,
    _type: 'block',
    _key: 'bd2d22278b88',
    markDefs: [],
    children: [{ _type: 'span', text: 'Bullet 2', marks: [] }],
  },
  {
    listItem: 'bullet',
    style: 'normal',
    level: 1,
    _type: 'block',
    _key: 'a97d32e9f747',
    markDefs: [],
    children: [{ _type: 'span', text: 'Bullet 3', marks: [] }],
  },
]

export const styledListItemsOutput = [
  '<p>Test some of these lists!</p>',
  '<ul>',
  '<li>Bullet 1</li>',
  '<li><h1>Bullet 2</h1></li>',
  '<li>Bullet 3</li>',
  '</ul>',
].join('')

// https://github.com/portabletext/solid-portabletext/issues/56
export const customStyledListItem: PortableTextBlock[] = [
  {
    listItem: 'number',
    markDefs: [],
    children: [
      {
        _key: '45ec4de97f48',
        _type: 'span',
        marks: [],
        text: 'Finally, enter your contact information and review your service appointment. You’re all set!',
      },
    ],
    level: 1,
    _type: 'block',
    style: 'medium',
    _key: '2d7d1c82304f',
  },
]

export const customStyledListItemOutput = [
  '<ol>',
  '<li><p class="font-medium text-lg">Finally, enter your contact information and review your service appointment. You’re all set!</p></li>',
  '</ol>',
].join('')
