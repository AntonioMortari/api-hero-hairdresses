import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../config';
import { AppError } from '../errors/AppError';

interface IJwtData {
    sub: string;
}

const sign = (data: IJwtData): string => {
    if (!JWT_SECRET) {
        throw new AppError('JWT Secret is missing', 500);
    }

    const token = jwt.sign(data, JWT_SECRET, {
        expiresIn: '24h',
    });

    return token;
};

const verify = (token: string) => {
    if (!JWT_SECRET) {
        throw new AppError('JWT Secret is missing', 500);
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if(typeof decoded.sub == 'string'){
            return decoded.sub;
        }

        throw new AppError('Invalid or expired token', 401);
    } catch (error) {
        throw new AppError('Invalid or expired token', 401);
    }
};

export { sign, verify };