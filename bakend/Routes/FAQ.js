import express from 'express';
import { create, getAll, getOne, remove, update } from '../Controllers/CategoryCn.js';

const faqRouter = express.Router();

faqRouter.route('/').post( create).get(getAll);
faqRouter.route('/:id').get(getOne).patch(update).delete( remove);

export default faqRouter;
