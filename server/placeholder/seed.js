const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const films = [
        {
            title: 'Inception',
            year: 2010,
            description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
            img: 'inception.jpg'
        },
        {
            title: 'The Matrix',
            year: 1999,
            description: 'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
            img: 'matrix.jpg'
        },
        {
            title: 'Interstellar',
            year: 2014,
            description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival.',
            img: 'interstellar.jpg'
        }
    ];

    for (const film of films) {
        await prisma.film.create({
            data: film
        });
    }

    console.log('Seed data inserted');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });