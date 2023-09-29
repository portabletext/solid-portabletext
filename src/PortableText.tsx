import {
  createMemo,
  For,
  Switch,
  createEffect,
  Match,
  createContext,
  useContext,
  Show,
} from 'solid-js'
import {
  buildMarksTree,
  isPortableTextListItemBlock,
  isPortableTextToolkitList,
  isPortableTextToolkitSpan,
  isPortableTextToolkitTextNode,
  LIST_NEST_MODE_HTML,
  spanToPlainText,
  ToolkitNestedPortableTextSpan,
  ToolkitTextNode,
} from '@portabletext/toolkit'
import type {
  MissingComponentHandler,
  PortableTextProps,
  PortableTextSolidComponents,
  Serializable,
  SolidPortableTextList,
} from './types'
import { isPortableTextBlock, nestLists } from '@portabletext/toolkit'
import type {
  PortableTextBlock,
  PortableTextListItemBlock,
  PortableTextMarkDefinition,
  PortableTextSpan,
  TypedObject,
} from '@portabletext/types'
import { mergeComponents } from './components/merge'
import { defaultComponents } from './components/defaults'
import {
  printWarning,
  unknownBlockStyleWarning,
  unknownListItemStyleWarning,
  unknownListStyleWarning,
  unknownMarkWarning,
  unknownTypeWarning,
} from './warnings'
import { Dynamic } from 'solid-js/web'

function noop() {}

export const RenderContext = createContext<{
  handleMissingComponent: MissingComponentHandler
  components: PortableTextSolidComponents
}>({ handleMissingComponent: noop, components: defaultComponents })

export function PortableText<B extends TypedObject = PortableTextBlock>(
  props: PortableTextProps<B>,
) {
  const handleMissingComponent = () => (props.onMissingComponent ?? printWarning) || noop
  const blocks = () => (Array.isArray(props.value) ? props.value : [props.value])
  const nested = () => nestLists(blocks(), props.listNestingMode ?? LIST_NEST_MODE_HTML)

  const components = createMemo(() => {
    return props.components
      ? mergeComponents(defaultComponents, props.components)
      : defaultComponents
  })

  return (
    <RenderContext.Provider
      value={{
        get components() {
          return components()
        },
        get handleMissingComponent() {
          return handleMissingComponent()
        },
      }}
    >
      <For each={nested()}>
        {(node, index) => <Node node={node} index={index()} isInline={false} renderNode={Node} />}
      </For>
    </RenderContext.Provider>
  )
}

function Node<N extends TypedObject>(props: Serializable<N>) {
  const key = () => props.node._key || `node-${props.index}`

  return (
    <Switch
      fallback={
        <CustomBlock node={props.node} index={props.index} key={key()} isInline={props.isInline} />
      }
    >
      <Match when={isPortableTextToolkitList(props.node) ? props.node : false} keyed>
        {node => <List node={node} index={props.index} key={key()} />}
      </Match>
      <Match when={isPortableTextListItemBlock(props.node) ? props.node : false} keyed>
        {node => <ListItem node={node} index={props.index} key={key()} />}
      </Match>
      <Match when={isPortableTextToolkitSpan(props.node) ? props.node : false} keyed>
        {node => <Span node={node} index={props.index} key={key()} />}
      </Match>
      <Match when={isPortableTextBlock(props.node) ? props.node : false} keyed>
        {node => <Block node={node} index={props.index} key={key()} isInline={props.isInline} />}
      </Match>
      <Match when={isPortableTextToolkitTextNode(props.node) ? props.node : false} keyed>
        {node => <Text node={node} key={key()} />}
      </Match>
    </Switch>
  )
}

function Span(props: { node: ToolkitNestedPortableTextSpan; index: number; key: string }) {
  const renderContext = useContext(RenderContext)

  const component = () =>
    renderContext.components.marks[props.node.markType] ?? renderContext.components.unknownMark

  createEffect(() => {
    if (component() === renderContext.components.unknownMark) {
      renderContext.handleMissingComponent(unknownMarkWarning(props.node.markType), {
        nodeType: 'mark',
        type: props.node.markType,
      })
    }
  })

  return (
    <Dynamic
      component={component()}
      // key={props.key}
      text={spanToPlainText(props.node)}
      value={props.node.markDef}
      markType={props.node.markType}
      markKey={props.node.markKey}
      renderNode={Node}
    >
      <For each={props.node.children}>
        {(child, forIndex) => (
          <Node node={child} isInline={true} index={forIndex()} renderNode={Node} />
        )}
      </For>
    </Dynamic>
  )
}

