import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, getOne, update,favProduct } from '../Controllers/ProductCn.js'
import isLogin from '../Middlewares/IsLogin.js'
const productRouter = express.Router()

productRouter.route('/').post(isAdmin,create).get(getAll)
productRouter.route('/:id').get(getOne).patch(isAdmin,update)
productRouter.route('/favorite/:id').post(isLogin,favProduct)

export default productRouter