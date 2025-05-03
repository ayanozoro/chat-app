import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../context/Auth.jsx';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
function Login() {
    const navigate = useNavigate();
    const [authUser , setAuthUser] = useAuth();
    const [data, setData] = useState({
        email: '',
        password: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const onSubmit = async(e) => {
        e.preventDefault();

        await axios.post('/api/user/login', data)
        .then((res) => {
            console.log(res.data);
            toast.success('Login successful!', {
                duration: 4000,
                position: 'top-center',
                style: {
                  background: '#4CAF50',
                  color: '#fff',
                  fontWeight: 'bold',
                },
                icon: '🚀',
              });
            localStorage.setItem("chatUser" , JSON.stringify(res.data.user));
            setAuthUser(res.data.user);
            navigate('/');
            // window.location.reload();
        })
        .catch((err) => {
            console.error(err);
            toast.error(err.response?.data || 'Invalid credentials or server error', {
                duration: 4000,
                position: 'top-center',
                style: {
                  background: '#4CAF50',
                  color: '#fff',
                  fontWeight: 'bold',
                },
                icon: '🚀',
              });
        });
    };

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                    <legend className="fieldset-legend text-lg font-bold">Login</legend>

                    <label className="fieldset-label text-lg font-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        required
                    />

                    <label className="fieldset-label text-lg font-bold">Password</label>
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="btn btn-neutral mt-4 hover:bg-orange-400 duration-300">
                        Login
                    </button>

                    <p>
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-blue-500 hover:text-blue-800">
                            Sign Up
                        </Link>
                    </p>
                </fieldset>
            </form>
        </div>
    );
}

export default Login;

