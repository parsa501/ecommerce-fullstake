import express from "express";
import { report } from "../Controllers/ReportCn.js";

const reportRouter = express.Router();

reportRouter.route("/").get(report);

export default reportRouter;
