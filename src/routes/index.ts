import { Router } from "express";
import { addLink } from "../controllers/addLink";
import { test } from "../controllers/test";
import { resolveLink } from "../controllers/getLink";

export const routes: Router = Router();
// test link
routes.get("/testRoute", test);

// adding a link
routes.post("/add/:alias", addLink);

// redirecting to actual path
routes.get("/:alias", resolveLink);
