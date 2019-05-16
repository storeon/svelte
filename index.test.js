var createSvelteStore = require('.').createSvelteStore;

function connectFactory() {
  function counter(store) {
    store.on('@init', function() {
      return { count: 0, foo: 'baz' };
    });
    store.on('inc', function(state) {
      return { count: state.count + 1 };
    });
  }

  return createSvelteStore([counter]);
}

it('should start with init value', function() {
  var connect = connectFactory();

  var count = connect('count')[1];

  count.subscribe(function(value) {
    return expect(value).toBe(0);
  });
});

it('should be reactive', function() {
  var connect = connectFactory();

  var currentValue;
  var connection = connect('count');
  var dispatch = connection[0];
  var count = connection[1];

  count.subscribe(function(value) {
    currentValue = value;
  });

  expect(currentValue).toBe(0);

  dispatch('inc');

  expect(currentValue).toBe(1);
});

it('should not emmit changes on other dispatches', function() {
  var connect = connectFactory();
  var spyCb = jest.fn();

  var connection = connect('foo');
  var dispatch = connection[0];
  var foo = connection[1];

  foo.subscribe(spyCb);

  dispatch('inc');

  expect(spyCb).toBeCalledWith('baz');
  expect(spyCb).toBeCalledTimes(1);
});

it('shoud to be unsubscribed', function() {
  var connect = connectFactory();

  var currentValue;
  var connection = connect('count');
  var dispatch = connection[0];
  var count = connection[1];

  var unsubscribe = count.subscribe(function(value) {
    currentValue = value;
  });

  expect(currentValue).toBe(0);

  dispatch('inc');

  expect(currentValue).toBe(1);

  unsubscribe();
  unsubscribe();
  dispatch('inc');

  expect(currentValue).toBe(1);
});
