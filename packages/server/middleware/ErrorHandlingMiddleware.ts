import { ApiError } from '../error/ApiError';
import type { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  err: { status: number; message: string },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.status(500).json({ message: 'Непредвиденная ошибка' });
  }
};
