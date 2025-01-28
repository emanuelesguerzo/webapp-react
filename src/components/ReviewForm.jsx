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

        if (formData.name.length <= 3 || formData.vote < 0 || formData.vote > 5 || (formData.text.length > 0 && formData.text.length < 5)) {
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
            <form action="" onSubmit={handleSubmit}>
                <h3>Scrivi una recensione</h3>
                <div>
                    <label htmlFor="username">Nome Utente</label>
                    <input value={formData.name} name="name" type="text" id="username" onChange={setFieldValue} />
                </div>
                <div>
                    <label htmlFor="vote">Voto</label>
                    <select value={formData.vote} name="vote" id="vote" onChange={setFieldValue}>
                        {availableVotes.map((curVote) => (
                            <option key={curVote} value={curVote}>
                                {curVote}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="text">Commento</label>
                    <textarea value={formData.text} name="text" id="text" onChange={setFieldValue}></textarea>
                </div>
                {error && (
                    <div>Valori errati</div>
                )}
                <button type="submit">Invia Recensione</button>
            </form>
        </>

    )
    
}

export default ReviewForm;