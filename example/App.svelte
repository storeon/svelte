<script>
  import { connect } from './store.js';

  const [dispatch, count] = connect('count');

  function increment() {
    dispatch('inc');
  }

  function decrement() {
    dispatch('dec');
  }
</script>

<h1>The count is {$count}</h1>

<button on:click={decrement}>
	-
</button>
<button on:click={increment}>
	+
</button>
