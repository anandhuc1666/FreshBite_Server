import express from "express"
import verifyUser from "../middlewares/auth.js";
import trycatch from "../middlewares/tryCatch.js";
import { addFav,favDelt,getFav } from "../controllers/user/addFav.js";

const routes = express.Router()
routes
.post("/favAdd/:productId",verifyUser,trycatch(addFav))
.get("/favAdd",verifyUser,trycatch(getFav))
.delete("/favdelt/:productId",verifyUser,trycatch(favDelt))
export default routes