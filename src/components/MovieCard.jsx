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
            <div className="card-text">
                <h3>
                    {movie.title}
                </h3>
                <p className='author-name'>{movie.director}</p>
                <p className='year-release'>Rilasciato nel {movie.release_year}</p>
                <p className='movie-abstract'>{movie.abstract}</p>
                <Link
                    to={`/movies/${movie.slug}`}
                    className='detail-link'
                >
                    Mostra Dettagli <i className="fa-solid fa-arrow-right"></i>
                </Link>
            </div>
        </div>

    )
    
}

export default MovieCard;