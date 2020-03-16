<script >
  import { useStoreon } from '../..'
  import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/TodoFilters'

  const { dispatch, todos, filter } = useStoreon('todos', 'filter')

  function handleClearCompleted() {
    dispatch('todo/clear_completed')
  }

  $: numActive = $todos.filter(todo => !todo.completed).length;
  $: numCompleted = $todos.filter(todo => todo.completed).length;
</script>

<footer class="footer">
  <span class="todo-count">
    <strong>{numActive}</strong> {numActive === 1 ? 'item' : 'items'} left
  </span>
  <ul class="filters">
    <li><a class="{$filter === SHOW_ALL ? 'selected' : ''}" href="/#">All</a></li>
    <li><a class="{$filter === SHOW_ACTIVE ? 'selected' : ''}" href="/#active">Active</a></li>
    <li><a class="{$filter === SHOW_COMPLETED ? 'selected' : ''}" href="/#completed">Completed</a></li>
  </ul>
  {#if numCompleted}
    <button class="clear-completed" on:click={handleClearCompleted}>
      Clear completed
    </button>
  {/if}
</footer>
