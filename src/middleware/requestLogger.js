import logger from "helper/logger";

/**
 * @param {import("express").Request} req
 */
function requestLogger(req, res, next) {
  logger.info(`[${req.method}] ${req.originalUrl}`);
  next();
}

export default requestLogger;
