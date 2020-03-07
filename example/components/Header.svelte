<script >
  import { ENTER } from '../constants/keyCodes'
  import { getStore } from '../..'

  const { dispatch } = getStore()

  function handleKeydown(event) {
    if (event.which === ENTER && event.target.value.trim()) {
      dispatch('todo/add', event.target.value)
      event.target.value = '';
		}
  }
</script>

<header class="header">
  <h1>todos</h1>
  <input
		class="new-todo"
		on:keydown={handleKeydown}
		placeholder="What needs to be done?"
		autofocus
	>
</header>
