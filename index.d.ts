import { StoreonStore, StoreonDispatch, createStoreon } from 'storeon';

type Subscriber<T> = (value: T) => void;

type Unsubscriber = () => void;

type Subscribable<State> = {
  [K in keyof State]: {
    subscribe: (run: Subscriber<State[K]>) => Unsubscriber;
  };
}

export declare function provideStoreon(store: StoreonStore): void
export declare function useStoreon<State, Events = any>(...keys: (keyof State)[]): Subscribable<State> & {
  dispatch: StoreonDispatch<Events & createStoreon.DispatchableEvents<State>>
}
