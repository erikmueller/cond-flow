import test from 'ava'
import cond from '../src/index.js'

test('returns the first value for which the predicate evaluates to true', (t) => {
  const match = cond([
    [false, 'false'],
    [true, 'true'],
    [true, 'true but too late'],
  ])

  t.is(match, 'true')
})

test('returns undefined if no predicate evaluates to true', (t) => {
  const match = cond([[false, 'false']])

  t.is(match, undefined)
})

test('accepts functions as value for lazy evaluation', (t) => {
  const match = cond([
    [
      false,
      () => {
        t.fail()
        return 'false'
      },
    ],
    [true, () => 'true'],
  ])

  t.is(match, 'true')
})

test('returns fallback if no condition matches', (t) => {
  const fallbackWithMatch = cond([[true, () => 'true']], {
    fallback: () => 'fallback',
  })
  const fallbackWithoutMatch = cond([[false, () => 'false']], {
    fallback: () => 'fallback',
  })

  t.is(fallbackWithMatch, 'true')
  t.is(fallbackWithoutMatch, 'fallback')

  const undefinedFallbackWithMatch = cond([[true, () => 'true']], {
    fallback: undefined,
  })
  const undefinedFallbackWithoutMatch = cond([[false, () => 'false']], {
    fallback: undefined,
  })

  t.is(undefinedFallbackWithMatch, 'true')
  t.is(undefinedFallbackWithoutMatch, undefined)
})
