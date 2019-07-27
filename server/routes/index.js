import express from 'express'

import initItem from './items'
import initOrder from './orders'

const router = express.Router()
initItem(router)
initOrder(router)

export default router
