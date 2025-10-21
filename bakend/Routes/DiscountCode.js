import { Router } from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import {
  checkDiscountCode,
  create,
  getAll,
  getOne,
  remove,
  update,
} from "../Controllers/DiscountCodeCn.js";
import isLogin from "../Middlewares/IsLogin.js";
const discountRouter = Router();
discountRouter.route("/").post(isAdmin, create).get(isAdmin, getAll);
discountRouter
  .route("/:id")
  .get(isAdmin, getOne)
  .patch(isAdmin, update)
  .delete(isAdmin, remove);
discountRouter.route("/check").post(isLogin, checkDiscountCode);

export default discountRouter;