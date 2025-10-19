import express from "express";
import cors from "cors";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";
import morgan from "morgan";
import { catchError, HandleERROR } from "vanta-api";
import authRouter from "./Routes/Auth.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./Utils/Swagger.js";
import exportValidation from "./Middlewares/ExportValidation.js";
import userRouter from "./Routes/User.js";
import addressRouter from "./Routes/Address.js";
import brandRouter from "./Routes/Brand.js";
import uploadRouter from "./Routes/Upload.js";
import bannerRouter from "./Routes/banner.js";
import categoryRouter from "./Routes/Category.js";
import sliderRouter from "./Routes/Slider.js";
import isAdmin from "./Middlewares/IsAdmin.js";
import variantRouter from "./Routes/Variant.js";
import productVariantRouter from "./Routes/ProductVariant.js";

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use('/upload',express.static("Public/Uploads"));

app.use(exportValidation);
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/address", addressRouter);
app.use('/api/brands', brandRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/banner", bannerRouter);
app.use("/api/category", categoryRouter);
app.use("/api/slider", sliderRouter);
app.use('/api/variants', isAdmin,variantRouter);
app.use('/api/product-variants',productVariantRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use((req, res, next) => {
  return next(new HandleERROR("Not Found", 404));
});
app.use(catchError);
export default app;
