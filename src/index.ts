type Component<T> = T | (() => T)

type Options<T> = {
  /**
   * If no match is found, the fallback is returned instead.
   * @default undefined
   */
  fallback?: Component<T>
}

// Manual type guard is necessary, see https://stackoverflow.com/questions/62500700/error-2349-when-dealing-with-union-type-of-generic-t-and-function
function isFunction<T>(value: T | (() => T)): value is () => T {
  return typeof value === 'function'
}

function processMatch<T>(match: Component<T>): T {
  return isFunction<T>(match) ? match() : match
}

function cond<T>(
  pairs: Array<[boolean, Component<T>]>,
  options?: Options<T>,
): T | undefined {
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
