[![Build Status](https://travis-ci.com/distolma/storeon-svelte.svg?branch=master)](https://travis-ci.com/distolma/storeon-svelte)

# Storeon Svelte

<img src="https://storeon.github.io/storeon/logo.svg" align="right" alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny connector for [Storeon] and [Svelte]. ([Demo])

Size is only 284 bytes (minified and gzipped). It uses [Size Limit] to control size

Read more about Storeon [article].

[storeon]: https://github.com/storeon/storeon
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
  // Initial state
  store.on("@init", () => ({ count: 0 }));
  // Reducers returns only changed part of the state
  store.on("inc", ({ count }) => ({ count: count + 1 }));
};

export const connect = createSvelteStore([counter]);
```

Import `connect` function from our `./store` and use it for getting state and dispatching new events

#### `App.svelte`

```html
<script>
  import { connect } from "./store.js";

  const [dispatch, count] = connect("count");

  function increment() {
    dispatch("inc");
  }
</script>

<h1>The count is {$count}</h1>

<button on:click="{increment}">+</button>
```
