import { Store,Dispatch } from 'storeon';

declare function connect(key: string): [Dispatch, any]

declare function bindStoreon<T>(store: Store<T>): connect;

export { bindStoreon }
