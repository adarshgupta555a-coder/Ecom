import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import userRoutes from "./routes/user.route.js";
import errorHandler from "./middlewares/error.middleware.js";


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/v1/users", userRoutes);

app.use("/", (error: Error, req: Request, res: Response, next: NextFunction) => errorHandler(error, req, res, next));

app.listen(4000, () => {
    console.log("port running on 4000")
});