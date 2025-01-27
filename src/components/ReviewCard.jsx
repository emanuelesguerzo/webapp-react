function ReviewCard({ review }) {

    return (
        <>
            <div className="review-cards">
                <div className="review-text">
                    <h4>Scritto da: {review.name}</h4>
                    <p>Voto: {review.vote}</p>
                    <p>{review.text}</p>
                </div>
            </div>
        </>
    );
}

export default ReviewCard;                                              