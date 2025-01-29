import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CreateMoviePage = () => {

    const initialValues = {
        title: "",
        director: "",
        genre: "",
        release_year: "",
        abstract: "",
        image: "",
    }

    const navigate = useNavigate();

    const [movieData, setMovieData] = useState(initialValues);
    const [error, setError] = useState(false);

    const handleInputChange = (event) => {

        const inputName = event.target.name;

        if (inputName === "image") {
            const imageFile = event.target.files[0];
            const newObject = {
                ...movieData,
                image: imageFile
            }
            setMovieData(newObject);
        } else {
            const value = event.target.value;
            const newObject = {
                ...movieData,
                [inputName]: value
            }
            setMovieData(newObject)
        }

    }

    const isDataValid = () => {
        const { title, director, genre, release_year, abstract, image } = movieData;
        const currentYear = new Date().getFullYear();

        if (
            (!movieData.title || title.length < 2) ||
            (!director || director.length < 3) ||
            (!genre || genre.length < 3) ||
            (!release_year || isNaN(release_year) || release_year > currentYear) ||
            (abstract && abstract.length > 0 && abstract.length < 10) ||
            (!image)
        ) {
            return false;
        }
        return true;
    }

    const handleFormSubmit = (event) => {

        event.preventDefault();

        const dataToSend = new FormData();

        for (let key in movieData) {
            dataToSend.append(key, movieData[key])
        }

        setError(false);

        if (!isDataValid()) {
            setError(true);
        } else {
            axios.post(`${backendUrl}/movies`, dataToSend, { headers: { "Content-Type": "multipart/form-data" } })
                .then((resp) => {
                    navigate('/movies')
                })
        }

    }

    return (
        <>
            <div className="create-page container">

                <Link
                    to="/movies"
                    className="home-btn"
                >
                    <i class="fa-solid fa-arrow-left"></i> Lista Film
                </Link>

                <h2 className="create-main-title">Aggiungi un film!</h2>

                <form
                    onSubmit={handleFormSubmit}
                    className="create-form"
                >
                    <div>
                        <label htmlFor="title">Titolo</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            onChange={handleInputChange}
                            value={movieData.title}
                            placeholder="Titolo del film (min. 2 caratteri)"
                        />
                    </div>

                    <div>
                        <label htmlFor="director">Regista</label>
                        <input
                            type="text"
                            id="director"
                            name="director"
                            onChange={handleInputChange}
                            value={movieData.director}
                            placeholder="Nome del regista (min. 3 caratteri)"
                        />
                    </div>

                    <div>
                        <label htmlFor="genre">Genere</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            onChange={handleInputChange}
                            value={movieData.genre} 
                            placeholder="Genere del film (min. 3 caratteri)"
                        />
                    </div>

                    <div>
                        <label htmlFor="release_year">Anno di rilascio</label>
                        <input
                            type="text"
                            id="release_year"
                            name="release_year"
                            onChange={handleInputChange}
                            value={movieData.release_year}
                            placeholder="Anno di rilascio (numero tra 1901 e l'anno corrente)"
                        />
                    </div>

                    <div>
                        <label htmlFor="abstract">Estratto</label>
                        <textarea
                            name="abstract"
                            id="abstract"
                            rows="4"
                            onChange={handleInputChange}
                            value={movieData.abstract}
                            placeholder="Estratto del film (min. 10 caratteri)"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="image">Immagine di copertina</label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            onChange={handleInputChange}
                        />
                    </div>

                    <button
                        className="submit-btn"
                    >
                        Aggiungi film!
                    </button>

                </form>
                {error && (
                    <div className="create-error">
                        <div className="error-title">
                            <i className="fa-solid fa-triangle-exclamation"></i> Valori errati
                        </div>
                        <ul>
                            <li>Il titolo deve contenere un minimo di 2 caratteri.</li>
                            <li>Il nome del regista deve contenere un minimo di 3 caratteri.</li>
                            <li>Il genere deve contenere un minimo di 3 caratteri.</li>
                            <li>L'anno dev'essere un numero compreso tra il 1901 e l'anno odierno.</li>
                            <li>L'estratto deve contenere un minimo di 10 caratteri.</li>
                            <li>Aggiungi un immagine del film.</li>
                        </ul>
                    </div>
                )}
            </div>

        </>
    )
}

export default CreateMoviePage;