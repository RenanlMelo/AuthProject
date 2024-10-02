import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

type User = {
  email: string;
};

interface AuthContextData {
  authRegister(email: string, password: string): Promise<void>;
  user: User | undefined;
  signedIn: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthRegisterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();
  const [signedIn, setSignedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const authRegister = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:4000/users/create", {
        email,
        password,
      });

      if (response.data.token && response.data.refreshToken) {
        if (currentPath === "users/create") alert("Você já está logado!");
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
        if (currentPath === "/users/create") {
          alert("You're already logged in");
          navigate("/users/me");
        }
      } catch (error) {
        localStorage.removeItem("user");
        setUser(undefined);
      }
    } else if (currentPath === "/users/me") {
      alert("You need to login first");
      navigate("/");
    }
  }, [currentPath, navigate]);

  return (
    <AuthContext.Provider
      value={{
        authRegister,
        user,
        signedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useRegisterAuthContext = () => {
  return useContext(AuthContext);
};
