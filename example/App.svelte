<script>
  import { connect } from './store.js';

  const count = connect('count');

  function increment() {
    count.dispatch('inc');
  }

  function decrement() {
    count.dispatch('dec');
  }
</script>

<h1>The count is {$count}</h1>

<button on:click={decrement}>
	-
</button>
<button on:click={increment}>
	+
</button>
