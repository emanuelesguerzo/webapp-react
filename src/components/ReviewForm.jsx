import { useState } from "react";

const ReviewForm = ({ onSubmitFunction, formData, setFormData }) => {

    const [error, setError] = useState(false);

    const availableVotes = Array.from(Array(6).keys());

    const setFieldValue = (event) => {

        const value = event.target.value;
        const fieldName = event.target.name;
        const newFormData = { ...formData };
        newFormData[fieldName] = value;
        setFormData(newFormData);

    }

    const isDataValid = () => {

        if (formData.name.length <= 3 || formData.vote < 0 || formData.vote > 5 || (formData.text.length >= 0 && formData.text.length < 5)) {
            return false
        }

        return true;
    }

    const handleSubmit = (event) => {

        event.preventDefault();

        setError(false);

        if (!isDataValid()) {
            setError(true);
        } else {
            onSubmitFunction(formData);
        }

    }

    return (

        <>
            <form
                action=""
                onSubmit={handleSubmit}
                className="form"
            >
                <h3>Scrivi una recensione</h3>
                <div className="user-container">
                    <label htmlFor="username">
                        Nome Utente
                    </label>
                    <input
                        value={formData.name}
                        name="name"
                        type="text" 
                        id="username" 
                        onChange={setFieldValue}
                        placeholder="Il tuo nome utente" 
                    />
                </div>
                <div className="vote-container">
                    <label htmlFor="vote">
                        Voto
                    </label>
                    <select 
                        value={formData.vote} 
                        name="vote" 
                        id="vote" 
                        onChange={setFieldValue}
                    >
                        {availableVotes.map((curVote) => (
                            <option key={curVote} value={curVote}>
                                {curVote} stelle
                            </option>
                        ))}
                    </select>
                </div>
                <div className="text-container">
                    <label htmlFor="text">
                        Commento
                    </label>
                    <textarea 
                        value={formData.text} 
                        name="text" 
                        id="text" 
                        onChange={setFieldValue}
                        placeholder="Aggiungi un commento (min. 6 caratteri)"
                        rows="3"
                    ></textarea>
                </div>
                {error && (
                    <div className="form-error">
                      <i className="fa-solid fa-triangle-exclamation"></i> Valori errati. Devi inserire un nome di almeno 3 caratteri, e il tuo testo deve avere una lunghezza superiore a 6 caratteri.
                    </div>
                )}
                <button type="submit" className="submit-btn">Invia recensione!</button>
            </form>
        </>

    )

}

export default ReviewForm;