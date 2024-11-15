import CryptoJS from "crypto-js";
import axios from "axios";
import { deleteSessionToken } from "../../components/delCookie";
import Swal from "sweetalert2";
import rutaBack from "./rutaBack";
import toast from "react-hot-toast";

export const AUTHENTICATE_USER_FROM_SESSION = "AUTHENTICATE_USER_FROM_SESSION";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";
export const UPDATE_USER = "UPDATE_USER";
export const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
export const LOGIN_WITH_FACEBOOK = "LOGIN_WITH_FACEBOOK";
export const RESET_PASS = "RESET_PASS";
export const AUTH_MEMBER = "AUTH_MEMBER";
export const NEW_MEMBER = "NEW_MEMBER";
export const ALL_MEMBERS = "ALL_MEMBERS";
export const DELETED_MEMBER = "DELETED_MEMBER";
export const CREATED_USER = "CREATED_USER";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const createUser = (data) => async (dispatch) => {
  try {
    const response = await axios.post(`${rutaBack}/user/`, data);
    console.log(response);
    if (response.ok) {
      dispatch({
        type: CREATED_USER,
      });
      toast.success("Usuario creado y guardado");
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    toast.error("Error al crear usuario");
  }
};
export const authenticateUserFromSession = () => {
  return (dispatch) => {
    const hashedUserInfo = sessionStorage.getItem("user");

    if (hashedUserInfo) {
      try {
        const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
        const bytes = CryptoJS.AES.decrypt(hashedUserInfo, secretKey);
        const userInfo = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

        dispatch({
          type: AUTHENTICATE_USER_FROM_SESSION,
          payload: userInfo,
        });
      } catch (error) {
        console.error(
          "Error desencriptando la información del usuario:",
          error
        );
        toast.error("Error autenticando usuario");
      }
    }
  };
};

export const login = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${rutaBack}/login/`, formData, {
      withCredentials: true,
    });
    console.log(response);
    if (response.data.correctLogin) {
      const token = response.data.token;
      console.log(token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOGIN_ERROR" });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT, payload: false });
    deleteSessionToken();
    localStorage.setItem("authToken", "false");

    document.location.href = "/";
  } catch (error) {
    console.log(error);
  }
};

export const register = (formData) => async (dispatch) => {
  const endpoint = `${rutaBack}/user/`;

  try {
    const response = await axios.post(`${endpoint}`, formData);
    console.log(response);
    if (response.status === 200) {
      dispatch({ type: REGISTER_SUCCESS });

      // Log in the user after successful registration
      dispatch(login({ email: formData.email, password: formData.password }));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserById = (id) => {
  const endpoint = `${rutaBack}/user/`;
  return async (dispatch) => {
    try {
      let response = await axios.get(`${endpoint}/${id}`);
      dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const updateUserAddress = (formUpdate, navigate) => async (dispatch) => {
  const endpoint = `${rutaBack}/user/update`;

  try {
    const response = await axios.put(endpoint, formUpdate);

    if (response.status === 200) {
      dispatch({
        type: UPDATE_USER,
        payload: response.data,
      });
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (email) => async (dispatch) => {
  const endpoint = `${rutaBack}/user/forgot-password`;

  try {
    const response = await axios.post(endpoint, { email });
    if (response.status === 200) {
      dispatch({
        type: RESET_PASS,
        payload: true,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};
export const loginWithGoogle = (userInfo) => ({
  type: LOGIN_WITH_GOOGLE,
  payload: userInfo,
});

export const sendNewPassword = (formData) => async () => {
  const endpoint = `${rutaBack}/user/reset-password`;

  try {
    const response = await axios.post(endpoint, {
      password: formData.newPassword,
      token: formData.token,
    });
    if (response.status === 200) {
      console.log(response);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const newMember = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${rutaBack}/user/newmember`, formData);
    console.log(response);
    if (response.status === 200) {
      let timerInterval;
      Swal.fire({
        title: "Creando miembro!",
        html: "Esperemos un poco <b></b>.",
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const timer = Swal.getPopup().querySelector("b");
          timerInterval = setInterval(() => {
            timer.textContent = `${Swal.getTimerLeft()}`;
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "/members";
        }
      });
      dispatch({
        type: NEW_MEMBER,
        payload: response.data,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const authMember = (dni) => async () => {
  try {
    const response = await axios.post(`${rutaBack}/user/auth/member`, {
      dni: dni,
    });
    console.log(response);
    // if (response.data) {
    //   dispatch({
    //     type: AUTH_MEMBER,
    //     payload: response.data,
    //   });
    // }
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllMembers = () => async (dispatch) => {
  try {
    const response = await axios.get(`${rutaBack}/user/members`);
    dispatch({
      type: ALL_MEMBERS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMember = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`${rutaBack}/user/member/${id}`);
    console.log(response);
    dispatch({
      type: DELETED_MEMBER,
      payload: response,
    });
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: `${error.message}`,
      icon: "error",
      confirmButtonText: "Cool",
    });
  }
};
