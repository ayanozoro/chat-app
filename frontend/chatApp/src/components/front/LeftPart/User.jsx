import React from 'react';
import Users from './Users.jsx';
import useAllUser from '../../../context/AllUser.jsx';

function User() {
    const [allUser, loading] = useAllUser();

    console.log(allUser);

    return (
        <div className='h-screen py-3'>
            <h1 className='px-6 py-2 font-bold text-green-300 bg-gray-600'>Messages</h1>

            <div className='flex-1 overflow-y-auto flex flex-col' style={{ maxHeight: "calc(100vh)" }}>
                {loading ? (
                    <p className='text-white px-6 py-2'>Loading...</p>
                ) : (
                    <>
                        {allUser && allUser.length > 0 ? (
                            allUser.map((user ,idx) => (
                                <Users key={idx} user={user} />
                            ))
                        ) : (
                            <p className='text-white px-6 py-2'>No users found.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default User;

