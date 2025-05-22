import React, { useState, useEffect } from 'react';
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdContacts } from "react-icons/io";
import { FiSun, FiMoon } from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    const onClick = async () => {
        try {
            const response = await axios.post('/api/user/logout', {
                withCredentials: true
            });

            localStorage.removeItem("chatUser");

            toast.success("Logout successful! 🎉", {
                duration: 4000,
                position: 'top-center',
                style: {
                    background: '#4CAFAFFF',
                    color: '#fff',
                    fontWeight: 'bold',
                },
                icon: '🚀',
            });

            navigate('/login');
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 w-full shadow-lg p-4 flex justify-between items-center z-50 transition-colors duration-300 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
            <h1 className="font-bold text-xl text-aqua">Chat-Kr</h1>

            <div className="flex space-x-6 items-center">
                <button className="hover:scale-110 transition"><IoMdContacts className='text-3xl' /></button>
                <button onClick={toggleTheme} className="hover:scale-110 transition">
                    {theme === 'light' ? <FiMoon className="text-2xl" /> : <FiSun className="text-2xl" />}
                </button>
                <button className="hover:scale-110 transition"><CgProfile className='text-3xl' /></button>
                <button onClick={onClick} className="hover:scale-110 transition">
                    <CiLogin className='text-3xl text-red-500' />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
