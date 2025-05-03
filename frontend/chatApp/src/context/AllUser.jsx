import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
function useAllUser() {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const token = Cookies.get('jwt');
                setLoading(true);
                const response = await axios.get('/api/user/alluser', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // console.group(response.data)
                setAllUser(response.data);
                setLoading(false);
            } catch (error) {
                console.log("error in alluser", error);
            }finally {
                setLoading(false);
            }
        };
        fetchAllUser();
        
    }, []);
    
    return [allUser, loading]
}

export default useAllUser;
