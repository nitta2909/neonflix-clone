
export interface Movie {
  id: number;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  year: number;
  rating: number;
  duration: string;
  genres: string[];
  isTrending?: boolean;
  isNew?: boolean;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    backdropUrl: "https://wallpaperaccess.com/full/1264514.jpg",
    year: 2010,
    rating: 8.8,
    duration: "2h 28m",
    genres: ["Action", "Adventure", "Sci-Fi"],
    isTrending: true
  },
  {
    id: 2,
    title: "The Matrix",
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/6LYCq1R.jpg",
    year: 1999,
    rating: 8.7,
    duration: "2h 16m",
    genres: ["Action", "Sci-Fi"],
    isTrending: true
  },
  {
    id: 3,
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp1816387.jpg",
    year: 2014,
    rating: 8.6,
    duration: "2h 49m",
    genres: ["Adventure", "Drama", "Sci-Fi"],
    isTrending: true
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp2555030.jpg",
    year: 2017,
    rating: 8.0,
    duration: "2h 44m",
    genres: ["Action", "Drama", "Sci-Fi"],
    isNew: true
  },
  {
    id: 5,
    title: "Dune",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset and most vital element in the galaxy.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_FMjpg_UX1000_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp10544950.jpg",
    year: 2021,
    rating: 8.0,
    duration: "2h 35m",
    genres: ["Action", "Adventure", "Drama"],
    isNew: true
  },
  {
    id: 6,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/qEkVoGm.jpg",
    year: 2008,
    rating: 9.0,
    duration: "2h 32m",
    genres: ["Action", "Crime", "Drama"],
    isTrending: true
  },
  {
    id: 7,
    title: "Spider-Man: Into the Spider-Verse",
    description: "Teen Miles Morales becomes the Spider-Man of his universe, and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BMjMwNDkxMTgzOF5BMl5BanBnXkFtZTgwNTkwNTQ3NjM@._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp4056410.jpg",
    year: 2018,
    rating: 8.4,
    duration: "1h 57m",
    genres: ["Animation", "Action", "Adventure"],
    isNew: true
  },
  {
    id: 8,
    title: "Tenet",
    description: "Armed with only one word, Tenet, and fighting for the survival of the entire world, a Protagonist journeys through a twilight world of international espionage on a mission that will unfold in something beyond real time.",
    posterUrl: "https://m.media-amazon.com/images/M/MV5BYzg0NGM2NjAtNmIxOC00MDJmLTg5ZmYtYzM0MTE4NWE2NzlhXkEyXkFqcGdeQXVyMTA4NjE0NjEy._V1_.jpg",
    backdropUrl: "https://wallpapercave.com/wp/wp7975580.jpg",
    year: 2020,
    rating: 7.4,
    duration: "2h 30m",
    genres: ["Action", "Sci-Fi", "Thriller"],
    isNew: true
  }
];

export const categories = [
  { id: 1, name: "Trending Now" },
  { id: 2, name: "New Releases" },
  { id: 3, name: "Action Movies" },
  { id: 4, name: "Sci-Fi Adventures" },
  { id: 5, name: "Award-Winning Films" },
];

export const getTrendingMovies = () => movies.filter(movie => movie.isTrending);
export const getNewMovies = () => movies.filter(movie => movie.isNew);
export const getActionMovies = () => movies.filter(movie => movie.genres.includes("Action"));
export const getSciFiMovies = () => movies.filter(movie => movie.genres.includes("Sci-Fi"));
