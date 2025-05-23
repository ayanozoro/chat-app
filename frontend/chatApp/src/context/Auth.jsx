import React ,{createContext, useContext, useState} from "react";
import Cookies from 'js-cookie';
export const AuthContext = createContext() 
const AuthProvider=({children})=> {
    console.log(Cookies.get());
    const  initialUserState = Cookies.get("jwt") || localStorage.getItem("chatUser");
    const [authUser , setAuthUser]= useState(initialUserState? JSON.parse(initialUserState): undefined);

    return(
        <AuthContext.Provider value={[authUser , setAuthUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth= ()=> useContext(AuthContext);

export default AuthProvider;