React Autocomplete
==================

Accessible, extensible, Autocomplete for React.js.

[![Travis build status](http://img.shields.io/travis/reactjs/react-autocomplete.svg?style=flat)](https://travis-ci.org/reactjs/react-autocomplete/)

Docs coming soon, for now just look at the `propTypes` and [examples](https://reactcommunity.org/react-autocomplete/) :)

Trying to settle on the right API, and then focus hard on accessibility,
there are a few missing bits right now.

Stuff we need help with:

- mobile support verification generally
- default mobile styles/positioniong (you'll notice the styles are
  pretty lean, on purpose, apps should style this however they'd like)
- tests (eventually)

# Tests!

Run them:
`npm test`

Write them:
`lib/__tests__/Autocomplete-test.js`

Check your work:
`npm run coverage`

# Props

Because `react-autocomplete` is just one component, the main customization comes
from just passing props to the `Autocomplete` component. `react-autocomplete`
will at least function with just the required props having been passed.

## Required props

### `items` (array)

This is an array of the items, themselves, to be put in the list for
autocomplete to show as possible options and to compare against when the user
has typed in a value. The `shouldItemRender` prop function compares the `value`
against this list.

### `getItemValue` (function)

A function that maps the objects in the list to the value to actually show in
the list. This makes it possible to pass an array of objects to the autocomplete
but let the user find values based solely on a specifically key.

### `renderItem` (function)

A function that returns a React element to show as an item in the list. Two
props are passed to the function, `item` and `isHighlighted`, which allow the
items in the list to be customized and styled. To style the container of these
items, review the `menuStyle` prop.

## Optional props

### `value` (any)
### `debug` (bool)
### `inputProps` (object)
### `menuStyle` (object)
### `onChange` (function)
### `onSelect` (function)
### `renderMenu` (function)
### `shouldItemRender` (function)
### `sortItems` (function)
### `wrapperProps` (object)
### `wrapperStyle` (object)
