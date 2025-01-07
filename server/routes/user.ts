import { Elysia, t } from 'elysia'
import {userService} from '../util/userService'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const user = new Elysia({ prefix: '/auth' })
    .use(userService)
    .model({
        'user.sign': t.Object({
            email: t.String(),
            password: t.String({
                minLength: 8
            })
        })
    })
    .onTransform(function log({ body, params, path, request: { method } }) {
        console.log(`${method} ${path}`, {
            body,
            params
        })
    })
    .post(
        '/register',
        async ({ body }) => db.user.create({
            data: body
        }),
        {
            error({ code }){
                switch (code) {
                    case 'P2002':
                        return {
                            error: 'Email must be unique'
                        }
                }
            },
            body: 'user.sign',
        },
    )
    .post(
        '/login',
        async ({
            store: { user, session },
            error,
            body: { email, password },
            cookie: { token }
        }) => {
            if (
                !user[email] ||
                !(await Bun.password.verify(password, user[email]))
            )
                return error(400, {
                    success: false,
                    message: 'Invalid email or password'
                })

            const key = crypto.getRandomValues(new Uint32Array(1))[0]
            session[key] = email
            token.value = key

            return {
                success: true,
                message: `Signed in as ${email}`
            }
        },

        {
            body: 'signIn',
            cookie: 'optionalSession',
        }
    )
    .get(
        '/logout',
        ({ cookie: { token } }) => {
            token.remove()

            return {
                success: true,
                message: 'Logged out'
            }
        },
        {
            cookie: 'optionalSession'
        }
    )
    .get(
        '/profile',
        ({ cookie: { token }, store: { session }, error }) => {
            const email = session[token.value]

            
            return {
                success: true,
                email
            }
        },
        {
            isSignIn: true,
            cookie: 'session'
        }

    )