import { Elysia } from 'elysia';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import { swagger } from '@elysiajs/swagger';
import { auth } from '~modules/auth';
import films from '~modules/films';



const app = new Elysia();
app
    .use(swagger())

    .use(
        jwt({
            name: 'jwt',
            secret: process.env.JWT_SECRET! || 'fake_secret'
        }),

    )
    .use(cookie())
    
    .group('/api', (app) =>{
        app.use(auth);
        app.use(films);
        return app
    })
    .listen(process.env.PORT || 3049);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);