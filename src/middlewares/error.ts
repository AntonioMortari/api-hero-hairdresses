import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';


const errorMiddleware = (
    error: Error & Partial<AppError>,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction
) => {

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal Server Error';

    return res.status(statusCode).json({
        errors: {
            status: statusCode,
            message
        }
    });

};

export { errorMiddleware };