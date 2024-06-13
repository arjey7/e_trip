import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/Comment.css"
import Page from "./Page.jsx";
import { addCommentRequest } from './redux/action.js';  // Corrected import path
import { selectLoading, selectError } from './redux/selectors';

function Comment(props) {
    const { handleSubmit, register, reset } = useForm();
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const error = useSelector(selectError);

    const mySubmit = (data) => {
        dispatch(addCommentRequest(data));
    };

    React.useEffect(() => {
        if (!loading && !error) {
            reset();
            toast.success("Comment added successfully!");
        }
        if (error) {
            toast.error("Error adding comment!");
        }
    }, [loading, error, reset]);

    return (
        <div>
            <Page/>
            <ToastContainer />
            <div className="comment-form">
                <form id="commentForm" onSubmit={handleSubmit(mySubmit)}>
                    <input type="text" className="comment-input" placeholder="First Name" {...register("firstName")} />
                    <input type="text" className="comment-input" placeholder="Last Name" {...register("lastName")} />
                    <input type="text" className="comment-input" placeholder="Text" {...register("text")} />
                    <button type="submit" form="commentForm" className="comment-button" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Comment'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Comment;
