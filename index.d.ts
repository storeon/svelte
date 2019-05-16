import { Dispatch } from "storeon";

declare function createSvelteStore<T>(
  modules: any[]
): (key: string) => [Dispatch, any];

export { createSvelteStore };
