import React , { useContext, useState } from 'react';
import axios from 'axios'
import { useAuth } from '../../../context/Auth.jsx';
import toast from 'react-hot-toast';

function Signup() {

    const [authUser , setAuthUser] = useAuth();
    const [data , setData] = useState({
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    });
    
    const handleChange = (e)=>{
        const {name,value} = e.target;
        setData((prevData)=>({
            ...prevData,
            [name]:value
        }));
    };
    
    const onSubmit = async(e)=>{
        e.preventDefault();
    
        if(data.password!==data.confirmPassword){
            alert('Passwords do not match');
            return;
        }
    
        const user ={
            username:data.username,
            email:data.email,
            password:data.password,
            confirmPassword:data.confirmPassword
        }
    
        await axios.post('/api/user/signup', user)
        .then((res)=>{
            console.log(res.data);
            toast.success("user is created");

            localStorage.setItem("chatUser" , JSON.stringify(res.data));
            setAuthUser(res.data);
        })
        .catch((err) => {
            console.log(err);
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                toast.error('An error occurred');
            }
        });
    }
    return (

        <div className='flex flex-col items-center justify-center h-screen'>
            <form onSubmit={onSubmit}>
                <h1 className='font-bold text-blue-500 text-xl'>SignUp</h1>
                <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                <label className="fieldset-label text-lg font-bold">UserName</label>
                <input type="name" name="username" className="input" placeholder="Username" value={data.username} onChange={handleChange} />

                    <label className="fieldset-label text-lg font-bold">Email</label>
                    <input type="email" name="email" className="input" placeholder="Email" value={data.email} onChange={handleChange} />

                    <label className="fieldset-label text-lg font-bold">Password</label>
                    <input type="password" name="password" className="input" placeholder="Password" value={data.password} onChange={handleChange} />

                    <label className="fieldset-label text-lg font-bold">ConfirmPassword</label>
                    <input type="password" name="confirmPassword" className="input" placeholder="ConfirmPassword" value={data.confirmPassword} onChange={handleChange} />
                    <button className="btn btn-neutral mt-4 hover:bg-orange-400 duration-300">SignUp</button>
                    <p>Alredy have an account? <a href="/login" className="text-blue-500 hover:text-blue-800">Login</a></p>
                </fieldset>
                
            </form>
        </div>
    )
}

export default Signup
