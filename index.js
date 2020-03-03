let { getContext, setContext } = require('svelte')

const STORE = typeof Symbol !== 'undefined' ? Symbol('storeon') : '@@storeon'

function setStore (store) {
  setContext(STORE, store)
}

function getStore (...keys) {
  let store = getContext(STORE)
  if (process.env.NODE_ENV !== 'production' && !store) {
    throw new Error(
      'Could not find storeon context value.' +
      'Please ensure you provide store usin "setStore" function'
    )
  }

  let subscribers = {}

  function makeSubscribable (key) {
    function subscribe (run) {
      let state = store.get()

      subscribers[key] = run
      run(state[key])

      return function () {
        delete subscribers[key]
      }
    }

    return { subscribe }
  }

  store.on('@changed', (_, changed) => {
    keys.forEach(key => {
      if (changed[key] && subscribers[key]) {
        subscribers[key](changed[key])
      }
    })
  })

  let data = { }
  keys.forEach(key => {
    data[key] = makeSubscribable(key)
  })
  data.dispatch = store.dispatch
  return data
}

module.exports = { setStore, getStore }
