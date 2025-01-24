import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {

    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState("");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMovies = () => {

        const params = {};

        if (search.length > 0) {
            params.search = search
        }

        axios.get(`${backendUrl}/movies`, { params }).then((resp) => {
            setMovies(resp.data.data)
        })

    }

    useEffect(() => {
        getMovies();
    }, [])

    const handleEnterKey = (event) => {

        if (event.key === "Enter") {
            getMovies();
        }

    }

    return (

        <>
            <section>
                <h1>Serata film?</h1>
                <p>Vedi i film che abbiamo preparato per te</p>
            </section>
            <section>
                <h2>Elenco di Film</h2>
                <div>
                    <input
                        type="search"
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        onKeyUp={handleEnterKey}
                        aria-label="Find movie by name"
                        placeholder="Write movie name"
                    />
                    <button
                        onClick={getMovies}
                    >
                        Search
                    </button>
                </div>
                {movies.length > 0 ? (
                    <div>
                        {movies.map((curMovie) => (
                            <div key={curMovie.id}>
                                <MovieCard movie={curMovie} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        Nessun film trovato
                    </div>
                )}
            </section>
        </>

    )

}

export default MoviesPage;