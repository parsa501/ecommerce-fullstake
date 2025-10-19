import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, getOne, update,remove } from '../Controllers/ProductVariantCn.js'
const productVariantRouter = express.Router()

productVariantRouter.route('/').post(isAdmin,create).get(getAll)
productVariantRouter.route('/:id').get(getOne).patch(isAdmin,update).delete(isAdmin,remove)

export default productVariantRouter