import { Elysia, t } from 'elysia'

export const userService = new Elysia({ name: 'user/service' })
    .state({
        user: {} as Record<string, string>,
        session: {} as Record<number, string>
    })
    .model({
        signIn: t.Object({
            email: t.String({ minLength: 1 }),
            password: t.String({ minLength: 8 })
        }),
        session: t.Cookie(
            {
                token: t.Number()
            },
            {
                secrets: process.env.JWT_SECRET
            }
        ),
        optionalSession: t.Optional(t.Ref('session'))
    })
    .macro({
        isSignIn(enabled: boolean) {
            if (!enabled) return

            return {
                beforeHandle({ error, cookie: { token }, store: { session } }) {
                    if (!token.value)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })
                    const email = session[token.value as unknown as number]

                    if (!email)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                    })
                }
            }
        }
    })

export const getUserId = new Elysia()
    .use(userService)
    .guard({
        isSignIn: true,
        cookie: 'session'
    })
    .resolve(
        ({ store: {session}, cookie: {token} }) => ({
        email: session[token.value]
    }))
    .as('plugin')

