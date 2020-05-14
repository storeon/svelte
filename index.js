const { getContext, setContext } = require('svelte')

const STORE = typeof Symbol !== 'undefined' ? Symbol('storeon') : '@@storeon'

function provideStoreon (store) {
  setContext(STORE, store)
}

function useStoreon (...keys) {
  let store = getContext(STORE)
  if (process.env.NODE_ENV !== 'production' && !store) {
    throw new Error(
      'Could not find storeon context value.' +
      'Please ensure you provide store using "provideStoreon" function'
    )
  }

  let subscribers = {}

  let makeSubscribable = key => {
    let subscribe = run => {
      let state = store.get()

      subscribers[key] = run
      run(state[key])

      return () => {
        delete subscribers[key]
      }
    }

    return { subscribe }
  }

  store.on('@changed', (_, changed) => {
    keys.forEach(key => {
      if (changed.hasOwnProperty(key) && subscribers[key]) {
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

module.exports = { provideStoreon, useStoreon }
