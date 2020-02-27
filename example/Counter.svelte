<script>
  import { getStore } from '..'

  const { count, dispatch } = getStore('count')
</script>

<h1>The count is {$count}</h1>

<button on:click={() => dispatch('dec')}>
	-
</button>
<button on:click={() => dispatch('inc')}>
	+
</button>
