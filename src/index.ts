// Type guard for function union type
// see https://github.com/microsoft/TypeScript/issues/37663
const isFunction = (x: unknown): x is Function => typeof x === 'function'

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

function cond<T>(
  pairs: Array<[unknown, T | (() => T)]>,
  options: CondOptions = defaultOptions
): T | null {
  const match = pairs.find(([predicate]) => {
    return options.strict ? predicate === true : predicate
  })

  // No condition yielded true
  if (match === undefined) return null

  const conditional = match[1]

  return isFunction(conditional) ? conditional() : conditional
}

export default cond
