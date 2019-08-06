let createSvelteStore = require('.').createSvelteStore

function connectFactory () {
  function counter (store) {
    store.on('@init', () => {
      return { count: 0, foo: 'baz' }
    })
    store.on('inc', state => {
      return { count: state.count + 1 }
    })
  }

  return createSvelteStore([counter])
}

it('should start with init value', () => {
  let connect = connectFactory()

  let count = connect('count')

  count.subscribe(value => expect(value).toBe(0))
})

it('should be reactive', () => {
  let connect = connectFactory()

  let currentValue
  let count = connect('count')

  count.subscribe(value => currentValue = value)

  expect(currentValue).toBe(0)

  count.dispatch('inc')

  expect(currentValue).toBe(1)
})

it('should not emmit changes on other dispatches', () => {
  let connect = connectFactory()
  let spyCb = jest.fn()

  let foo = connect('foo')

  foo.subscribe(spyCb)

  foo.dispatch('inc')

  expect(spyCb).toBeCalledWith('baz')
  expect(spyCb).toBeCalledTimes(1)
})

it('shoud to be unsubscribed', () => {
  let connect = connectFactory()

  let currentValue
  let count = connect('count')

  let unsubscribe = count.subscribe(value => currentValue = value)

  expect(currentValue).toBe(0)

  count.dispatch('inc')

  expect(currentValue).toBe(1)

  unsubscribe()

  count.dispatch('inc')

  expect(currentValue).toBe(1)
})
