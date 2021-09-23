export as namespace cond;

interface CondOptions {
  /**
   * Disables strict checking. Default is true.
   * @default true
   */
  strict: boolean
}

declare function cond<T>(pairs: Array<[boolean, T | (() => T)]>, options?: CondOptions): T | null
  
export default cond
