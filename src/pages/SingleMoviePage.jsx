import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ReviewCard from "../components/ReviewCard";
import ReviewForm from "../components/ReviewForm";

const initialValues = {
    name: "",
    vote: 0,
    text: "",
}

const SingleMoviePage = () => {

    const { slug } = useParams();
    const [movie, setMovie] = useState(null);
    const [formData, setFormData] = useState(initialValues);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getMovie = () => {
        axios.get(`${backendUrl}/movies/${slug}`).then((resp) => {
            setMovie(resp.data.data);
        });
    }

    useEffect(() => {
        getMovie();
    }, []);

    const storeReview = (formData) => {

        axios.post(`${backendUrl}/movies/${slug}/reviews`, formData)
            .then((resp) => {
                setFormData(initialValues)
                getMovie();
            });
    };

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
                        <div>
                            <ReviewForm 
                                formData={formData} 
                                setFormData={setFormData} 
                                onSubmitFunction={storeReview} 
                            />
                        </div>
                    </section>
                </>

            )}

        </>

    )

}

export default SingleMoviePage;