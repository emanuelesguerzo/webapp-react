import axios from "axios";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const MoviesPage = () => {

    const [movies, setMovies] = useState([]);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        axios.get(`${backendUrl}/movies`).then((resp) => {
            setMovies(resp.data.data)
        })
    }, [])

    return (
        <>
            <section>
                <h1>Serata film?</h1>
                <p>Vedi i film che abbiamo preparato per te</p>
            </section>
            <section>
                <h2>Elenco di Film</h2>
                <div>
                    {movies.map((curMovie) => (
                        <div>
                            <MovieCard movie={curMovie}/>
                        </div>
                    ))}
                </div>
        </section >
        </>
    )
}
export default MoviesPage;