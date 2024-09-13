import { createContext, useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

type User = {
    email: string ,
}

interface AuthContextData {
    authLogin(email: string, password: string): Promise<void>,
    user: User | undefined,
    signedIn: boolean,
    signOut(): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    
    const [user, setUser] = useState<User>();
    const [signedIn, setSignedIn] = useState(false)
    const navigate = useNavigate()
    
    const authLogin = async (email: string, password: string) => {
        try{
            const response = await axios.post("http://localhost:4000/auth/login", {
                email, password,
            });
            
            setUser(undefined)
            console.log(response);
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token)
                setSignedIn(true)
                navigate("/users/me")
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setSignedIn(true)
        }
    }, [])

    const signOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('refreshtoken')
    }

    return (
        <AuthContext.Provider 
        value={{ 
            authLogin, 
            user,
            signedIn, 
            signOut 
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
};