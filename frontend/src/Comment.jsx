import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { closeModal } from "./redux/reducer/tourReducer.js";
import "./css/Comment.css";

function Comment(props) {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const [rate, setRate] = useState("");
    const dispatch = useDispatch();

    function mySubmit(data) {
        data.rate = rate;
        axios.post("http://localhost:8081/api/comment", data).then(res => {
            toast.success("Comment added successfully!");
            dispatch(closeModal());
        }).catch(error => {
            toast.error("Error adding comment!");
        }).finally(() => {
            reset();
        });
    }

    function chang(e) {
        setRate(e);
    }

    return (
        <div className="comment-page">
            <ToastContainer />
            <form className="comment-formm" id="commentForm" onSubmit={handleSubmit(mySubmit)}>
                <label className="comment-label">Оставить отзыв</label>
                <div className="star-rating">
                    <label className="comment-labels">Рейтинг:</label>
                    <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        onChange={chang}
                    />
                </div>
                <div className="first-div">
                    <div>
                        <input type="text" className="comment-input" placeholder="Имя" {...register("firstName", { required: 'Please enter first name' })} />
                        {errors.firstName && <p className="error-message">{errors.firstName.message}</p>}
                    </div>
                    <div>
                        <input type="text" className="comment-input" placeholder="Фамилия" {...register("lastName", { required: 'Please enter last name' })} />
                        {errors.lastName && <p className="error-message">{errors.lastName.message}</p>}
                    </div>
                </div>
                <div>
                    <textarea className="comment-inputs" placeholder="Ваш комментарий" {...register("text", { required: 'Please enter your comment' })} />
                    {errors.text && <p className="error-message">{errors.text.message}</p>}
                </div>
                <button type="submit" form="commentForm" className="comment-button">НАПИСАТЬ ОТЗЫВ</button>
            </form>
        </div>
    );
}

export default Comment;
