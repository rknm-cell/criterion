import { Elysia, t } from 'elysia';
import { opentelemetry } from '@elysiajs/opentelemetry'
import { swagger } from '@elysiajs/swagger'

import { film } from './routes/film'
import { user } from './routes/user'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();
console.log(process.env)

console.log('DATABASE_URL:', process.env.DATABASE_URL)
console.log('JWT_Secret', Bun.env.JWT_SECRET)

const app = new Elysia()
    .use(opentelemetry())
    .use(swagger())
    .onError(({ error, code }) => {
        if (code === 'NOT_FOUND')
            return
        'Not found'
        console.error(error)
    })
    // .use(user)
    .use(user)
    .use(film)

    .listen(3000)
console.log(
    `Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)