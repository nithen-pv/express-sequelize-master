import logger from "helper/logger";
import {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
  DatabaseError,
} from "sequelize";
import { responseTemplate } from "helper/functions/responseTemplate";
import ApiError from "helper/functions/ApiError";

function throwError(res, statusCode, message, error) {
  logger.error(message, error);
  logger.error(message, {
    tags: "http",
    additionalInfo: error ?? {},
  });
  return res.status(statusCode).json(responseTemplate.errorTemplate(statusCode, message));
}

// for checking sequelize errors
export function sequelizeErrorHandler(error, req, res, next) {
  if (error instanceof ValidationError) return next(new ApiError(error?.errors[0]?.message));
  if (error instanceof UniqueConstraintError)
    return next(new ApiError(error?.errors[0]?.message));
  if (error instanceof ForeignKeyConstraintError)
    return next(new ApiError(error?.original?.detail));
  if (error instanceof DatabaseError) return next(new ApiError(error.message));

  // transfer to standard error handler
  return next(error);
}

export function standardErrorHandler(error, req, res) {
  // check if response has already been sent
  if (res.headersSent) {
    console.error("[Error] Sent already:", error);
    return;
  }

  // check if error is a multer error
  if (error.code === "LIMIT_FILE_SIZE") {
    return throwError(res, 413, "File size too large");
  }

  // handle standard ApiError
  if (error instanceof ApiError) {
    return throwError(res, error.statusCode, error.error);
  }

  // fail safe
  console.error("[Error] Unhandled:", error);
  return throwError(
    res,
    responseTemplate.serverErrorTemplate().status,
    responseTemplate.serverErrorTemplate().error,
    error,
  );
}
