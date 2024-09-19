import { NextFunction, Request, Response } from 'express';
import { ValidationError, AuthorizeError, NotFoundError } from './error';
import { logger } from '../logger';
export const HandleErrorWithLogger = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let reportError = true;
  let status = 500;
  let data = error.message;
  let errors = [ValidationError, AuthorizeError, NotFoundError];

  errors.forEach((typeOfError) => {
    if (error instanceof typeOfError) {
      reportError = false;
      status = error.status;
      data = error.message;
    }
  });

  if (reportError) {
    logger.error(error);
  } else {
    logger.warn(error);
  }

  return res.status(status).json(data);
};

export const HandleUnCaughtException = async (error: Error) => {
  logger.error(error);
  process.exit(1);
};
