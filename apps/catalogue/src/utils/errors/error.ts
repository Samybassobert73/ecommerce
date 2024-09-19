import { STATUS_CODE } from './status-codes';

class BaseError extends Error {
  public readonly name: string;
  public readonly status: number;
  public readonly nessage: string;
  constructor(name: string, status: number, description: string) {
    super(description);
    this.name = name;
    this.status = status;
    this.message = description;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

//500 Internal Error
export class APIError extends BaseError {
  constructor(description = 'api error') {
    super('api internal server error', STATUS_CODE.INTERNAL_ERROR, description);
  }
}

//400 validation Error
export class ValidationError extends BaseError {
  constructor(description = 'bad request') {
    super('bad request', STATUS_CODE.BAD_REQUEST, description);
  }
}

//403 validation Error
export class AuthorizeError extends BaseError {
  constructor(description = 'acces denied') {
    super('acces denied', STATUS_CODE.UNAUTHORIZED, description);
  }
}

//404 Not Found
export class NotFoundError extends BaseError {
  constructor(description = 'not found') {
    super('not found', STATUS_CODE.NOT_FOUND, description);
  }
}
