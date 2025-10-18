
import express from "express";
import isAdmin from "../Middlewares/IsAdmin.js";
import { create, getAll, getOne, remove, update } from "../Controllers/BannerCn.js";

const bannerRouter = express.Router();

bannerRouter.route("/").post(isAdmin, create).get(getAll);
bannerRouter.route("/:id").get(isAdmin, getOne).patch(isAdmin, update).delete(isAdmin, remove);

export default bannerRouter;
