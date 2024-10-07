import React, { useContext, createContext, useState } from 'react';

const token = localStorage.getItem("token");
const idusuario = localStorage.getItem("idusuario");

const AuthContext = createContext();

export function useAuth(){
    return useContext( AuthContext );
}

export function AuthProvider( props ){

    const [ authUser, setAuthUser ] = useState(  token && idusuario ? {
        token : token,
        user : idusuario
    } : null );
    const [ isLoggedIn, setisLoggedIn ] = useState( token && idusuario );

    const value = {
        authUser,
        setAuthUser,
        isLoggedIn,
        setisLoggedIn
    }

    return ( 
        <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
    )
}