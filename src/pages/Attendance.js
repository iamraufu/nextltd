import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';

const Attendance = () => {

    const token = localStorage.getItem('token')
    console.log(token);

    const [data, setData] = useState([])

    useEffect(() => {
        fetch('https://cors-anywhere.herokuapp.com/https://test.nexisltd.com/test',
            {
                headers: {
                    "Authorization": 'Bearer ' + token,
                }
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setData(Object.values(data))
            })
    }, [])

    return (
        <div className='container mt-3'>
            <img src={logo} alt="brand logo" />
            <button className='mx-auto d-block mt-5 login-btn w-25'>Attendance Information</button>
            <div className="row mt-5">
                <div className="col-sm-4">
                    <h2 className='fs-6 fw-bold'>Date</h2>
                    {
                        data.map(item => <p>{item.name}</p>)
                    }
                </div>
                
                <div className="col-sm-4">
                    <h2 className='fs-6 fw-bold'>Employee Name</h2>
                    {
                        data.map(item => <p>{item.name}</p>)
                    }
                </div>

                <div className="col-sm-4">
                    <h2 className='fs-6 fw-bold'>Status</h2>
                    {
                        data.map(item => <p>{item.name}</p>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Attendance;