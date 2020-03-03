# Storeon Svelte

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny connector for [Storeon] and [Svelte]. ([Demo])

Size is only 185 bytes (minified and gzipped). It uses [Size Limit] to control size.

Read more about Storeon [article].

## Why?

[Svelte] is the smallest JS framework, but even so, it contains many built-in features. One of them is a `svelte/store`. But why we need to use a third-party store? `@storeon/svelte` has several advantages compared with the built-in one.

- **Size**. 185 bytes instead of 426 bytes (minified and gzipped).
- **Ecosystem**. Many additional [tools] can be combined with a store.
- **Speed**. It tracks what parts of state were changed and re-renders only components based on the changes.

[storeon]: https://github.com/storeon/storeon
[tools]: https://github.com/storeon/storeon#tools
[svelte]: https://github.com/sveltejs/svelte
[size limit]: https://github.com/ai/size-limit
[demo]: https://codesandbox.io/s/admiring-beaver-edi8m
[article]: https://evilmartians.com/chronicles/storeon-redux-in-173-bytes

## Install
```sh
npm install -S @storeon/svelte
```
or
```sh
yarn add @storeon/svelte
```
## How to use

Create store using `storeon` module:

#### `store.js`

```javascript
import createStore from 'storeon'

let counter = store => {
  store.on('@init', () => ({ count: 0 }))
  store.on('inc', ({ count }) => ({ count: count + 1 }))
}

export const store = createStore([counter])
```

Using TypeScript you can pass `State` and `Events` interface to the `createStore` function:

#### `store.ts`

```typescript
import createStore, { Store, StoreonEvents } from 'storeon'

// State structure
interface State {
  count: number
}

// Events declaration: map of event names to type of event data
interface Events extends StoreonEvents<State> {
  // `inc` event which do not goes with any data
  'inc': undefined
  // `set` event which goes with number as data
  'set': number
}

let counter = (store: Store<State>) => {
  store.on('@init', () => ({ count: 0 }))
  store.on('inc', ({ count }) => ({ count: count + 1 }))
  store.on('set', (_, event) => ({ count: event}))
};

export const store = createStore<State, Events>([counter])
```

#### `App.svelte`

Provide store to Svelte Context using `setStore` from `@storeon/svelte`

```html
<script>
  import { setStore } from '@storeon/svelte'
  import { store } from './store'
  import Counter from './Counter.svelte'

  setStore(store)
</script>

<Counter />
```

Import `getStore` function from our `@storeon/svelte` module and use it for getting state and dispatching new events:

#### `Child.svelte`

```html
<script>
  import { getStore } from '@storeon/svelte';

  const { count, dispatch } = getStore('count');

  function increment() {
    dispatch('inc');
  }
</script>

<h1>The count is {$count}</h1>

<button on:click={increment}>+</button>
```
Using typescript you can pass `State` and `Events` interfaces to `getStore` function to be full type safe
```html
<script lang="typescript">
  import { getStore } from '@storeon/svelte';
  import { State, Events } from './store'

  const { count, dispatch } = getStore<State, Events>('count');

  function increment() {
    dispatch('inc');
  }
</script>

<h1>The count is {$count}</h1>

<button on:click={increment}>+</button>
```

## Usage with [@storeon/router](https://github.com/storeon/router)
If you want to use the @storeon/svelte with the `@storeon/router` you should import the `router.createRouter` from `@storeon/router` and add this module to `createStore`

#### `store.js`
```js
import createStore from 'storeon'
import { createRouter } from '@storeon/router';

const store = createStore([
  createRouter([
    ['/', () => ({ page: 'home' })],
    ['/blog', () => ({ page: 'blog' })],
  ])
])
```

And use it like:
#### `App.svelte`
```html
<script>
  import { setStore } from '@storeon/svelte'
  import { store } from './store'
  import Counter from './Child.svelte'

  setStore(store)
</script>

<Counter />
```
#### `Child.svelte`
```html
<script>
  import { getStore } from '@storeon/svelte';
  import router from '@storeon/router'

  const { [router.key]: route } = getStore(router.key)
</script>

You can access the router like default svelte store via $:
{$route.match.page}
```
