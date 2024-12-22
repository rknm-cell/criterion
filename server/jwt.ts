import jwt, { JwtPayload } from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import { User } from './types';

declare module 'express-serve-static-core' {
    interface Request {
        user?: { id: string; email: string };
    }
}

export const generateToken = (user: User): string => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRATION }
    );
};

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.status(401).json({ message: 'Token not provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = { id: decoded.id, email: decoded.email }; // Attach user to the request
        next();
    } catch (err) {
        res.status(403).json({ message: 'Token is invalid or expired' });
    }
};
