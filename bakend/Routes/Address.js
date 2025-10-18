import express from 'express'
import { create, getAll, getOne, remove, update } from '../Controllers/AddressCn.js'
const addressRouter = express.Router()
addressRouter.route('/').post(create).get(getAll)
addressRouter.route('/:id').get(getOne).patch(update).delete(remove)
export default addressRouter