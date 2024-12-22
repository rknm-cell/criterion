import { Elysia } from 'elysia';
import filmRoutes from './routes/films';

const app = new Elysia()


app
    .group('/api', (app) => app.use(filmRoutes))
    .listen(process.env.PORT || 3049);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);