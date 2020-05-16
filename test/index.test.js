let { getContext, setContext } = require('svelte')
let { createStoreon } = require('storeon')

let { useStoreon, provideStoreon } = require('..')

jest.mock('svelte')

function setupStore () {
  function counter (store) {
    store.on('@init', () => {
      return { count: 0, foo: 'baz', loading: false }
    })
    store.on('inc', state => {
      return { count: state.count + 1 }
    })
    store.on('toggle', state => {
      return { loading: !state.loading }
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
  provideStoreon(store)

  expect(setContext).toHaveBeenCalledWith(expect.anything(), store)
  expect(setContext).toHaveBeenCalledTimes(1)
})

it('get store from svelte context', () => {
  let store = useStoreon()

  expect(store).toBeDefined()
  expect(store.dispatch).toBeDefined()
})

it('get error if store context not provided', () => {
  getContext.mockRestore()

  expect(() => useStoreon()).toThrow(Error)
})

it('should start with init value', () => {
  let { count } = useStoreon('count')

  count.subscribe(value => expect(value).toBe(0))
})

it('should be reactive', () => {
  let currentValue
  let { count, dispatch } = useStoreon('count')

  count.subscribe(value => { currentValue = value })

  expect(currentValue).toBe(0)

  dispatch('inc')

  expect(currentValue).toBe(1)
})

it('should not emit changes on other dispatches', () => {
  let fooSpyCb = jest.fn()
  let countSpyCb = jest.fn()

  let { foo, count, dispatch } = useStoreon('foo', 'count')

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

it('should to be unsubscribed', () => {
  let currentValue
  let { count, dispatch } = useStoreon('count')

  let unsubscribe = count.subscribe(value => { currentValue = value })

  expect(currentValue).toBe(0)

  dispatch('inc')

  expect(currentValue).toBe(1)

  unsubscribe()

  dispatch('inc')

  expect(currentValue).toBe(1)
})

it('should work with boolean values', () => {
  let currentValue
  let { loading, dispatch } = useStoreon('loading')

  let unsubscribe = loading.subscribe(value => { currentValue = value })

  expect(currentValue).toBe(false)

  dispatch('toggle')

  expect(currentValue).toBe(true)

  dispatch('toggle')

  expect(currentValue).toBe(false)

  unsubscribe()

  dispatch('toggle')

  expect(currentValue).toBe(false)
})
