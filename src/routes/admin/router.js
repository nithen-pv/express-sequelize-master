import express from "express";
import { login } from "./controller";

function getMathRoutes() {
  const router = express.Router();

  router.post("/login", login);

  return router;
}

export default getMathRoutes;
