var createStore = require('storeon')

/**
 * Initialize new store and apply all modules to the store for Svelte app.
 *
 * @param {modules[]} modules Functions which will set initial state
 *                            define reducer and subscribe
 *                            to all system events
 *
 * @return {connect} The store connector.
 *
 * @example
 * import { createSvelteStore } from "@storeon/svelte";
 *
 * let counter = store => {
 *  store.on("@init", () => ({ count: 0 }));
 *  store.on("inc", ({ count }) => ({ count: count + 1 }));
 * };
 * export const connect = createSvelteStore([counter]);
 */
function createSvelteStore (modules) {
  var store = createStore(modules)

  /**
   * Hook-like function to use Storeon in Svelte app
   *
   * @param {string} key Key of state field
   *
   */
  return function (key) {
    var state = store.get()
    var subscribers = []

    /**
     * Subscription for the state
     *
     * @param {function} run Callback function
     *
     */
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
