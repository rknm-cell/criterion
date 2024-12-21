import { serve } from "bun";
import jwt from "jsonwebtoken";
import express from 'express';
import bodyParser from 'body-parser';
import { generateToken, authenticateJWT } from './jwt';
import { User } from './types';

import bcrypt from 'bcryptjs';

import films from "./database";
import * as dotenv from "dotenv";
import { data } from "autoprefixer";
dotenv.config();
const express = require('express');

const app = express();
const PORT = 3055;


console.log("films:", films)

let users: User[] = [];

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

function handleUpdateFilm(id: number, title: string, description: string, picture: string) {
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
app.use(express.json());

// app.listen(PORT, () => {
//     console.log("Server Listening on PORT:", PORT);
//   });
app.get("/status", (request, response) => {
    const status = {
        "Status": "Running"
    };
    
    response.send(status);
 });

app.post('/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ id: users.length + 1, email, password: hashedPassword });

    res.status(201).json({ message: 'User created successfully' });
});

app.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    const user = users[email];
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    const token = generateToken(email);
    res.json({ token });
  });

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
                return handleUpdateFilm(filmId, editedFilm.title, editedFilm.description, editedFilm.picture);

            }

        }
        if (method === 'DELETE' && pathname === '/api/films') {
            const { id } = await req.json();
            return handleDeleteFilm(id);

        }

        return new Response('Not Found', { status: 404 });

        if (method === ''){

        }
    }
}, console.log("Server started"));

console.log(`Listening on http://localhost:${PORT}`);