function ListItem(props: {
  node: PortableTextListItemBlock<PortableTextMarkDefinition, PortableTextSpan>
  index: number
  key: string
}) {
  const renderContext = useContext(RenderContext)

  const component = () => {
    const listItem = renderContext.components.listItem
    return typeof listItem === 'function'
      ? listItem
      : listItem[props.node.listItem] || renderContext.components.unknownListItem
  }

  createEffect(() => {
    if (component() === renderContext.components.unknownListItem) {
      const style = props.node.listItem || 'bullet'
      renderContext.handleMissingComponent(unknownListItemStyleWarning(style), {
        nodeType: 'listItemStyle',
        type: style,
      })
    }
  })

  const marksTree = createMemo(() => buildMarksTree(props.node))

  return (
    <Dynamic
      component={component()}
      value={props.node}
      index={props.index}
      isInline={false}
      renderNode={Node}
    >
      <Show
        when={props.node.style != null && props.node.style !== 'normal'}
        fallback={
          <For each={marksTree()}>
            {(child, forIndex) => (
              <Node node={child} isInline={true} index={forIndex()} renderNode={Node} />
            )}
          </For>
        }
      >
        <Node node={props.node} index={props.index} isInline={false} renderNode={Node} />
      </Show>
    </Dynamic>
  )
}

function List(props: { node: SolidPortableTextList; index: number; key: string }) {
  const renderContext = useContext(RenderContext)

  const component = () => {
    const list = renderContext.components.list
    return typeof list === 'function'
      ? list
      : list[props.node.listItem] || renderContext.components.unknownList
  }

  createEffect(() => {
    if (component() === renderContext.components.unknownList) {
      const style = props.node.listItem || 'bullet'
      renderContext.handleMissingComponent(unknownListStyleWarning(style), {
        nodeType: 'listStyle',
        type: style,
      })
    }
  })

  return (
    <Dynamic
      component={component()}
      value={props.node}
      index={props.index}
      isInline={false}
      renderNode={Node}
    >
      <For each={props.node.children}>
        {(child, childIndex) => (
          <Node
            node={child._key ? child : { ...child, _key: `li-${props.index}-${childIndex()}` }}
            index={props.index}
            isInline={false}
            renderNode={Node}
          />
        )}
      </For>
    </Dynamic>
  )
}

function Text(props: { node: ToolkitTextNode; key: string }) {
  const renderContext = useContext(RenderContext)

  const hardBreak = () => renderContext.components.hardBreak || undefined

  return (
    <Show when={props.node.text === '\n'} fallback={props.node.text}>
      <Show when={hardBreak()} fallback="\n">
        <Dynamic component={hardBreak()!} />
      </Show>
    </Show>
  )
}

function Block(props: { node: PortableTextBlock; index: number; key: string; isInline: boolean }) {
  const renderContext = useContext(RenderContext)

  const style = () => props.node.style ?? 'normal'

  const component = () =>
    (typeof renderContext.components.block === 'function'
      ? renderContext.components.block
      : renderContext.components.block[style()]) ?? renderContext.components.unknownBlockStyle

  createEffect(() => {
    if (component() === renderContext.components.unknownBlockStyle) {
      renderContext.handleMissingComponent(unknownBlockStyleWarning(style()), {
        nodeType: 'blockStyle',
        type: style(),
      })
    }
  })

  const marksTree = createMemo(() => buildMarksTree(props.node))

  return (
    <Show when={props.key} keyed>
      <Dynamic
        component={component()}
        index={props.index}
        isInline={props.isInline}
        value={props.node}
        renderNode={Node}
      >
        <For each={marksTree()}>
          {(child, forIndex) => (
            <Node node={child} isInline={true} index={forIndex()} renderNode={Node} />
          )}
        </For>
      </Dynamic>
    </Show>
  )
}

function CustomBlock(props: { node: TypedObject; index: number; key: string; isInline: boolean }) {
  const renderContext = useContext(RenderContext)

  const component = () =>
    renderContext.components.types[props.node._type] ?? renderContext.components.unknownType

  createEffect(() => {
    if (!component()) {
      renderContext.handleMissingComponent(unknownTypeWarning(props.node._type), {
        nodeType: 'block',
        type: props.node._type,
      })
    }
  })

  return (
    <Dynamic
      component={component()}
      value={props.node}
      isInline={props.isInline}
      index={props.index}
      renderNode={Node}
    />
  )
}
