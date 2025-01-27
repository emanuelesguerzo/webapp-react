function ReviewCard({ review }) {

    return (

        <div className="">
            <div className="">
                <h4>Scritto da: {review.name}</h4>
                <p>{review.vote}</p>
                <p>{review.text}</p>
            </div>
        </div>
    );
}

export default ReviewCard;