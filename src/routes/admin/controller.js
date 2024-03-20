import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import logger from "helper/logger";
import ApiError from "helper/functions/ApiError";
import db from "database";

/** @type {import("express").RequestHandler} */
export async function login(req, res) {
  logger.info("login");
  const { email, password } = req.body;

  const admin = await db.admin.findOne({ email });

  if (!admin) {
    throw new ApiError("Invalid email or password", 400);
  }

  const isValid = await bcrypt.compare(password, admin.password);

  if (!isValid) {
    throw new ApiError("Invalid email or password", 400);
  }

  const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET);

  res.json({ token });
}
