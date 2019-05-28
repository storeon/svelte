import { Module, Dispatch } from 'storeon';

interface Changes<State, K extends keyof State> {
    subscribe: (run: (state: State[K]) => void) => () => void;
}

export declare function createSvelteStore<State>(modules: Module<State>[]): <K extends keyof State>(key: K) => [Dispatch, Changes<State, K>];

export { Module, Dispatch, Store } from 'storeon';
