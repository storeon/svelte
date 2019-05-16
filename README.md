# storeon-svelte

<img src="https://storeon.github.io/storeon/logo.svg" align="right"
     alt="Storeon logo by Anton Lovchikov" width="160" height="142">

A tiny (only 128 bytes) connector for **[Storeon]** and Svelte.

---------------------
[Storeon]: https://github.com/storeon/storeon

## How to use
```javascript
import createStore from 'storeon';
import { bindStoreon } from 'storeon-svelte';

let counter = store => {
  // Initial state
  store.on('@init', () => ({ count: 0 }));
  // Reducers returns only changed part of the state
  store.on('inc', ({ count }) => ({  count: count + 1 }));
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

<button on:click={increment}>
	+
</button>
```
