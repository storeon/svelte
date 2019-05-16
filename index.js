var createStore = require('storeon')

/**
 *
 * @param {*} modules
 *
 * @return {}
 */
function createSvelteStore (modules) {
  var store = createStore(modules)

  /**
   *
   */
  return function (key) {
    var state = store.get()
    var subscribers = []

    function subscribe (run) {
      subscribers.push(run)
      run(state[key])

      return function () {
        var index = subscribers.indexOf(run)
        if (index !== -1) subscribers.splice(index, 1)
      }
    }

    store.on('@changed', function (_, changed) {
      if (key in changed) {
        subscribers.forEach(function (s) {
          s(changed[key])
        })
      }
    })

    var changes = {
      subscribe: subscribe
    }

    return [store.dispatch, changes]
  }
}

module.exports = { createSvelteStore: createSvelteStore }
