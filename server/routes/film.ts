import { Elysia, t } from 'elysia';

class Film {
    constructor(public data: string[] = ['Moonhalo']) { }

    add(film: string) {
        this.data.push(film)

        return this.data
    }

    remove(index: number) {
        return this.data.splice(index, 1)
    }

    update(index: number, film: string) {
        return (this.data[index] = film)
    }
}

export const film = new Elysia({ prefix: '/film'})
    .decorate('film', new Film())
    .onTransform(function log({ body, params, path, request: {method} }) {
        console.log(`${method} ${path}`, {
            body,
            params
        })
    })
    .get('/', ({ film }) => film.data)
    .put('/', ({ film, body: { data } }) => film.add(data), {
        body: t.Object({
            data: t.String()
        })
    })
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
            error
        }: {
            film: Film;
            params: { index: number };
            body: { data: string };
            error: (status: number) => any
        }) => {

            if (index in film.data) return film.update(index, data)

            return error(422)
        },
        {
            body: t.Object({
                data: t.String()
            })
        }
    )