import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";

const SingleMoviePage = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {

        axios.get(`${backendUrl}/movies/${id}`).then((resp) => {
            setMovie(resp.data.data);
        });

    }, []);

    return (
        <>
            {movie && (
                <>
                    <section>
                        <img
                            className=""
                            src={`${backendUrl}/poster-images/${movie.image}`}
                            alt=""
                        />
                        <h1>{movie.title}</h1>
                        <h2 className="">{movie.author}</h2>

                        <p>Genre: {movie.genre}</p>
                        <p>{movie.abstract}</p>
                    </section>
                    <section>
                        <div className="">
                            {movie.reviews.map(curReview => <ReviewCard key={curReview.id} review={curReview} />)}
                        </div>
                    </section>
                </>
            )}
        </>
    )
}

export default SingleMoviePage;