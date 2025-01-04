import {Elysia, t} from 'elysia'

export const userService = new Elysia({ name: 'user/service' })
    .state({
        user: {} as Record<string, string>,
        session: {} as Record<number, string>
    })
    .model({
        signIn: t.Object({
            email: t.String({minLength: 1}),
            password: t.String({minLength: 8})
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