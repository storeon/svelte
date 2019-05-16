# Storeon Svelte

<img src="https://storeon.github.io/storeon/logo.svg" align="right"

alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny (only 128 bytes) connector for [Storeon] and [Svelte].

- 128 bytes (minified and gzipped). It uses [Size Limit] to control size.
- Auto-subscription to the store.

[storeon]: https://github.com/storeon/storeon
[svelte]: https://github.com/sveltejs/svelte
[size limit]: https://github.com/ai/size-limit

## Install

```sh
npm install storeon-svelte
```

or

```sh
yarn add storeon-svelte
```

## How to use

```javascript
import createStore from 'storeon';
import { bindStoreon } from 'storeon-svelte';

let counter = store => {
  // Initial state
  store.on('@init', () => ({ count: 0 }));
  // Reducers returns only changed part of the state
  store.on('inc', ({ count }) => ({ count: count + 1 }));
};

const store = createStore([counter]);

export const connect = bindStoreon(store);
```

```html
<script>
  import { connect } from './store.js';

  const [dispatch, count] = connect('count');

  function increment() {
    dispatch('inc');
  }
</script>

<h1>The count is {$count}</h1>

<button on:click="{increment}">+</button>
```
