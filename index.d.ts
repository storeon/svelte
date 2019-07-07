import { Module, Dispatch, StoreonEvents } from 'storeon';

interface Changes<State, K extends keyof State, EventsDataTypesMap> {
  dispatch: Dispatch<EventsDataTypesMap>;
  subscribe: (run: (state: State[K]) => void) => () => void;
}

export declare function createSvelteStore<State, EventsDataTypesMap extends StoreonEvents<State> = any>(modules: Module<State>[]): <K extends keyof State>(key: K) => Changes<State, K, EventsDataTypesMap>;

export { Module, Dispatch, Store, StoreonEvents } from 'storeon';