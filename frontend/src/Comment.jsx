import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Comment.css";
import ReactStars from "react-rating-stars-component";

function Comment(props) {
    const { handleSubmit, register, reset } = useForm();
    const [rate, setRate] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    function mySubmit(data) {
       data.rate=rate;
        console.log(data)
        axios.post("http://localhost:8080/api/comment", data).then(res => {
            toast.success("Comment added successfully!");
        }).catch(error => {
            toast.error("Error adding comment!");
        }).finally(() => {
            reset();
        });
        setModalVisible(false)
    }

    function chang(e) {
   setRate(e)
    }

    return (

        <div className="comment-page">
            <ToastContainer />
            <form className="comment-form" id="commentForm" onSubmit={handleSubmit(mySubmit)}>
                <label className="comment-label">Оставить отзыв</label>
                <div className="star-rating">
                    <label className={"comment-labels"}>Рейтинг:</label>
                    <ReactStars
                        count={5}
                        size={24}
                        activeColor="#ffd700"

                    onChange={(e)=>chang(e)} />
                </div>
                <div className={"first-div"}>
                    <input type="text" className="comment-input" placeholder="Имя" {...register("firstName")} />
                    <input type="text" className={"comment-input"} placeholder={"Фамилия"} {...register("lastName")} />
                </div>
                <div>
                    <textarea className="comment-inputs" placeholder="Ваш комментарий" {...register("text")} />
                </div>
                <div className="captcha">
                    {/* Your captcha code goes here */}
                </div>
                <button type="submit" form="commentForm" className="comment-button">НАПИСАТЬ ОТЗЫВ</button>
            </form>
        </div>
    );
}

export default Comment;
