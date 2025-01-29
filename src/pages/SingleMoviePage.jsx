import { useParams, Link } from "react-router-dom";
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
                <div className="container">
                    <Link 
                        to="/movies"
                        className="home-btn"
                    >
                        <i class="fa-solid fa-arrow-left"></i> Lista Film
                    </Link>
                    <section className="details">
                        <div className="detail-image-container">
                            <img
                                className="detail-image"
                                src={`${backendUrl}/poster-images/${movie.image}`}
                                alt=""
                            />
                        </div>

                        <h1>{movie.title}</h1>
                        <div className="tags">
                            <p className="author-name">{movie.director}</p>
                            <p className="vote">Voto medio: {movie.vote_avg ? movie.vote_avg : 0} <i className="fa-solid fa-star"></i></p>
                            <p className="genre">{movie.genre}</p>
                        </div>
                        <p className="abstract">"{movie.abstract}"</p>
                    </section>
                    <section>
                        <div className="reviews">
                            {movie.reviews.map(curReview => <ReviewCard key={curReview.id} review={curReview} />)}
                        </div>
                        <div className="reviewform-container">
                            <ReviewForm
                                formData={formData}
                                setFormData={setFormData}
                                onSubmitFunction={storeReview}
                            />
                        </div>
                    </section>
                </div>
                    
                </>

            )}

        </>

    )

}

export default SingleMoviePage;