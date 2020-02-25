# Storeon Svelte

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny connector for [Storeon] and [Svelte]. ([Demo])

Size is only 293 bytes (minified and gzipped). It uses [Size Limit] to control size.

Read more about Storeon [article].

## Why?

[Svelte] is the smallest JS framework, but even so, it contains many built-in features. One of them is a `svelte/store`. But why we need to use a third-party store? `@storeon/svelte` has several advantages compared with the built-in one.

- **Size**. 293 bytes instead of 426 bytes (minified and gzipped).
- **Ecosystem**. Many additional [tools] can be combined with a store.
- **Fast**. It tracks what parts of state were changed and re-renders only components based on the changes.

[storeon]: https://github.com/storeon/storeon
[tools]: https://github.com/storeon/storeon#tools
[svelte]: https://github.com/sveltejs/svelte
[size limit]: https://github.com/ai/size-limit
[demo]: https://codesandbox.io/s/admiring-beaver-edi8m
[article]: https://evilmartians.com/chronicles/storeon-redux-in-173-bytes

## Install

This module includes `storeon` module as a dependency so you don't need to install `storeon` itself:

```sh
npm install @storeon/svelte
```

## How to use

Use `createSvelteStore` from the `@storeon/svelte` package instead of using `createStore` from the `svelte` package. It accepts the same API as `createStore` function (array of modules).

#### `store.js`

```javascript
import { createSvelteStore } from "@storeon/svelte";

let counter = store => {
  store.on("@init", () => ({ count: 0 }));
  store.on("inc", ({ count }) => ({ count: count + 1 }));
};

export const connect = createSvelteStore([counter]);
```

Using TypeScript you can pass `State` interface to the `createSvelteStore` function:

#### `store.ts`

```typescript
import { createSvelteStore, Store, StoreonEvents } from "@storeon/svelte";

// State structure
interface State {
  count: number;
}

// Events declaration: map of event names to type of event data
interface Events extends StoreonEvents<State> {
  // `inc` event which do not goes with any data
  'inc': undefined
  // `set` event which goes with number as data
  'set': number
}

let counter = (store: Store<State>) => {
  store.on("@init", () => ({ count: 0 }));
  store.on("inc", ({ count }) => ({ count: count + 1 }));
  store.on('set', (_, event) => ({ count: event}));
};

export const connect = createSvelteStore<State, Events>([counter]);
```

Import `connect` function from our `./store` and use it for getting state and dispatching new events:

#### `App.svelte`

```html
<script>
  import { connect } from "./store.js";

  const count = connect("count");

  function increment() {
    count.dispatch("inc");
  }
</script>

<h1>The count is {$count}</h1>

<button on:click="{increment}">+</button>
```

## Usage with [@storeon/router](https://github.com/storeon/router)
If you want to use the @storeon/svelte with the [@storeon/router](https://github.com/storeon/router) you should import the `router.createRouter` from [@storeon/router](https://github.com/storeon/router) and add this module to `createSvelteStore` instead of `createStore`

#### `store.js`
```js
import { createSvelteStore } from "@storeon/svelte";
import { createRouter } from "@storeon/router";

const connect = createSvelteStore([
  createRouter([
    ['/', () => ({ page: 'home' })],
    ['/blog', () => ({ page: 'blog' })],
  ])
])
```

And use it like:
#### `App.svelte`
```svelte
<script>
  import { connect } from "./store.js";
  import router from "@storeon/router"

  const moduleRouter = connect(router.key)
</script>

You can access the router like default svelte store via $:
{$moduleRouter.match.page}
```
