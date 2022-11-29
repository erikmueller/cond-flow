type Component<T> = T | (() => T)

type Pairs<T> = Array<[boolean, Component<T>]>

type Options<T> = {
  /**
   * If no match is found, the fallback is returned instead.
   * @default undefined
   */
  fallback?: Component<T>
}

// Ignoring rule to allow for usage of interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Cond {
  <T, F extends undefined>(pairs: Pairs<T>, options?: F): T | undefined
  <T, F extends Component<T>>(
    pairs: Pairs<T>,
    options?: { fallback: F },
  ): F extends Component<T> ? T : T | undefined
  <T>(pairs: Pairs<T>, options?: Options<T>): T | undefined
}

// Manual type guard is necessary, see https://stackoverflow.com/questions/62500700/error-2349-when-dealing-with-union-type-of-generic-t-and-function
function isFunction<T>(value: T | (() => T)): value is () => T {
  return typeof value === 'function'
}

function processMatch<T>(match: Component<T>): T {
  return isFunction<T>(match) ? match() : match
}

const cond: Cond = <T, F>(pairs: Pairs<T>, options?: Options<F>) => {
  const match = pairs.find(([predicate]) => predicate)

  if (!match) {
    if (!options?.fallback) {
      return undefined
    }

    return processMatch(options.fallback)
  }

  return processMatch(match[1])
}

export default cond
