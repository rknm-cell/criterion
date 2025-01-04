import { Elysia, t } from 'elysia';
import { PrismaClient } from '@prisma/client'
import {swagger} from '@elysiajs/swagger'

import { film } from './routes/film'

const db = new PrismaClient()

const app = new Elysia()
    .use(swagger())
    .use(film)
    // .post(
    //     '/register',
    //     async ({ body }) => db.user.create({
    //         data: body
    //     }),
    //     {
    //         error({ code }) {
    //             switch (code) {
    //                 case 'P2002':
    //                     return {
    //                         error: 'Username must be unique'
    //                     }
    //             }
    //         },

    //         body: t.Object({
    //             email: t.String(),
    //             password: t.String({
    //                 minLength: 8
    //             })
    //         })
    //     }
    // )
    .listen(3000)
console.log(
    `Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)