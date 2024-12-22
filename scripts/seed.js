import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const filmsToCreate = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    year: 2010,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    img: "imgurl",
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    director: "Frank Darabont",
    year: 1994,
    description:
      "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    img: "imgurl",
  },
  {
    id: 3,
    title: "The Godfather",
    director: "Francis Ford Coppola",
    year: 1972,
    description:
      "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    img: "imgurl",
  },
  {
    id: 4,
    title: "Rushmore",
    director: "Wes Anderson",
    year: 1998,
    description:
      "The extracurricular king of Rushmore Preparatory School is put on academic probation.",
    img: "imgurl",
  },
];

const seed = async (films) => {
  for (let i = 0; i < films.length; i++) {
    const film = films[i];
    console.log("Creating film:", film);
    await client.film.upsert({
      where: { id: film.id },
      update: {
        title: film.title,
        director: film.director,
        year: film.year,
        description: film.description,
        img: film.img,
      },
      create: {
        title: film.title,
        director: film.director,
        year: film.year,
        description: film.description,
        img: film.img,
      },
    });
  }
};

seed(filmsToCreate)
  .then(() => {
    console.log("Created/Updated films successfully.");
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    client.$disconnect();
    console.log("Disconnected Prisma Client, exiting.");
  });
