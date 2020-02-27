import { Store, StoreonEvents, Dispatch } from 'storeon';

type Subscribable<State> = {
  [K in keyof State]: { subscribe: (run: (state: State[K]) => void) => () => void; };
}

export declare function setStore(store: Store): void
export declare function getStore<State, EventsMap extends StoreonEvents<State> = any>(...keys: (keyof State)[]): Subscribable<State> & {
  dispatch: Dispatch<EventsMap>
}
