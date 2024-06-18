import React, { useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles/Login.css';

function Login() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = (data) => {
        axios
            .post('http://localhost:8080/api/auth/login', data)
            .then((response) => {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('refresh_token', response.data.refresh_token);
                localStorage.setItem('username', response.data.username);
                console.log('Login successful');
                console.log(response.data);
                navigate('/admin');
            })
            .catch((error) => {
                alert('Invalid credentials');
                console.error('Login error:', error);
            });
    };

    useEffect(() => {
        if (localStorage.getItem('access_token')) {
            // Perform necessary data fetching here
            console.log('Data fetching after login');
            console.log('Location:', location.pathname);
        }
    }, [location.pathname]);

    return (
        <div className="body">
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-title"><span>sign in to our</span></div>
                <div className="title-2"><span>Website</span></div>
                <div className="input-container">
                    <input className="input-mail" type="text" placeholder="Enter username..." {...register("username", { required: true })} />
                </div>
                <section className="bg-stars">
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                    <span className="star"></span>
                </section>
                <div className="input-container">
                    <input className="input-pwd" type="password" placeholder="Enter password..." {...register("password", { required: true })} />
                </div>
                <button type="submit" className="submit">
                    Sign in
                </button>
                <p className="signup-link">
                    No account?
                    <a href="" className="up">Sign up!</a>
                </p>
            </form>
        </div>
    );
}

export default Login;
