import {
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_WITH_GOOGLE,
  LOGIN_WITH_FACEBOOK,
  LOGOUT,
  UPDATE_USER,
  RESET_PASS,
  AUTHENTICATE_USER_FROM_SESSION,
  CREATED_USER,
} from "../actions/actions";

const initialState = {
  user: {},
  isAuth: false,
  registering: false,
  registerError: null,
  loginError: null,
  mailExist: false,
  error: null,
};
function logError(message) {
  // Define la función logError
  if (import.meta.env.DEV) {
    console.error(message);
  }
}
const authReducer = (state = initialState, action) => {
  console.log("Acción recibida:", action);
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      return { ...state, registering: true };

    case LOGIN_SUCCESS:
      return { ...state, isAuth: payload, user: payload };

    case LOGOUT:
      return { ...state, isAuth: false, user: {} };

    case LOGIN_WITH_GOOGLE:
      return { ...state, isAuth: true, user: payload };

    case LOGIN_WITH_FACEBOOK:
      return { ...state, isAuth: true, user: payload };
    case UPDATE_USER:

    case AUTHENTICATE_USER_FROM_SESSION:
      return { ...state, isAuth: payload };
    case RESET_PASS:
      return { ...state, mailExist: payload };

    case CREATED_USER:
      return { ...state, user: payload, isAuth: true };
    case "LOGIN_ERROR":
      logError("Error al iniciar sesión");
      return {
        ...state,
        isAuth: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
