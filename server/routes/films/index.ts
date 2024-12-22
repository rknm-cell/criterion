import { Elysia, t } from 'elysia';
import {
    createFilm,
    deleteFilm,
    getFilm,
    getFilms,
    updateFilm
} from './handlers';

const filmRoutes = new Elysia({ prefix: '/films' })
    .get('/', () => getFilms())
    .get('/:id', ({ params: { id } }) => getFilm(id), {
        params: t.Object({
            id: t.Numeric(),
        })
    })
    .post('/', ({ body }) => createFilm(body), {
        body: t.Object({
            title: t.String({
                required: true,
            }),
            director: t.String({
                required: true,
            }),
            year: t.Number({
                required: true,
            }),
            description: t.String({
                required: true,
                minLength: 3,
                maxLength: 180,
            }),
            img: t.String({
                required: true,
            }),
        })
    })
    .patch('/:id', ({ params: { id }, body }) => updateFilm(id, body), {
        params: t.Object({
            id: t.Numeric(),
        }),
        body: t.Object({
            title: t.Optional(t.String({
                minLength: 1,
                maxLength: 50,
            })),
            director: t.Optional(t.String({
                minLength: 1,
                maxLength: 50,
            })),
            year: t.Optional(t.Number()),
            description: t.Optional(t.String({
                minLength: 3,
                maxLength: 180
            })),
                img: t.Optional(t.String())
            }, { minProperties: 1 })
        })
    .delete('/', ({ body }) => deleteFilm(body), {
        body: t.Object({    
            id: t.Numeric(),
        })
    })

export default filmRoutes;