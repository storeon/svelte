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

  let subscribers = []

  function makeSubscribable (key) {
    function subscribe (run) {
      let state = store.get()

      subscribers.push(run)
      run(state[key])

      return function () {
        subscribers = subscribers.filter(i => {
          return i !== run
        })
      }
    }

    return { subscribe }
  }

  store.on('@changed', (_, changed) => {
    keys.forEach(key => {
      if (key in changed) {
        subscribers.forEach(s => {
          s(changed[key])
        })
      }
    })
  })

  let data = { dispatch: store.dispatch }
  keys.forEach(key => {
    data[key] = makeSubscribable(key)
  })
  return data
}

module.exports = { setStore, getStore }
