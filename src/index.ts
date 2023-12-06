type Value<T> = T | (() => T);

type Pairs<T> = [boolean, Value<T>][];

type Options<T> = {
  /**
   * If no match is found, the default is returned instead.
   * @default undefined
   */
  default?: Value<T>;
};

// Ignoring rule to allow for usage of interface
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface Cond {
  <T, F extends undefined>(pairs: Pairs<T>, options?: F): T | undefined;
  <T1, F1 extends Value<T1>>(
    pairs: Pairs<T1>,
    options?: { default: F1 },
  ): F1 extends Value<T1> ? T1 : T1 | undefined;
  <T2>(pairs: Pairs<T2>, options?: Options<T2>): T2 | undefined;
}

// Manual type guard is necessary, see https://stackoverflow.com/questions/62500700/error-2349-when-dealing-with-union-type-of-generic-t-and-function
function isFunction<T>(value: T | (() => T)): value is () => T {
  return typeof value === "function";
}

function processMatch<T>(match: Value<T>): T {
  return isFunction<T>(match) ? match() : match;
}

const cond: Cond = <T, F>(pairs: Pairs<T>, options?: Options<F>) => {
  const found = pairs.find(([predicate]) => predicate);
  const match = found === undefined ? options?.default : found[1];

  return processMatch(match);
};

export default cond;
