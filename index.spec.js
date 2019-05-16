const createStore = require('storeon');
const { bindStoreon } = require('.');

function connectFactory() {
  let counter = store => {
    store.on('@init', () => ({ count: 0, foo: 'baz' }));
    store.on('inc', ({ count }) => ({  count: count + 1 }));
  };

  const store = createStore([counter]);

  return bindStoreon(store);
}

it('should start with init value', () => {
   const connect = connectFactory()

   const [_, count] = connect('count');

   count.subscribe((value) => expect(value).toBe(0));
});

it('should be reactive', () => {
  const connect = connectFactory()

  let currentValue;
  const [dispatch, count] = connect('count');

  count.subscribe((value) => currentValue = value);

  expect(currentValue).toBe(0);

  dispatch('inc');

  expect(currentValue).toBe(1);
});

it('should not emmit changes on other dispatches', () => {
  const connect = connectFactory()
  const spyCb = jest.fn();

  const [dispatch, foo] = connect('foo');

  foo.subscribe(spyCb);

  dispatch('inc');

  expect(spyCb).toBeCalledWith('baz');
  expect(spyCb).toBeCalledTimes(1);
});

it('shoud to be unsubscribed', ()=> {
  const connect = connectFactory()

  let currentValue;
  const [dispatch, count] = connect('count');

  const unsubscribe = count.subscribe((value) => currentValue = value);

  expect(currentValue).toBe(0);

  dispatch('inc');

  expect(currentValue).toBe(1);

  unsubscribe();
  unsubscribe();
  dispatch('inc');

  expect(currentValue).toBe(1);
});



