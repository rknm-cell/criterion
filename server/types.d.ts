// types.d.ts
export interface User {
    id: number;
    email: string;
    password?: string;
}

declare namespace Express {
    export interface Request {
        user?: User; // Extend the Express Request object to include the user property
    }
}
