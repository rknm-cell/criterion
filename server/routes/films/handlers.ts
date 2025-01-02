import { NotFoundError } from "elysia";
import {prisma} from "~libs/prisma";

export async function getFilms() {
    try {
        return await prisma.film.findMany({ orderBy: { createdAt: 'asc' } });
    } catch (e: unknown) {
        console.error(`Error getting films: ${e}`);
    }
}

export async function getFilm(id: number) {
    try {
        const film = await prisma.film.findUnique({ where: { id } });
        if (!film) {
            throw new NotFoundError('Film not found');
        }
        return film;
    } catch (e: unknown) {
        console.error(`Error getting film: ${e}`);
    }

}

export async function createFilm(options: { title: string, director: string, year: number, description: string, img: string }) {
    try {
        const { title, director, year, description, img } = options;
        return await prisma.film.create({ data: { title, director, year, description, img } });
    } catch (e: unknown) {
        console.error(`Error creating film: ${e}`);
    }
}

export async function updateFilm(id: number, options: { year?: number, description?: string, img?: string, title?: string, director?: string }) {
    try {
        const { title, director, year, description, img } = options;
        return await prisma.film.update({
            where: { id }, data: {
                ...(title ? { title } : {}),
                ...(director ? { director } : {}),
                ...(year ? { year } : {}),
                ...(description ? { description } : {}),
                ...(img ? { img } : {})
            }
        });
    } catch (e: unknown) {
        console.error(`Error updating film: ${e}`);
    }
}

export async function deleteFilm(options: { id: number }) {
    try {
        const { id } = options;

        return await prisma.film.delete({
            where: { id }
        });
    } catch (e: unknown) {
        console.error(`Error deleting film: ${e}`);
    }
}