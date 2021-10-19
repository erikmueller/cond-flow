const cond = require('../built/index')

test('returns the first value for which the predicate evaluates to true', () => {
  const value = cond([
    [false, 'false'],
    ['', 'empty'],
    [0, '0'],
    [1, '1'],
    [true, 'true'],
    [true, 'true but too late'],
  ])

  expect(value).toBe('true')
})

test('returns the first value for which the predicate evaluates to truthy', () => {
  const value = cond(
    [
      [false, 'false'],
      ['', 'empty'],
      [0, '0'],
      [1, 'truthy'],
      [true, 'true but too late'],
    ],
    { strict: false }
  )

  expect(value).toBe('truthy')
})

test('returns null if no predicate evaluates to true', () => {
  const value = cond([[false, 'false']])

  expect(value).toBe(null)
})

test('Accepts functions as value for lazy evaluation', () => {
  const falseSpy = jest.fn(() => 'false').mockName('falseHandler')
  const trueSpy = jest.fn(() => 'true').mockName('trueHandler')

  const value = cond([
    [false, falseSpy],
    [true, trueSpy],
  ])

  expect(falseSpy).not.toHaveBeenCalled()
  expect(value).toBe('true')
})
