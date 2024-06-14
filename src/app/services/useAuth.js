import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { httpAdapter } from "./http-adapter.service";
import http from "./http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isReady, setIsReady] = useState(false);
  const [isLogged, setLogged] = useState(null);
  const navigate = useNavigate();

  
  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
    setLogged(null);
  }, []);

  const loginUser = async (data) => {
    try {
      console.log(data);
      setLogged(false);
      const response = await httpAdapter.saveData("api/auth/sign-in", data);
      console.log(response);
      if (response) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response['userModel']))
        setUser(response['userModel']);
        setToken(response['token']);
        setLogged(true);
        navigate("/");
        return;
      } 
    } catch (err) {
      console.error(err);
    }
  };


  const isLoggedIn = () => {
    return (user !== null && localStorage.getItem("user") !== null) && (token !== "" && localStorage.getItem("token") !== null);
  };
  
  const logoutUser = async() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    await httpAdapter.getElement('/api/auth/logout');
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ 
      token, 
      user, 
      isLoggedIn,
      isLogged, 
      loginUser, 
      logoutUser 
    }}>
      { isReady ? children : null }
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};