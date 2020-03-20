# cond-flow

Inspired bei Elixir's `cond` (see [case-cond-and-if](https://elixir-lang.org/getting-started/case-cond-and-if.html#cond)) this is a simpler alternative to `_.cond` from [lodash](https://lodash.com/docs/4.17.15#cond)

[![CI status](https://circleci.com/gh/erikmueller/cond-flow.svg?style=shield)](LINK)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Install

Install with npm or yarn via

```
yarn add cond-flow
```

or

```
npm i cond-flow
```

## Usage

```js
import cond from 'cond-flow'

const value = cond([
  [false, 'false'],
  [true, 'true'],
  [true, 'true but too late']
])

// value === 'true'
```

You can disable strict checking by passing options as the second argument:

```js
import cond from 'cond-flow'

const value = cond(
  [
    [false, 'false'],
    [1, 'truthy'],
    [true, 'true but also too late']
  ],
  { strict: false }
)

// value === 'truthy'
```

## Development

If you find this useful or would like to add features, feel free to clone the repository and open a PR.
