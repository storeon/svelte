let { getContext, setContext } = require('svelte')
let { createStoreon } = require('storeon')

let { getStore, setStore } = require('..')

jest.mock('svelte')

function setupStore () {
  function counter (store) {
    store.on('@init', () => {
      return { count: 0, foo: 'baz' }
    })
    store.on('inc', state => {
      return { count: state.count + 1 }
    })
  }

  return createStoreon([counter])
}

function setupContextStore () {
  getContext.mockImplementationOnce(() => setupStore())
}

beforeEach(() => {
  setupContextStore()
})

afterEach(() => {
  setContext.mockReset()
  getContext.mockReset()
})

it('set store to svelte context', () => {
  let store = setupStore()
  setContext.mockImplementationOnce(() => {})
  setStore(store)

  expect(setContext).toHaveBeenCalledWith(expect.anything(), store)
  expect(setContext).toHaveBeenCalledTimes(1)
})

it('get store from svelte context', () => {
  let store = getStore()

  expect(store).toBeDefined()
  expect(store.dispatch).toBeDefined()
})

it('get error if store context not provided', () => {
  getContext.mockRestore()

  expect(() => getStore()).toThrow(Error)
})

it('should start with init value', () => {
  let { count } = getStore('count')

  count.subscribe(value => expect(value).toBe(0))
})

it('should be reactive', () => {
  let currentValue
  let { count, dispatch } = getStore('count')

  count.subscribe(value => { currentValue = value })

  expect(currentValue).toBe(0)

  dispatch('inc')

  expect(currentValue).toBe(1)
})

it('should not emit changes on other dispatches', () => {
  let fooSpyCb = jest.fn()
  let countSpyCb = jest.fn()

  let { foo, count, dispatch } = getStore('foo', 'count')

  foo.subscribe(fooSpyCb)
  count.subscribe(countSpyCb)

  expect(fooSpyCb).toHaveBeenCalledWith('baz')
  expect(fooSpyCb).toHaveBeenCalledTimes(1)
  expect(countSpyCb).toHaveBeenCalledWith(0)
  expect(countSpyCb).toHaveBeenCalledTimes(1)

  countSpyCb.mockReset()
  dispatch('inc')

  expect(countSpyCb).toHaveBeenCalledWith(1)
  expect(countSpyCb).toHaveBeenCalledTimes(1)
})

it('shoud to be unsubscribed', () => {
  let currentValue
  let { count, dispatch } = getStore('count')

  let unsubscribe = count.subscribe(value => { currentValue = value })

  expect(currentValue).toBe(0)

  dispatch('inc')

  expect(currentValue).toBe(1)

  unsubscribe()

  dispatch('inc')

  expect(currentValue).toBe(1)
})
