React Autocomplete
==================

Accessible, extensible, Autocomplete for React.js.

Docs coming soon, for now just look at the `propTypes` and [examples](https://reactjs.github.io/react-autocomplete/) :)

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

Because `react-autocomplete` is just one component, the main customization come
from passing props to the `Autocomplete` component.

## Required props

### `getItemValue` (function)
### `renderItem` (function)

## Optional props

### `value` (any)
### `onChange` (function)
### `onSelect` (function)
### `shouldItemRender` (function)
### `sortItems` (function)
### `renderMenu` (function)
### `menuStyle` (object)
### `inputProps` (object)
### `wrapperProps` (object)
### `wrapperStyle` (object)
### `debug` (bool)
