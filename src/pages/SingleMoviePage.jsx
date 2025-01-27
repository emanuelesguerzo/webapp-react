import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

const SingleMoviePage = () => {

    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {

        axios.get(`${backendUrl}/movies/${slug}`).then((resp) => {
            setMovie(resp.data.data);
        });

    }, []);

    return (

        <>
            {movie && (
                <>
                    <section className="details container">
                        <img
                            className="detail-image"
                            src={`${backendUrl}/poster-images/${movie.image}`}
                            alt=""
                        />
                        <h1>{movie.title}</h1>
                        <p className="author-name">{movie.director}</p>
                        <p className="vote">Voto medio: {movie.vote_avg}</p>
                        <p className="genre">Genere: {movie.genre}</p>
                        <p className="movie-abstract">{movie.abstract}</p>
                    </section>
                    <section>
                        <div className="container reviews">
                            {movie.reviews.map(curReview => <ReviewCard key={curReview.id} review={curReview} />)}
                        </div>
                    </section>
                </>
            )}
        </>

    )
    
}

export default SingleMoviePage;