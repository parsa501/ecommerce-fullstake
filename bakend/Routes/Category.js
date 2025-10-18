import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, getOne, remove, update } from '../Controllers/CategoryCn.js'
const categoryRouter = express.Router()

categoryRouter.route('/').post(isAdmin,create).get(getAll)
categoryRouter.route('/:id').get(getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default categoryRouter