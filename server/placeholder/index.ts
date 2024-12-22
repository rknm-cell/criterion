import { serve } from "bun";
import jwt from "jsonwebtoken";
import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import films from "./database";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = 3055;

console.log("films:", films)


function handleAllFilms() {
    return new Response(
        JSON.stringify(films), {
        headers: { "Content-Type": "application/json" }
    }
    )
}

function handleFilmsById(id: number) {
    const film = films.find((film) => film.id === id);

    if (!film) {
        return new Response("Film not found", { status: 404 });
    } else {
        return new Response(
            JSON.stringify(film), {
            headers: { "Content-Type": "application/json" }
        }
        )
    }
};

function handleCreateFilm(title: string, description: string, picture: string) {
    const newFilm = {
        id: films.length + 1,
        title,
        description,
        picture,
    };

    films.push(newFilm);

    return new Response(
        JSON.stringify(newFilm), {
        headers: { "Content-Type": "application/json" },
        status: 201,
    });

};

function HandleUpdateFilm(id: number, title: string, description: string, picture: string) {
    const filmIndex = films.findIndex((film) => film.id === id);

    if (filmIndex === -1) {
        return new Response("Film not found", { status: 404 });
    }

    films[filmIndex] = {
        ...films[filmIndex],
        title,
        description,
        picture,
    };
    return new Response("Post updated", { status: 200 });
}

function handleDeleteFilm(id: number) {
    const filmIndex = films.findIndex((film) => film.id === id);

    if (filmIndex === -1) {
        return new Response("Film not found", { status: 404 });
    }

    films.splice(filmIndex, 1);
    return new Response("Post deleted", { status: 200 });
}
serve({

    port: PORT,
    async fetch(req) {
        const { method } = req;
        const { pathname } = new URL(req.url);
        const pathRegexForID = /\/api\/films\/(\d+)/;

        if (method === 'GET') {
            const match = pathname.match(pathRegexForID);
            const id = match && match?.[1];

            if (id) {
                const filmId = Number(id)
                return handleFilmsById(filmId);
            }
        }

        if (method === 'GET' && pathname === '/api/films') {
            return handleAllFilms();

        }
        if (method === 'POST' && pathname === '/api/films') {
            const newFilm = await req.json();
            return handleCreateFilm(newFilm.title, newFilm.description, newFilm.picture);

        }
        if (method === 'PATCH' && pathname === '/api/films') {
            const match = pathname.match(pathRegexForID);
            const id = match && match?.[1];

            if (id) {
                const filmId = Number(id)
                const editedFilm = await req.json();
                return HandleUpdateFilm(filmId, editedFilm.title, editedFilm.description, editedFilm.picture);

            }

        }
        if (method === 'DELETE' && pathname === '/api/films') {
            const {id} = await req.json();
            return handleDeleteFilm(id);
           
        }

        return new Response('Not Found', { status: 404 });

        if (method === 'LOGIN')
    }
}, console.log("Server started"));

console.log(`Listening on http://localhost:${PORT}`);