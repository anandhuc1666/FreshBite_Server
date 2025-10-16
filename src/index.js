import express from "express";
import mongoose from "mongoose";
import userAuthRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import manageErr from "./middlewares/manageError.js";
import usercart from "./routes/cartRoutes.js"
dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/auth", userAuthRoutes);
app.use("/user", userRoutes);
app.use("/add",usercart)
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB connected"))
  .catch((e) => console.log("error :", e));
app.use(manageErr);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is on Running ${PORT}`);
});
