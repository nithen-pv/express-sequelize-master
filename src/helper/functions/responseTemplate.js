const RESPONSE_CODES = {
  REQUEST_OK: 200,
  BAD_REQUEST: 400,
  SERVER_ERROR: 500,
  UN_AUTHORIZED: 401,
  NOT_FOUND: 404,
};

const ERROR_MESSAGES = {
  AUTH_FAILURE: "Authentication Failed",
  SERVER_ERROR: "Server failed to process your request",
  DATA_NOT_FOUND: "Not Found",
};

export const responseTemplate = {
  successTemplate(message) {
    return {
      status: RESPONSE_CODES.REQUEST_OK,
      message: message,
    };
  },
  serverErrorTemplate() {
    return this.errorTemplate(RESPONSE_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR);
  },
  badRequestTemplate(error) {
    return this.errorTemplate(RESPONSE_CODES.BAD_REQUEST, error);
  },
  unAuthorizedRequestTemplate() {
    return this.errorTemplate(RESPONSE_CODES.UN_AUTHORIZED, ERROR_MESSAGES.AUTH_FAILURE);
  },
  dataNotFoundTemplate(what) {
    return this.errorTemplate(
      RESPONSE_CODES.NOT_FOUND,
      `${what} ${ERROR_MESSAGES.DATA_NOT_FOUND}`,
    );
  },
  errorTemplate(code, error) {
    return {
      status: code,
      error,
    };
  },
  dataTemplate(data, metadata) {
    return {
      status: RESPONSE_CODES.REQUEST_OK,
      data,
      metadata,
    };
  },
};
