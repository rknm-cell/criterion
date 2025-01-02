import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import { swagger } from '@elysiajs/swagger';
import { auth } from '~modules/auth';
import films from '~modules/films';



const app = new Elysia();
app
    .use(swagger())

    .group('/api', (app) =>
        app
            .use(
                jwt({
                    name: 'jwt',
                    secret: process.env.JWT_SECRET! || 'fake_secret'
                }),

            )
            .use(cookie())
            .use(auth)
            .use(films)
    )
    .listen(process.env.PORT || 3049);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);