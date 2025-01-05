import { Elysia, t } from 'elysia';
import { PrismaClient } from '@prisma/client'
import {swagger} from '@elysiajs/swagger'

import { film } from './routes/film'
import { user } from './routes/user'

const db = new PrismaClient()

const app = new Elysia()
    .use(swagger())
    .use(user)
    .use(film)
    
    .listen(3000)
console.log(
    `Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)