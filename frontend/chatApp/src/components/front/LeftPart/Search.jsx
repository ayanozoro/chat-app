import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useAllUser from '../../../context/AllUser';
import useConversation from '../../../../state_management/useConversation.js';


function Search() {
    const [search, setSearch] = useState('')
    const [allUser] =useAllUser()
    const {setSelectedConversation} = useConversation()
    const handleSearch = (e) => {
        e.preventDefault()
        if(!search){
            return
        }
        const user = allUser.find(user => user.username.toLowerCase().includes(search.toLowerCase()))
        if(user){
            setSelectedConversation(user);
            setSearch('')
        }else{
            alert("user not found")
        }
    }
    
    return (
        <div className='h-[9vh] '>
            <div className='px-3 py-4 '>
                <form onSubmit={handleSearch}>
                    <div className='flex gap-[10px]'>
                        <label className="input rounded-lg w-[90%]">
                            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g></svg>
                            <input type="search" className="grow outline-none" placeholder="Search" 
                              onChange={(e)=>{setSearch(e.target.value)}}
                            />
                        </label>
                        <FaSearch className='text-5xl p-2 hover:bg-red-500 rounded-full duration-300' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Search
