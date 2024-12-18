import { serve } from "bun";

const PORT = 3055;


interface Film {
    id: number;
    title: string;
    description: string;
    picture: string;
}

let films: Film[] = [
    {
        id: 1,
        title: "The Shawshank Redemption",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        picture: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODU2OTc@._V1_.jpg"
    }

];
console.log(films)

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
        ...film,
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
                return handleFilmsById(id);
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
                const editedFilm = await req.json();

            }

        }

        return new Response('Not Found', { status: 404 });
    }
}, console.log("Server started"));

console.log(`Listening on http://localhost:${PORT}`);