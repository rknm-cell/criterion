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

export const film = new Elysia()
    .decorate('film', new Film())
    .get('/film', ({ film }) => film.data)
    .put('/film', ({ film, body: { data } }) => film.add(data), {
        body: t.Object({
            data: t.String()
        })
    })
    .get(
        '/film/:index',
        ({ film, params: { index }, error }) => {
            return film.data[index] ?? error(404, 'Not found')
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .delete(
        '/film/:index',
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
        },
        {
            params: t.Object({
                index: t.Number()
            })
        }
    )
    .patch(
        '/film/:index',
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
            params: t.Object({
                index: t.Number()
            }),
            body: t.Object({
                data: t.String()
            })
        }
    )