import { Request, Response } from "express";
import { routes } from "./src/routes";
import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
app.use(express.json());

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("server is working");
});

app.listen(port, () => console.log("server is working"));
