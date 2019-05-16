/**
 *
 * @param {*} store
 *
 * @return {}
 */
const bindStoreon = function (store) {
  /**
   *
   */
  return function (key) {
    var state = store.get();
    var subscribers = [];

    function subscribe(run) {
      subscribers.push(run);
      run(state[key])

      return function () {
        var index = subscribers.indexOf(run);
        if (index !== -1) subscribers.splice(index, 1);
      }
    }

    store.on("@changed", function (_, changed) {
      if (key in changed) {
        subscribers.forEach(s => s(changed[key]))
      }
    })

    var changes = {
      subscribe: subscribe
    }

    return [store.dispatch, changes];
  }
}

module.exports = { bindStoreon }
