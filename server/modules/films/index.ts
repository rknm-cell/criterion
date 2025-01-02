import Elysia, {t} from "elysia";
import {isAuthenticated} from "~middlewares/auth"
import {prisma} from "~libs/prisma"

const films = (app: Elysia) =>
    app.group("/films", (app) => 
        app
            .get("/", async () => {
                const films = await prisma.film.findMany();
                return {
                    success: true,
                    message: "Fetch films",
                    data: {
                        films,
                    },
                };

            })
            .get("/:id", async ({ params }) => {
                const { id } = params;
                const film = await prisma.film.findUnique({
                    where: {id: Number(id)},
                });
                if (!film) {
                    return {
                        success: false,
                        message: "Film not found",
                        data: null,
                    };
                }
                return {
                    success: true,
                    message: "Fetch film by ID",
                    data: {
                        film,
                    },
                };
            })
            .use(isAuthenticated)
            .post(
                "/",
            async({ body }) => {
                const film = await prisma.film.create({
                    data: {
                        
                        ...body,
                    },
                });
                return {
                    success: true,
                    message: "Film created",
                    data: {
                        film,
                    },
                };
            },
            {
                body: t.Object({
                    title: t.String(),
                    director: t.String(),
                    description: t.String(),
                    year: t.Integer(),
                    img: t.String(),

                }),
            }
            
                
            
        )
    )
    export default films;
    