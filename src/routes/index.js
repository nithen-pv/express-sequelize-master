import express from "express";
import getMathRoutes from "./admin/router";

function getRoutes() {
  const router = express.Router();

  router.use("/admins", getMathRoutes());

  return router;
}

export default getRoutes;
