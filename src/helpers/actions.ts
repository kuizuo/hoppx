/* An `action` is a unique verb that is associated with certain thing that can be done on Hoppscotch.
 * For example, sending a request.
 */

import { onBeforeUnmount, onMounted } from "vue"
import { BehaviorSubject } from "rxjs"

export type HoppAction =
  | "request.send-cancel" // Send/Cancel a Hoppscotch Request
  | "request.reset" // Clear request data
  | "request.copy-link" // Copy Request Link
  | "request.save" // Save to Collections
  | "request.save-as" // Save As
  | "request.method.next" // Select Next Method
  | "request.method.prev" // Select Previous Method
  | "request.method.get" // Select GET Method
  | "request.method.head" // Select HEAD Method
  | "request.method.post" // Select POST Method
  | "request.method.put" // Select PUT Method
  | "request.method.delete" // Select DELETE Method
  | "flyouts.keybinds.toggle" // Shows the keybinds flyout
  | "modals.search.toggle" // Shows the search modal
  | "modals.support.toggle" // Shows the support modal
  | "modals.share.toggle" // Shows the share modal
  | "modals.my.environment.edit" // Edit current personal environment
  | "modals.team.environment.edit" // Edit current team environment
  | "navigation.jump.rest" // Jump to REST page
  | "navigation.jump.graphql" // Jump to GraphQL page
  | "navigation.jump.realtime" // Jump to realtime page
  | "navigation.jump.documentation" // Jump to documentation page
  | "navigation.jump.settings" // Jump to settings page
  | "navigation.jump.profile" // Jump to profile page
  | "settings.theme.system" // Use system theme
  | "settings.theme.light" // Use light theme
  | "settings.theme.dark" // Use dark theme
  | "settings.theme.black" // Use black theme
  | "response.preview.toggle" // Toggle response preview
  | "response.file.download" // Download response as file
  | "response.copy" // Copy response to clipboard

/**
 * Defines the arguments, if present for a given type that is required to be passed on
 * invocation and will be passed to action handlers.
 *
 * This type is supposed to be an object with the key being one of the actions mentioned above.
 * The value to the key can be anything.
 * If an action has no argument, you do not need to add it to this type.
 *
 * NOTE: We can't enforce type checks to make sure the key is Action, you
 * will know if you got something wrong if there is a type error in this file
 */
type HoppActionArgs = {
  "modals.my.environment.edit": {
    envName: string
    variableName: string
  }
  "modals.team.environment.edit": {
    envName: string
    variableName: string
  }
}

/**
 * HoppActions which require arguments for their invocation
 */
type HoppActionWithArgs = keyof HoppActionArgs

/**
 * HoppActions which do not require arguments for their invocation
 */
export type HoppActionWithNoArgs = Exclude<HoppAction, HoppActionWithArgs>

/**
 * Resolves the argument type for a given HoppAction
 */
type ArgOfHoppAction<A extends HoppAction> = A extends HoppActionWithArgs
  ? HoppActionArgs[A]
  : undefined

/**
 * Resolves the action function for a given HoppAction, used by action handler function defs
 */
type ActionFunc<A extends HoppAction> = A extends HoppActionWithArgs
  ? (arg: ArgOfHoppAction<A>) => void
  : () => void

type BoundActionList = {
  // eslint-disable-next-line no-unused-vars
  [A in HoppAction]?: Array<ActionFunc<A>>
}

const boundActions: BoundActionList = {}

export const activeActions$ = new BehaviorSubject<HoppAction[]>([])

export function bindAction<A extends HoppAction>(
  action: A,
  handler: ActionFunc<A>
) {
  if (boundActions[action]) {
    boundActions[action]?.push(handler)
  } else {
    // 'any' assertion because TypeScript doesn't seem to be able to figure out the links.
    boundActions[action] = [handler] as any
  }

  activeActions$.next(Object.keys(boundActions) as HoppAction[])
}

type InvokeActionFunc = {
  (action: HoppActionWithNoArgs, args?: undefined): void
  <A extends HoppActionWithArgs>(action: A, args: ArgOfHoppAction<A>): void
}

/**
 * Invokes a action, triggering action handlers if any registered.
 * The second argument parameter is optional if your action has no args required
 * @param action The action to fire
 * @param args The argument passed to the action handler. Optional if action has no args required
 */
export const invokeAction: InvokeActionFunc = <A extends HoppAction>(
  action: A,
  args: ArgOfHoppAction<A>
) => {
  boundActions[action]?.forEach((handler) => handler(args!))
}

export function unbindAction<A extends HoppAction>(
  action: A,
  handler: ActionFunc<A>
) {
  // 'any' assertion because TypeScript doesn't seem to be able to figure out the links.
  boundActions[action] = boundActions[action]?.filter(
    (x) => x !== handler
  ) as any

  if (boundActions[action]?.length === 0) {
    delete boundActions[action]
  }

  activeActions$.next(Object.keys(boundActions) as HoppAction[])
}

export function defineActionHandler<A extends HoppAction>(
  action: A,
  handler: ActionFunc<A>
) {
  onMounted(() => {
    bindAction(action, handler)
  })

  onBeforeUnmount(() => {
    unbindAction(action, handler)
  })
}
