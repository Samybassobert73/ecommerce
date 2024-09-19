import * as jwt from 'jsonwebtoken';

export const jwtValidationMiddleware = (token: string) => {
  console.log(token);
  if (token) {
    return jwt.verify(token?.split(' ')?.[1], 'myprivatekey');
  }
};
