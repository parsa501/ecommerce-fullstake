import express from "express";
import { Search } from "../Controllers/SearchCn.js";

const searchrouter = express.Router();

searchrouter.post("/", Search);

export default searchrouter;
