import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import "express-async-errors"; // lets thrown errors bubble to error middleware
import routes from "./routes";
import {ProductRouter} from "./modules/product/product.route";
import { errorHandler } from "./middleware/errorHandler";
import dotenv from "dotenv";
import { OrderRoutes } from "./modules/orders/orders.route";
import { UserRoutes } from "./modules/users/user.route";
dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// all routes under /api
app.use("/api", routes);

// product routes
app.use("/api/products", ProductRouter);


//order routes 
app.use("/api/orders", OrderRoutes);


app.use("/api/users", UserRoutes);
// global error handler
app.use(errorHandler);

export default app;
