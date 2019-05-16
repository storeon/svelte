import createStore from 'storeon';
import { bindStoreon } from '..';

let counter = store => {
  store.on('@init', () => ({ count: 0 }));
  store.on('inc', ({ count }) => ({  count: count + 1 }));
  store.on('dec', ({ count }) => ({ count: count - 1 }));
};

const store = createStore([counter]);

export const connect = bindStoreon(store);
