import { Router } from 'express'

import {AuthRouter} from './Auth.routes.js'
import {kidRouter} from './Kid.routes.js'

const Routers = Router()

Routers.use('/auth', AuthRouter)
Routers.use('/kid', kidRouter)

export { Routers}

