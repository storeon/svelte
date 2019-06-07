var createSvelteStore = require('.').createSvelteStore

function connectFactory () {
  function counter (store) {
    store.on('@init', function () {
      return { count: 0, foo: 'baz' }
    })
    store.on('inc', function (state) {
      return { count: state.count + 1 }
    })
  }

  return createSvelteStore([counter])
}

it('should start with init value', function () {
  var connect = connectFactory()

  var count = connect('count')

  count.subscribe(function (value) {
    return expect(value).toBe(0)
  })
})

it('should be reactive', function () {
  var connect = connectFactory()

  var currentValue
  var count = connect('count')

  count.subscribe(function (value) {
    currentValue = value
  })

  expect(currentValue).toBe(0)

  count.dispatch('inc')

  expect(currentValue).toBe(1)
})

it('should not emmit changes on other dispatches', function () {
  var connect = connectFactory()
  var spyCb = jest.fn()

  var foo = connect('foo')

  foo.subscribe(spyCb)

  foo.dispatch('inc')

  expect(spyCb).toBeCalledWith('baz')
  expect(spyCb).toBeCalledTimes(1)
})

it('shoud to be unsubscribed', function () {
  var connect = connectFactory()

  var currentValue
  var count = connect('count')

  var unsubscribe = count.subscribe(function (value) {
    currentValue = value
  })

  expect(currentValue).toBe(0)

  count.dispatch('inc')

  expect(currentValue).toBe(1)

  unsubscribe()

  count.dispatch('inc')

  expect(currentValue).toBe(1)
})
