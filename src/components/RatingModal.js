import React, { useState } from 'react';
import ReactTextareaAutosize from 'react-textarea-autosize';
import { toast } from 'react-toastify';
import OrderService from '../services/OrderService';
import '../styles/rating-item.css';

function RatingModal({ orderId, handleGetMyOrder, isShow, setIsShow }) {

    const [rating, setRating] = useState(0);

    const [comment, setComment] = useState("");

    const handleClear = () => {
        setComment("");
        setRating(0);
    }

    const handleRating = (orderId) => {
        if (rating !== 0) {
            OrderService.ratingOrder(orderId, { rating: rating, comment: comment })
                .then(response => {
                    handleGetMyOrder();
                    setIsShow(false);
                    handleClear();
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
        else {
            toast.error("Vui lòng đánh giá sao...", {
                position: toast.POSITION.TOP_RIGHT
            });
        }

    }

    return (
        <>
            {
                <div class="modal fade" id="exampleRatingModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="text-right cross"> <i class="fa fa-times mr-2"></i> </div>
                            <div class="card-body text-center"> <img src=" https://i.imgur.com/d2dKtI7.png" height="100" width="100" />
                                <div class="comment-box text-center">
                                    <h4>Cảm ơn bạn đã đặt đơn cho mình nhá!</h4>
                                    <div class="rating">
                                        <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="5" id="5" /><label for="5">☆</label>
                                        <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="4" id="4" /><label for="4">☆</label>
                                        <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="3" id="3" /><label for="3">☆</label>
                                        <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="2" id="2" /><label for="2">☆</label>
                                        <input onClick={(e) => setRating(e.target.value)} type="radio" name="rating" value="1" id="1" /><label for="1">☆</label>
                                    </div>
                                    <div class="comment-area"> <textarea class="form-control" placeholder="Đánh giá của bạn?" rows="4" value={comment} onChange={(e) => setComment(e.target.value)}></textarea> </div>

                                    <div class="text-center mt-4">
                                        <button onClick={() => handleRating(orderId)} class="btn btn-success send px-5" data-dismiss="#exampleModalLabel">Gửi đánh giá <i class="fa fa-long-arrow-right ml-1"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default RatingModal