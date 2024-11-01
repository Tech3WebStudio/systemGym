import axios from "axios";
import { deleteSessionToken } from "../../components/delCookie";
import Swal from 'sweetalert2';
import rutaBack from "./rutaBack";

export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const IS_AUTH = "IS_AUTH";
export const ISNT_AUTH = "ISNT_AUTH";
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

export const login = (formData) => async (dispatch) => {
  const endpoint = `${rutaBack}/login/`;
  try {
    const response = await axios.post(endpoint, formData, {
      withCredentials: true,
    });
    if (response.data.correctLogin) {
      dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    }
  } catch (error) {
    console.log(error);
    localStorage.setItem("isAuth", "false");
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

export const isAuthenticated = (jwtToken) => async (dispatch) => {
  try {
    if (jwtToken) {
      const response = await axios.post(`${rutaBack}/login/auth`, {
        token: jwtToken,
      });
      if (response.data) {
        dispatch({ type: IS_AUTH, payload: response.data });
      } else {
        dispatch({ type: ISNT_AUTH });
      }
    }
  } catch (error) {
    dispatch({ type: ISNT_AUTH });
  }
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
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = '/members'
        }
      });
      dispatch({
        type: NEW_MEMBER,
        payload: response.data
      })
    }
  } catch (error) {
    console.log(error.message);
    
  }
};

export const authMember = (dni) => async () => {
  try {
    const response = await axios.post(`${rutaBack}/user/auth/member`, {
      dni:dni
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
    const response = await axios.get(`${rutaBack}/user/members`)
    dispatch({
      type: ALL_MEMBERS,
      payload: response.data
    })
  } catch (error) {
    console.log(error.message)
  }
}

export const deleteMember = (id) => async(dispatch) => {
  try {
    const response = await axios.delete(`${rutaBack}/user/member/${id}`)
    console.log(response)
    dispatch({
      type: DELETED_MEMBER,
      payload: response
    })
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: `${error.message}`,
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
}