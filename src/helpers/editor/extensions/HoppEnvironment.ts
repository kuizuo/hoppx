import { watch, Ref } from "vue"
import { Compartment } from "@codemirror/state"
import {
  Decoration,
  EditorView,
  MatchDecorator,
  ViewPlugin,
  hoverTooltip,
} from "@codemirror/view"
import * as E from "fp-ts/Either"
import { parseTemplateStringE } from "@hoppscotch/data"
import { StreamSubscriberFunc } from "@composables/stream"
import {
  AggregateEnvironment,
  aggregateEnvs$,
  getAggregateEnvs,
  getSelectedEnvironmentType,
} from "~/newstore/environments"
import { invokeAction } from "~/helpers/actions"

const HOPP_ENVIRONMENT_REGEX = /(<<[a-zA-Z0-9-_]+>>)/g

const HOPP_ENV_HIGHLIGHT =
  "cursor-help transition rounded px-1 focus:outline-none mx-0.5 env-highlight"
const HOPP_ENV_HIGHLIGHT_FOUND =
  "bg-accentDark text-accentContrast hover:bg-accent"
const HOPP_ENV_HIGHLIGHT_NOT_FOUND =
  "bg-red-500 text-accentContrast hover:bg-red-600"

const cursorTooltipField = (aggregateEnvs: AggregateEnvironment[]) =>
  hoverTooltip(
    (view, pos, side) => {
      const { from, to, text } = view.state.doc.lineAt(pos)

      // TODO: When Codemirror 6 allows this to work (not make the
      // popups appear half of the time) use this implementation
      // const wordSelection = view.state.wordAt(pos)
      // if (!wordSelection) return null
      // const word = view.state.doc.sliceString(
      //   wordSelection.from - 2,
      //   wordSelection.to + 2
      // )
      // if (!HOPP_ENVIRONMENT_REGEX.test(word)) return null

      // Tracking the start and the end of the words
      let start = pos
      let end = pos

      while (start > from && /[a-zA-Z0-9-_]+/.test(text[start - from - 1]))
        start--
      while (end < to && /[a-zA-Z0-9-_]+/.test(text[end - from])) end++

      if (
        (start === pos && side < 0) ||
        (end === pos && side > 0) ||
        !HOPP_ENVIRONMENT_REGEX.test(
          text.slice(start - from - 2, end - from + 2)
        )
      )
        return null

      const parsedEnvKey = text.slice(start - from, end - from)

      const tooltipEnv = aggregateEnvs.find((env) => env.key === parsedEnvKey)

      const envName = tooltipEnv?.sourceEnv ?? "Choose an Environment"

      const envValue = tooltipEnv?.value ?? "Not found"

      const result = parseTemplateStringE(envValue, aggregateEnvs)

      const finalEnv = E.isLeft(result) ? "error" : result.right

      const selectedEnvType = getSelectedEnvironmentType()

      const envTypeIcon = `<i class="inline-flex -my-1 -mx-0.5 opacity-65 items-center text-base material-icons border-secondary">${
        selectedEnvType === "TEAM_ENV" ? "people" : "person"
      }</i>`

      const appendEditAction = (tooltip: HTMLElement) => {
        const editIcon = document.createElement("span")
        editIcon.className =
          "ml-2 cursor-pointer env-icon text-accent hover:text-accentDark"
        editIcon.addEventListener("click", () => {
          const isPersonalEnv =
            envName === "Global" || selectedEnvType !== "TEAM_ENV"
          const action = isPersonalEnv ? "my" : "team"
          invokeAction(`modals.${action}.environment.edit`, {
            envName,
            variableName: parsedEnvKey,
          })
        })
        editIcon.innerHTML = `<i class="inline-flex items-center px-1 -mx-1 -my-1 text-base material-icons border-secondary">drive_file_rename_outline</i>`
        tooltip.appendChild(editIcon)
      }

      return {
        pos: start,
        end: to,
        above: true,
        arrow: true,
        create() {
          const dom = document.createElement("span")
          const tooltipContainer = document.createElement("span")
          const kbd = document.createElement("kbd")
          const icon = document.createElement("span")
          icon.innerHTML = envTypeIcon
          icon.className = "mr-2 env-icon"
          kbd.textContent = finalEnv
          tooltipContainer.appendChild(icon)
          tooltipContainer.appendChild(document.createTextNode(`${envName} `))
          tooltipContainer.appendChild(kbd)
          if (tooltipEnv) appendEditAction(tooltipContainer)
          tooltipContainer.className = "tippy-content"
          dom.className = "tippy-box"
          dom.dataset.theme = "tooltip"
          dom.appendChild(tooltipContainer)
          return { dom }
        },
      }
    },
    // HACK: This is a hack to fix hover tooltip not coming half of the time
    // https://github.com/codemirror/tooltip/blob/765c463fc1d5afcc3ec93cee47d72606bed27e1d/src/tooltip.ts#L622
    // Still doesn't fix the not showing up some of the time issue, but this is atleast more consistent
    { hoverTime: 1 } as any
  )

function checkEnv(env: string, aggregateEnvs: AggregateEnvironment[]) {
  const className = aggregateEnvs.find(
    (k: { key: string }) => k.key === env.slice(2, -2)
  )
    ? HOPP_ENV_HIGHLIGHT_FOUND
    : HOPP_ENV_HIGHLIGHT_NOT_FOUND

  return Decoration.mark({
    class: `${HOPP_ENV_HIGHLIGHT} ${className}`,
  })
}

const getMatchDecorator = (aggregateEnvs: AggregateEnvironment[]) =>
  new MatchDecorator({
    regexp: HOPP_ENVIRONMENT_REGEX,
    decoration: (m) => checkEnv(m[0], aggregateEnvs),
  })

export const environmentHighlightStyle = (
  aggregateEnvs: AggregateEnvironment[]
) => {
  const decorator = getMatchDecorator(aggregateEnvs)

  return ViewPlugin.define(
    (view) => ({
      decorations: decorator.createDeco(view),
      update(u) {
        this.decorations = decorator.updateDeco(u, this.decorations)
      },
    }),
    {
      decorations: (v) => v.decorations,
    }
  )
}

export class HoppEnvironmentPlugin {
  private compartment = new Compartment()

  private envs: AggregateEnvironment[] = []

  constructor(
    subscribeToStream: StreamSubscriberFunc,
    private editorView: Ref<EditorView | undefined>
  ) {
    this.envs = getAggregateEnvs()

    subscribeToStream(aggregateEnvs$, (envs) => {
      this.envs = envs

      this.editorView.value?.dispatch({
        effects: this.compartment.reconfigure([
          cursorTooltipField(this.envs),
          environmentHighlightStyle(this.envs),
        ]),
      })
    })
  }

  get extension() {
    return this.compartment.of([
      cursorTooltipField(this.envs),
      environmentHighlightStyle(this.envs),
    ])
  }
}

export class HoppReactiveEnvPlugin {
  private compartment = new Compartment()

  private envs: AggregateEnvironment[] = []

  constructor(
    envsRef: Ref<AggregateEnvironment[]>,
    private editorView: Ref<EditorView | undefined>
  ) {
    watch(
      envsRef,
      (envs) => {
        this.envs = envs

        this.editorView.value?.dispatch({
          effects: this.compartment.reconfigure([
            cursorTooltipField(this.envs),
            environmentHighlightStyle(this.envs),
          ]),
        })
      },
      { immediate: true }
    )
  }

  get extension() {
    return this.compartment.of([
      cursorTooltipField(this.envs),
      environmentHighlightStyle(this.envs),
    ])
  }
}
