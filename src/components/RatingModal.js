import React, { useState } from 'react';
import { toast } from 'react-toastify';
import OrderService from '../services/OrderService';
import '../styles/rating-item.css';

function RatingModal({orderId, handleGetMyOrder}) {

    console.log(orderId)

    const [rating, setRating] = useState(null);

    const [comment, setComment] = useState("");

    const handleRating = (orderId) => { 
        OrderService.ratingOrder(orderId, {rating: rating, comment: comment})
        .then(response => {
            handleGetMyOrder();
            toast.success(response.data, {
                position: toast.POSITION.TOP_RIGHT
            });

        })
        .catch(error => {
            toast.error(error.response.data, {
                position: toast.POSITION.TOP_RIGHT
            });
        });
    }

    return (
        <div className="modal " id="exampleRatingModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content d-flex flex-column  justify-content-center" style={{ height: "300px" }}>
                    <div class="rate bg-success py-3 text-white mt-3">
                        <div class="rating">
                            <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="5" id="5" /><label for="5">☆</label>
                            <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="4" id="4" /><label for="4">☆</label>
                            <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="3" id="3" /><label for="3">☆</label>
                            <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="2" id="2" /><label for="2">☆</label>
                            <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="1" id="1" /><label for="1">☆</label>
                        </div>
                        <input onChange={(e) => setComment(e.target.value)} type="text" ></input>
                        <button onClick={() => handleRating(orderId)}> đánh giá</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RatingModal