import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import "express-async-errors";

import logger from "helper/logger";
import getRoutes from "routes";
import requestLogger from "middleware/requestLogger";
import { sequelizeErrorHandler, standardErrorHandler } from "middleware/error_handlers";
import { setupCloseOnExit } from "helper/functions/serverHandlers";
import { allowed_origins } from "helper/constants/allowed_origins";

async function startServer() {
  const app = express();

  // middleware
  app.use(helmet());
  app.use(cors({ origin: allowed_origins }));
  app.use(compression());
  app.use(express.json());
  app.use(requestLogger);

  // routes
  app.use("", getRoutes());

  // error handler middleware
  app.use(sequelizeErrorHandler, standardErrorHandler);

  const port = process.env.PORT || 5000;

  return new Promise((resolve) => {
    const server = app.listen(port, async () => {
      logger.info(`🚀 [${process.env.NODE_ENV}] Listening on port ${server.address().port}`);

      // this block of code turns `server.close` into a promise API
      const originalClose = server.close.bind(server);
      server.close = () => {
        return new Promise((resolveClose) => {
          originalClose(resolveClose);
        });
      };

      setupCloseOnExit(server); // this ensures that we properly close the server when the program exists
      resolve(server); // resolve the whole promise with the express server
    });
  });
}

export default startServer;
