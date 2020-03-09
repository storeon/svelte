import { createStoreon } from 'storeon'

import { todos } from './todos'
import { filters, filterRoutes } from './filters'

export const store = createStoreon([todos, filters, filterRoutes])
