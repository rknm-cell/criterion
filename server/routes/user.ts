import { Elysia, t } from 'elysia'
import {userService} from '../util/userService'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const user = new Elysia({ prefix: '/auth' })
    .state({
        user: {} as Record<string, string>,
        session: {} as Record<number, string>
    })
    .use(userService)
    .put(
        '/register',
        // async ({ body }) => db.user.create({
        //     data: body
        // }),
        async ({ body: { email, password }, store, error }) => {
            if (!email || !password) {
                return error(400, {
                    success: false,
                    message: 'Email and password are required'
                });
            }

            if (password.length < 8) {
                return error(400, {
                    success: false,
                    message: 'Password must be at least 8 characters long'
                });
            }

            if (store.user[email]) {
                return error(400, {
                    success: false,
                    message: 'Email in use'
                });
            }

            store.user[email] = await Bun.password.hash(password);

            return {
                success: true,
                message: 'User created'
            };
        },

        // {
        //     body: 'signIn'
        // }
        {
            body: t.Object({
                email: t.String(),
                password: t.String({
                    minLength: 8
                })
            })
        }
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
            cookie: 'session',
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