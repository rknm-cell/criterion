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
    },
    {
        id: 2,
        title: "The Godfather",
        description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
        picture: "https://m.media-amazon.com/images/M/MV5BMWMwMGQ5ZTctN2VkMC00NzU2LWI0MDEtNDlhNjRkMjY3Njk3XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg"
    },
    {
        id: 3,
        title: "The Dark Knight",
        description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of his greatest challenges as a dark knight.",
        picture: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
    }


];

export default films;