<script >
  import Footer from './Footer.svelte'
  import TodoItem from './TodoItem.svelte'
  import { SHOW_ACTIVE, SHOW_ALL, SHOW_COMPLETED } from '../constants/TodoFilters'
  import { useStoreon } from '../..'

  const { dispatch, todos, filter } = useStoreon('todos', 'filter')

  function handleCompleteAll() {
    dispatch('todo/complete_all')
  }

  function handleDelete(event) {
    dispatch('todo/delete', event.detail)
  }

  function handleEdit(event) {
    dispatch('todo/edit', { ...event.detail })
  }

  function handleComplete(event) {
    dispatch('todo/complete', event.detail)
  }

  $: numCompleted = $todos.filter(todo => todo.completed).length;
  $: filtered = $filter === SHOW_ALL
		? $todos
		: $filter === SHOW_COMPLETED
			? $todos.filter(todo => todo.completed)
			: $todos.filter(todo => !todo.completed);
</script>

{#if $todos.length > 0}
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      on:change={handleCompleteAll}
      checked="{numCompleted === $todos.length}"
    />
    <label for="toggle-all">Mark all as complete</label>

    <ul class="todo-list">
        {#each filtered as todo (todo.id)}
          <TodoItem todo={todo} on:delete={handleDelete} on:edit={handleEdit} on:complete={handleComplete} />
        {/each}
      </ul>

    <Footer />
  </section>
{/if}
