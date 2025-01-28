function ReviewCard({ review }) {

    function getRating(score) {

        const stars = [];

        for (let i = 0; i < 5; i++) {
            if(i < score) {
                stars.push(<i key={i} className="fa-solid fa-star"></i>)
            } else {
                stars.push(<i key={i} className="fa-regular fa-star"></i>)
            }
        }

        return stars;
        
    }

    return (

        <>
            <div className="review-cards">
                <div className="review-text">
                    <h4>Scritto da: {review.name}</h4>
                    <p>Voto: {getRating(review.vote)}</p>
                    <p>{review.text}</p>
                </div>
            </div>
        </>

    );

}

export default ReviewCard;                                              