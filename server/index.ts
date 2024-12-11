import { serve } from "bun";

const PORT = 3055;


interface Film {
    id: number;
    title: string;
    description: string;
    picture: string;
}

let films: Film[] = [];

function handleAllFilms() {
    return new Response(
        JSON.stringify(films), {
        headers: { "Content-Type": "application/json" }
    }
    )
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
                return new Response('Film', { status: 200 });
            }
        }

        if (method === 'GET' && pathname === '/api/films') {

        }
        if (method === 'POST' && pathname === '/api/films') {

        }
        if (method === 'PATCH' && pathname === '/api/films') {
            const match = pathname.match(pathRegexForID);
            const id = match && match?.[1];

            if (id) {
                return new Response('Film', { status: 200 });
            }

        }

        return new Response('Not Found', { status: 404 });
    }
});

console.log(`Listening on http://localhost:${PORT}`);