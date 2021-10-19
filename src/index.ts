const defaultOptions = {
  strict: true,
}

interface CondOptions {
  /**
   * Toggles strict checking. Default is true.
   * @default true
   */
  strict: boolean
}

type Conditional<T> = T extends any ? T | (() => T) : never

function cond<T>(
  pairs: Array<[boolean, Conditional<T>]>,
  options: CondOptions = defaultOptions
): T | null {
  const match = pairs.find(([predicate]) => {
    return options.strict ? predicate === true : predicate
  })

  // No condition yielded true
  if (!match) return null

  const conditional = match[1]

  return typeof conditional === 'function' ? conditional() : conditional
}

export default cond
