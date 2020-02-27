<script>
  import Counter from './Counter.svelte'
  import { store } from './store'
  import { setStore } from '..'

  setStore(store)
</script>

<Counter />
