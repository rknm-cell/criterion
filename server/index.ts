import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import { auth } from './modules/auth';



import filmRoutes from './routes/films';

const app = new Elysia();

app
    .group('/api', (app) =>
        app
            .use(
                jwt({
                    name: 'jwt',
                    secret: process.env.JWT_SECRET!,
                }),

            )
            .use(filmRoutes)
            .use(cookie())
            .use(auth)
    )
    .listen(process.env.PORT || 3049);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);