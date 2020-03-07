<script>
  import { createEventDispatcher } from 'svelte';
  import { ENTER, ESCAPE } from '../constants/keyCodes'
  const dispatch = createEventDispatcher();

  export let todo = {}
  let editing = false

  function handleDelete() {
    dispatch('delete', todo.id)
  }

  function handleSubmit(event) {
    dispatch('edit', { id: todo.id, text: event.target.value })
    editing = false;
  }

  function handleComplete() {
    dispatch('complete', todo.id)
  }

  function handleEdit(event) {
    if (event.which === ENTER) {
      event.target.blur();
    } else if (event.which === ESCAPE) {
      editing = false;
    }
  }

  $: editing
</script>

<li class="{todo.completed ? 'completed' : ''} {editing ? 'editing' : ''}">
  <div class="view">
    <input class="toggle" type="checkbox" checked={todo.completed} on:change={handleComplete}>
    <label on:dblclick="{() => editing = true}">{todo.text}</label>
    <button on:click="{handleDelete}" class="destroy"></button>
  </div>

  {#if editing}
    <input
      value='{todo.text}'
      id="edit"
      class="edit"
      on:keydown={handleEdit}
      on:blur={handleSubmit}
      autofocus
    >
  {/if}
</li>
