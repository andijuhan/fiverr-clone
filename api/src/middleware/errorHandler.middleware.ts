import express, { NextFunction } from 'express';
import { isHttpError } from 'http-errors';
import { ErrorRequestHandler } from 'express';

const errorHandle: ErrorRequestHandler = (
   error: unknown,
   req: express.Request,
   res: express.Response,
   next: NextFunction
) => {
   console.log(error);
   let errorMessage = 'An unknown error occured';
   let statusCode = 500;
   if (isHttpError(error)) {
      statusCode = error.status;
      errorMessage = error.message;
   }
   res.status(statusCode).json({ message: errorMessage });
};

export default errorHandle;
