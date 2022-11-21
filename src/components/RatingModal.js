import React, { useState } from 'react';
import '../styles/rating-item.css';

function RatingModal() {

    const [rating, setRating] = useState();

    const handleTest = (e) => {
        console.log(e.target.value);
        setRating(e.target.value);
    }

    return (
        <div className="modal " id="exampleRatingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content d-flex flex-column  justify-content-center" style={{ height: "300px" }}>
                    <div class="rate bg-success py-3 text-white mt-3">
                        <div class="rating">
                            <input onClick={(e) => handleTest(e)} type="radio" name="rating" value="5" id="5" /><label for="5">☆</label>
                            <input onClick={(e) => handleTest(e)} type="radio" name="rating" value="4" id="4" /><label for="4">☆</label>
                            <input onClick={(e) => handleTest(e)} type="radio" name="rating" value="3" id="3" /><label for="3">☆</label>
                            <input onClick={(e) => handleTest(e)} type="radio" name="rating" value="2" id="2" /><label for="2">☆</label>
                            <input onClick={(e) => handleTest(e)} type="radio" name="rating" value="1" id="1" /><label for="1">☆</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingModal