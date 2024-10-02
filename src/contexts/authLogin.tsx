import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  email: string;
};

interface AuthContextData {
  authLogin(email: string, password: string): Promise<void>;
  user: User | undefined;
  signedIn: boolean;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthLoginProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const authLogin = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      if (response.data.token && response.data.refreshToken) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem(
          "user",
          JSON.stringify({ email: response.data.email })
        );
        setUser({ email: response.data.email });
        setSignedIn(true);
        navigate("/users/me");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");
    const storedUser = localStorage.getItem("user");

    if (token && refreshToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setSignedIn(true);
        if (currentPath === "/") {
          alert("You're already logged in");
          navigate("/users/me");
        }
      } catch (error) {
        setUser(undefined);
        localStorage.removeItem("user");
      }
    } else if (currentPath === "/users/me") {
      signOut();
    }
  }, [currentPath, navigate]);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(undefined);
    setSignedIn(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        authLogin,
        user,
        signedIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useLoginAuthContext = () => {
  return useContext(AuthContext);
};
