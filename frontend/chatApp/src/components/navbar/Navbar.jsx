import React from 'react';
import { CiLogin } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { IoMdContacts } from "react-icons/io";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Profile from '../profile/Profile';

function Navbar() {
    const navigate = useNavigate();

    const onClick = async () => {
        console.log("clicked");
        try {
            const response = await axios.post('/api/user/logout', {
                withCredentials: true
            });

            localStorage.removeItem("chatUser");
            console.log(response);

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
        <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg p-4 flex justify-between items-center z-50">
            <h1 className="font-bold text-xl text-aqua">Chat-Kr</h1>

            <div className="flex space-x-6 items-center">
                <button className="hover:scale-110 transition"><IoMdContacts className='text-3xl' /><Profile /></button>
                <button className="hover:scale-110 transition">Theme</button>
                <button className="hover:scale-110 transition"><CgProfile className='text-3xl' /></button>
                <button onClick={onClick} className="hover:scale-110 transition">
                    <CiLogin className='text-3xl text-red-500' />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
