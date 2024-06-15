import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import "./styles/Login.css";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate()

    const onSubmit = (data) => {
        axios.post('http://localhost:8080/api/auth/login', data)
            .then(response => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                console.log("Login successful");
            })
            .catch(error => {
                alert('Invalid credentials');
                console.error('Login error:', error);
            });
        navigate("/")
    };

    return (
        <div className="body">
            <div id="Container">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <div id="login-lable">Login</div>
                    <input
                        className="form-content"
                        type="text"
                        placeholder="Username"
                        {...register("username", { required: true })}
                    />
                    <input
                        className="form-content"
                        type="password"
                        placeholder="Password"
                        {...register("password", { required: true })}
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
