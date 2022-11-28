import test from 'ava'
import cond from '../src/index.js'

test('returns the first value for which the predicate evaluates to true', (t) => {
  const value = cond([
    [false, 'false'],
    [true, 'true'],
    [true, 'true but too late'],
  ])

  t.is(value, 'true')
})

test('returns undefined if no predicate evaluates to true', (t) => {
  const value = cond([[false, 'false']])

  t.is(value, undefined)
})

test('Accepts functions as value for lazy evaluation', (t) => {
  const value = cond<string>([
    [
      false,
      () => {
        t.fail()
        return 'false'
      },
    ],
    [true, () => 'true'],
  ])

  t.is(value, 'true')
})
