import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png'
import login from '../images/login.png'
import right_arrow from '../images/right_arrow.svg'

const SignUp = () => {

    const navigate = useNavigate() 

    // eslint-disable-next-line
    const [firstName, setFirstName] = useState('')
    // eslint-disable-next-line
    const [lastName, setLastName] = useState('')
    // eslint-disable-next-line
    const [phone, setPhone] = useState()
    // eslint-disable-next-line
    const [email, setEmail] = useState('')

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => signUp(data);

    const signUp = async data => {
        
        const signUpDetails = {
            "first_name": data.first_name,
            "last_name": data.last_name,
            "phone_number": data.phone_number,
            "email": data.email,
            "password": data.password
        }
        
        fetch('https://test.nexisltd.com/signup',{
            method: 'POST',
            body: JSON.stringify(signUpDetails)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate('/login')
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
                    <h2 className=' text-center fw-bold'>SignUp</h2>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            
                            {/* First Step */}
                            <div id='first-step'>
                                <div className='my-5'>
                                    <input id='first_name' className="w-100 custom-form" placeholder='Enter First Name' {...register("first_name", { required: true })} />
                                    {errors.first_name && <span>First Name is required</span>}
                                </div>

                                <div className='mt-5'>
                                    <input id='last_name' className="w-100 custom-form" placeholder='Enter Last Name' {...register("last_name", { required: true })} />
                                    {errors.last_name && <span>Last Name is required</span>}
                                </div>

                                <button onClick={()=> {
                                    document.getElementById('first-step').style.display = 'none';
                                    document.getElementById('second-step').style.display = 'block';
                                    setFirstName(document.getElementById('first_name').value)
                                    setLastName(document.getElementById('last_name').value)
                                }} className='mx-auto d-block login-btn w-25 my-5'>Next Step <img src={right_arrow} className='img-fluid' width={20} alt="right arrow" /></button>
                            </div>
                            
                            {/* Second Step */}
                            <div style={{display:'none'}} id='second-step'>
                                <div className='mt-5 d-flex'>
                                    <label style={{borderBottom:'1px solid lightgrey'}} className='text-muted text-center'>+880</label>
                                    <input id='phone_number' className="w-100 custom-form" placeholder='1xxxxxxxxx' {...register("phone_number", { required: true })} />
                                </div>
                                    {errors.phone_number && <span>Phone Number is required</span>}

                                <div className='my-5'>
                                    <input id='email' type='email' className="w-100 custom-form" placeholder='Enter Email Address' {...register("email", { required: true })} />
                                    {errors.email && <span>Email is required</span>}
                                </div>

                                <button onClick={()=> {
                                    document.getElementById('second-step').style.display = 'none';
                                    document.getElementById('last-step').style.display = 'block';
                                    setPhone(document.getElementById('phone_number').value)
                                    setEmail(document.getElementById('email').value)
                                }} className='mx-auto d-block login-btn w-25 my-5'>Next Step <img src={right_arrow} className='img-fluid' width={20} alt="right arrow" /></button>
                            </div>

                            {/* Last Step */}
                            <div style={{display:'none'}} id="last-step">
                                <div className='mt-5'>
                                    <input type='password' className="w-100 custom-form" placeholder='Enter Password' {...register("password", { required: true, min:8 })} />
                                    {errors.password && <span>Password is required</span>}
                                </div>
                                <small>Your password must be 8 characters</small>

                                <div className='my-5'>
                                    <input type="submit" className='mx-auto d-block login-btn' value='Sign Up' />
                                </div>
                            </div>
                        </form>
                    </div>

                    <p className="text-center"><Link to='/login' className='text-decoration-none text-muted'>Already have an account?<span className='ps-3 fw-bold' style={{ color: '#1678CB', textDecoration: 'underline' }}>LOGIN HERE!</span></Link></p>

                </div>
            </div>
        </div>
    );
};

export default SignUp;