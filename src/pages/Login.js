import React from 'react';
import '../styles/Login.css';
import logo from '../images/logo.png'
import login from '../images/login.png'
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate() 

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => loginHandler(data);

    const loginHandler = (data) => {
        
        const loginDetails = {
            "email": data.email,
            "password": data.password,
        }
        fetch('https://test.nexisltd.com/login', {
            method: 'POST',
            body: JSON.stringify(loginDetails)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                localStorage.setItem('token', data.access_token)
                navigate('/attendance')
            })
    }

    return (
        <div className='container mt-3'>
            <img src={logo} className='img-fluid' alt="brand logo" />
            <div className="row">
                <div className="col-md-6">
                    <img src={login} className='img-fluid' alt="brand people" />
                </div>

                <div style={{ minHeight: '80vh' }} className="col-md-6 my-3 right-container-login p-5">
                    <h2 className=' text-center fw-bold'>Log in</h2>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <div className='my-5'>
                                <input className="w-100 custom-form" placeholder='Enter Email Address' {...register("email", { required: true })} />
                                {errors.email && <span>Email is required</span>}
                            </div>

                            <div className='mt-5'>
                                <input type='password' className="w-100 custom-form" placeholder='Enter Password' {...register("password", { required: true })} />
                                {errors.password && <span>Password is required</span>}
                            </div>

                            <small>Your password must be 8 characters</small>

                            <div className='my-5'>
                                <input type="submit" className='mx-auto d-block login-btn' value='Log In' />
                            </div>
                        </form>
                    </div>

                    <p className="text-center"><Link to='/signup' className='text-decoration-none text-muted'>Don’t have an account? <span className='ps-3 fw-bold' style={{ color: '#1678CB', textDecoration: 'underline' }}>SIGNUP HERE!</span></Link></p>

                </div>
            </div>
        </div>
    );
};

export default Login;