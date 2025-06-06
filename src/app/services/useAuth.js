import { useNavigate } from "react-router-dom";
import { httpAdapter } from "./http-adapter.service";
import { toast } from "react-toastify";
import { loginStart, loginSuccess, loginFailure, logout } from 'src/app/store/AuthSlice';
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token, loading, error } = useSelector((state) => state.auth);

  const loginUser = async (data) => {
    dispatch(loginStart());
    const response = await httpAdapter.saveData("api/auth/sign-in", data);
    try {
      if (response && response.token && response.userModel) {
        dispatch(loginSuccess(response));
        navigate("/");
      } else {
        const _error = response['errorMessage'] || 'Échec de la connexion';
        console.error(_error);
        dispatch(loginFailure(_error));
        toast.error(_error);
      }
    } catch(err) {
      const _error = response['errorMessage'] || 'Une erreur est survenue';
      dispatch(loginFailure(_error));
      console.error(_error);
      toast.error(_error);
    }
  };


  const isLoggedIn = () => {
    return user !== null && token !== '';
  };

  const logoutUser = async () => {
    try {
      await httpAdapter.getElement('/api/auth/logout');
    } finally {
      dispatch(logout());
      navigate('/auth/login');
    }
  };

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    loginUser,
    logoutUser
  }
};