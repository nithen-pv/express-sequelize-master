class ResponseObject {
  constructor() {
    this.status = null;
    this.statusCode = null;
    this.type = null;
    this.error = null;
    this.data = null;
  }
}

export default class ApiError extends ResponseObject {
  constructor(err, code = 400, type = "FAIL") {
    super();
    this.status = "FAILURE";
    this.statusCode = code;
    this.type = type;
    this.error = err;
  }
}
