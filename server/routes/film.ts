import { Elysia, t } from 'elysia';

const userFilm = t.Object({
    data: t.String(),
    user: t.String()
})
type UserFilm = typeof userFilm.static

class Film {
    constructor(
        public data: UserFilm[] = [
            {
                data: 'Moonhalo',
                user: 'saltyaom'
            }
        ]
    ) { }

    add(film: UserFilm) {
        this.data.push(film)

        return this.data
    }

    remove(index: number) {
        return this.data.splice(index, 1)
    }

    update(index: number, film: Partial<UserFilm>) {
        return (this.data[index] = { ...this.data[index], ...film })
    }
}

export const film = new Elysia({ prefix: '/film' })
    .decorate('film', new Film())
    .model({
        userFilm: t.Omit(userFilm, ['user'])
    })
    .onTransform(function log({ body, params, path, request: { method } }) {
        console.log(`${method} ${path}`, {
            body,
            params
        })
    })
    .get('/', ({ film }) => film.data)
    .put('/', ({ film, body: { data }, email }) =>
        film.add({ data, user: email }),
        {
            body: 'memo'
        }
    )
    .guard({
        params: t.Object({
            index: t.Number()
        })
    })
    .get(
        '/:index',
        ({ film, params: { index }, error }) => {
            return film.data[index] ?? error(404, 'Not found')
        }
    )
    .delete(
        '/:index',
        ({
            film,
            params: { index },
            error
        }: {
            film: Film;
            params: { index: number };
            error: (status: number) => any
        }) => {
            if (index in film.data) return film.remove(index)
            return error(422)
        }
    )
    .patch(
        '/:index',
        ({
            film,
            params: { index },
            body: { data },
            error, email
        }) => {

            if (index in film.data) 
                return film.update(index, {data, user: email })

            return error(422)
        },
        {
            body: 'userFilm'
        }
    )