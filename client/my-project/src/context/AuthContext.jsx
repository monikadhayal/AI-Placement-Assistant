import {createContext, useState} from "react";
import api from "../api/axios.js";

export const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const[user,setUser] = useState(null);

    async function login(email,password){
        const responce = await api.post("/auth/login", {email,password});
        localStorage.setItem("token", responce.data.token);
        setUser(responce.data.user);
    } 

    function logout(){
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}
