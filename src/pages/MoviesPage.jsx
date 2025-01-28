import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {

    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [years, setYears] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMovies = () => {

        const params = {};

        if (search.length > 0) {
            params.search = search
        }

        if (selectedGenre !== "") {
            params.genre = selectedGenre;
        }

        if (selectedYear !== "") {
            params.release_year = selectedYear;
        }

        axios.get(`${backendUrl}/movies`, { params }).then((resp) => {
            setMovies(resp.data.data)
        })

    }

    const handleEnterKey = (event) => {

        if (event.key === "Enter") {
            getMovies();
        }

    }

    const extractGenresAndYears = (moviesList) => {

        const uniqueGenres = [];
        const uniqueYears = [];

        moviesList.forEach((movie) => {

            if (!uniqueGenres.includes(movie.genre)) {
                uniqueGenres.push(movie.genre);
            }
            
            if (!uniqueYears.includes(movie.release_year)) {
                uniqueYears.push(movie.release_year);
            }

        });

        setGenres(uniqueGenres);
        setYears(uniqueYears.sort((a, b) => b - a));

    };

    useEffect(() => {
        axios.get(`${backendUrl}/movies`).then((resp) => {
            setMovies(resp.data.data);
            extractGenresAndYears(resp.data.data);
        });
    }, []);

    useEffect(() => {
        getMovies();
    }, [selectedGenre, selectedYear])

    return (

        <>
            <section className="presentation">
                <h1>Serata film?</h1>
                <p>Vedi i film che abbiamo preparato per te!</p>
            </section>
            <section>
                <h2>Elenco di Film</h2>
                <div className="searchbar">
                    
                    {/* Filter by Genre */}
                    <select
                        name="" 
                        id=""
                        value={selectedGenre}
                        onChange={(event) => setSelectedGenre(event.target.value)}
                    >
                        <option value="">Genere</option>
                        {genres.map((curGenre, index) => (
                            <option key={index} value={curGenre}>
                                {curGenre}
                            </option>
                        ))}
                    </select>

                    {/* Filter by Release Year */}
                    <select
                        name="year"
                        id="year"
                        value={selectedYear}
                        onChange={(event) => setSelectedYear(event.target.value)}
                    >
                        <option value="">Anno</option>
                        {years.map((year, index) => (
                            <option key={index} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    {/* Search Input */}
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyUp={handleEnterKey}
                        aria-label="Find movie by name"
                        placeholder="Nome del film"
                    />

                    {/* Search Button */}
                    <button
                        onClick={getMovies}
                        className="search-btn"
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>

                </div>
                {movies.length > 0 ? (
                    <div className="row ">
                        {movies.map((curMovie) => (
                            <div key={curMovie.id} className="col">
                                <MovieCard movie={curMovie} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-list">
                        Nessun film trovato
                    </div>
                )}
            </section>
        </>

    )

}

export default MoviesPage;