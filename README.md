# Storeon Svelte

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny connector for [Storeon] and [Svelte]. ([Demo])

Size is only 284 bytes (minified and gzipped). It uses [Size Limit] to control size

Read more about Storeon [article].

## Why?

[Svelte] is the smallest JS framework, but even so, it contains many built-in features. One of them is a `svelte/store`. But why we need to use a third-party store? `@storeon/svelte` has several advantages compared with the built-in one.

- **Size**. 284 bytes instead of 426 bytes (minified and gzipped).
- **Ecosystem**. Many additional [tools] can be combined with a store.
- **Fast**. It tracks what parts of state were changed and re-renders only components based on the changes.

[storeon]: https://github.com/storeon/storeon
[tools]: https://github.com/storeon/storeon#tools
[svelte]: https://github.com/sveltejs/svelte
[size limit]: https://github.com/ai/size-limit
[demo]: https://codesandbox.io/s/admiring-beaver-edi8m
[article]: https://evilmartians.com/chronicles/storeon-redux-in-173-bytes

## Install

This module includes `storeon` module as a dependency so you don't need to install `storeon` itself

```sh
npm install @storeon/svelte
```

## How to use

Use `createSvelteStore` from the `@storeon/svelte` package instead of using `createStore` from the `svelte` package. It accepts the same API as `createStore` function (array of modules)

#### `store.js`

```javascript
import { createSvelteStore } from "@storeon/svelte";

let counter = store => {
  store.on("@init", () => ({ count: 0 }));
  store.on("inc", ({ count }) => ({ count: count + 1 }));
};

export const connect = createSvelteStore([counter]);
```

Using TypeScript you can pass `State` interface to the `createSvelteStore` function

#### `store.ts`

```typescript
import { createSvelteStore, Store } from "@storeon/svelte";

interface State {
  count: number;
}

let counter = (store: Store<State>) => {
  store.on("@init", () => ({ count: 0 }));
  store.on("inc", ({ count }) => ({ count: count + 1 }));
};

export const connect = createSvelteStore<State>([counter]);
```

Import `connect` function from our `./store` and use it for getting state and dispatching new events

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
