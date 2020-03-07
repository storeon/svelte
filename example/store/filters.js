import { SHOW_ALL } from '../constants/TodoFilters'

export const filters = store => {
  store.on('@init', () => ({ filter: SHOW_ALL }))
  store.on('filter/set', (_, filter) => ({ filter }))
}
