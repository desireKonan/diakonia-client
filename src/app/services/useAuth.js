import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { httpAdapter } from "./http-adapter.service";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
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
    }
    setIsReady(true);
    setLogged(null);
  }, []);

  const loginUser = async (data) => {
    setLogged(false);
    const response = await httpAdapter.saveData("api/auth/sign-in", data);
    try {
      if (response && (response.token && response.userModel)) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response['userModel']))
        setUser(response['userModel']);
        setToken(response['token']);
        setLogged(true);
        navigate("/");
        return;
      } else {
        setLogged(true);
        var error = response.response.data;
        console.error(error);
        toast.error(error['errorMessage']);
        setLogged(false);
      }
    } catch(err) {
      setLogged(true);
      var error = response.response.data;
      console.error(error);
      toast.error(error['errorMessage']);
      setLogged(false);
    }
  };


  const isLoggedIn = () => {
    return (user !== null && token !== null);
  };

  const logoutUser = async () => {
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
      isLogged,
      isLoggedIn,
      loginUser,
      logoutUser
    }}>
      {isReady ? children : null}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  return useContext(AuthContext);
};