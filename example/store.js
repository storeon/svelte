import createStore from 'storeon'

let counter = store => {
  store.on('@init', () => ({ count: 0 }))
  store.on('inc', ({ count }) => ({ count: count + 1 }))
  store.on('dec', ({ count }) => ({ count: count - 1 }))
}

export const store = createStore([counter])
