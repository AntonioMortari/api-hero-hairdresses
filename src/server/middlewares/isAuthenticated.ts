import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppError';

import * as jwtService from '../services/jwtService';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new AppError('Token is missing', 401);
    }

    const [bearer, token] = authHeader.split(' ');

    if(bearer != 'Bearer'){
        throw new AppError('Bearer token is required', 401);
    }

    const decoded = jwtService.verify(token);

    req.user_id = decoded;

    next();
};

export { isAuthenticated};