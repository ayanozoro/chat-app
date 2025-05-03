import React from 'react'
import Search from './Search.jsx';
import User from './User.jsx';

function Left() {
    return (
        <div className='w-[30%] overflow-y-auto border border-white flex flex-col'>
            <Search />
            <div className="flex-1 overflow-y-auto">
                <User />
            </div>
        </div>
    )
}

export default Left;
