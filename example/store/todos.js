/* eslint-disable node/no-unsupported-features/es-syntax */
function randomId () {
  return Math.random().toString()
}

export const todos = store => {
  store.on('@init', () => ({ todos: [] }))
  store.on('todo/add', (state, text) => ({
    todos: [...state.todos, { id: randomId(), text, completed: false }]
  }))
  store.on('todo/delete', (state, id) => ({
    todos: state.todos.filter(todo => todo.id !== id)
  }))
  store.on('todo/edit', (state, { id, text }) => ({
    todos: state.todos.map(todo => todo.id === id ? { ...todo, text } : todo)
  }))
  store.on('todo/complete', (state, id) => ({
    todos: state.todos.map(
      todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }))
  store.on('todo/complete_all', state => {
    let marked = state.todos.every(todo => todo.completed)
    return { todos: state.todos.map(todo => ({ ...todo, completed: !marked })) }
  })
  store.on('todo/clear_completed', state => ({
    todos: state.todos.filter(todo => todo.completed === false)
  }))
}
