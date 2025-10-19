import express from 'express'
import isAdmin from '../Middlewares/IsAdmin.js'
import { create, getAll, remove } from '../Controllers/SliderCn.js'
const sliderRouter = express.Router()

sliderRouter.route('/').post(isAdmin,create).get(getAll)
sliderRouter.route('/:id').delete(isAdmin,remove)

export default sliderRouter