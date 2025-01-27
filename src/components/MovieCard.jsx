import { Link } from 'react-router-dom';

const MovieCard = ({movie}) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    return(

        <div className="card">
            <img src={
                    movie.image 
                        ? `${backendUrl}/poster-images/${movie.image}` 
                        : "https://placehold.co/300x300"} 
                 alt={`Copertina del film ${movie.title}`} 
            />
            <div>
                <h3>
                    {movie.title}
                </h3>
                <div>{movie.director}</div>
                <div>Rilasciato: {movie.release_year}</div>
                <p>{movie.abstract}</p>
                <Link to={`/movies/${movie.id}`}>
                    Mostra Dettagli
                </Link>
            </div>
        </div>

    )
    
}

export default MovieCard;