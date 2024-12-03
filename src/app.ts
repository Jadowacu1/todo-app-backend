import routes from "./routes";
import "./database/config/connection";
import express, { Express } from "express";
import cors from "cors";

const PORT: Number = 3000;
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/api", routes);
app.listen(PORT, () => console.log(`Server listening at ${PORT}`));

export default app;
