import { Elysia } from 'elysia';
import { opentelemetry } from '@elysiajs/opentelemetry'
import { swagger } from '@elysiajs/swagger'

import { film } from './routes/film'
import { user } from './routes/user'

// Load environment variables from .env file

const app = new Elysia()
    .use(opentelemetry())
    .use(swagger())
    .onError(({ error, code }) => {
        if (code === 'NOT_FOUND')
            return
        'Not found'
        console.error(error)
    })
    .use(user)
    .use(film)

    .listen(3000)
console.log(
    `Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)