# cond-flow

Inspired by [Elixir's `cond`](https://elixir-lang.org/getting-started/case-cond-and-if.html#cond) this is a simpler alternative to [lodash's `_.cond`](https://lodash.com/docs/4.17.15#cond)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![codecov](https://codecov.io/gh/erikmueller/cond-flow/branch/master/graph/badge.svg)](https://codecov.io/gh/erikmueller/cond-flow)

## Install

Install with npm or yarn via

```sh
yarn add cond-flow
```

or

```sh
npm i cond-flow
```

## Usage

```js
import cond from 'cond-flow'

const value = cond([
  [false, 'false'],
  [true, 'true'],
  [true, 'true but too late'],
])

// value === 'true'
```

Also works nicely with React components as you can have the values lazily evaluated by wrapping it in a function:

```jsx
import cond from 'cond-flow'

const Component = ({ isDisabled, isNew, isLoading }) => (
  <>
    {cond([
      [isLoading, () => <Loading />],
      [isNew, () => <Create />],
      [isDisabled, null],
    ])}
  </>
)
```

### Fallback

You can provide a fallback which will be returned if no provided conditions are met.

```js
import cond from 'cond-flow'

const value = cond(
  [
    [false, () => 'false'],
    [false, () => 'also false'],
  ],
  { fallback: () => 'fallback' },
)

// value === 'fallback'
```

### Note

As all predicates have to be evaluated before the right branch can be chosen, it can have a negative performance impact if you rely on heavy computations. It's best to have simple booleans and resort to [Ramda's](https://ramdajs.com/docs/#cond) `cond` for complex use cases.

## Development

If you find this useful or would like to add features, feel free to clone the repository and open a PR.
