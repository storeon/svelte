import createStore from 'storeon'

import { todos } from './todos'
import { filters, filterRoutes } from './filters'

export const store = createStore([todos, filters, filterRoutes])
