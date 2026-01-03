import { createContext, userState, useState } from "react";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState( JSON.parse(localStorage.getItem("auth")) || null);
    const login = (user) => {
        setAuth(user);
        localStorage.setItem("auth", JSON.stringify(user));
    };
    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
    };
    return(
        <AuthContext.Provider value = {{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};