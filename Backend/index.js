import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./router/user.router.js";
import ProductRouter from "./router/Product.route.js"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
dotenv.config();
app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

const port = process.env.PORT || 4000;
const mongodb_uri = process.env.MONGODB_URI;


try {
  mongoose.connect(mongodb_uri);
  console.log("Connect to mongodb");
} catch (error) {
  console.log(error);
}

app.use(cookieParser());
app.use("/Product",ProductRouter)
app.use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
