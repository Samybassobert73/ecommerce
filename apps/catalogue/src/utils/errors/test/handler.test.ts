import { HandleErrorWithLogger } from '../handler';
import { logger } from '../../logger';
import httpMocks from 'node-mocks-http';
import { NotFoundError } from '../error';

jest.mock('../../logger');
let req, res, next;
beforeEach(() => {
  jest.clearAllMocks();
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('handler', () => {
  it('should have a HandleErrorWithLogger function', async () => {
    expect(typeof HandleErrorWithLogger).toBe('function');
  });

  it('should call logger.warn', async () => {
    const error = new NotFoundError();
    await HandleErrorWithLogger(error, req, res, next);
    expect(logger.warn).toHaveBeenCalled();
  });

  it('should call logger.error', async () => {
    const error = new Error();
    await HandleErrorWithLogger(error, req, res, next);
    expect(logger.error).toHaveBeenCalled();
  });

  it('should return in response error status code', async () => {
    const error = new Error();
    await HandleErrorWithLogger(error, req, res, next);
    expect(res.statusCode).toBe(500);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return in response error status code', async () => {
    const error = new NotFoundError();
    await HandleErrorWithLogger(error, req, res, next);
    expect(res.statusCode).toBe(404);
    expect(res._isEndCalled).toBeTruthy();
  });

  it('should return json body error message', async () => {
    const error = new NotFoundError();
    await HandleErrorWithLogger(error, req, res, next);
    expect(res._getJSONData()).toStrictEqual('not found');
  });
});
