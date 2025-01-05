import CryptoJS from "crypto-js";
import toast from "react-hot-toast";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import rutaBack from "../redux/actions/rutaBack";
import { auth } from "./firebase";
import store from "../redux/store";
import { createUser, loginWithGoogle } from "../redux/actions/actions";

const storeUserData = (userInfo, token) => {
  if (!userInfo || !token) {
    console.error("Datos de usuario o token no definidos:", userInfo, token);
    toast.error("Datos de usuario o token no disponibles.");
    return;
  }

  const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
  if (!secretKey) {
    console.error("La clave secreta no está definida.");
    toast.error("Error en la configuración de la clave secreta.");
    return;
  }

  try {
    // Asegurarse de que userInfo esté bien estructurado antes de cifrarlo
    if (typeof userInfo !== "object" || Array.isArray(userInfo)) {
      throw new Error("El formato de userInfo no es válido.");
    }

    const hashedUserInfo = CryptoJS.AES.encrypt(
      JSON.stringify(userInfo),
      secretKey
    ).toString();

    sessionStorage.setItem("user", hashedUserInfo);
    localStorage.setItem("authToken", token);

    // Si deseas también usar Redux para almacenar el usuario, puedes despachar la acción aquí
    store.dispatch(loginWithGoogle(userInfo));

  } catch (error) {
    console.error("Error al cifrar los datos:", error);
    toast.error("Error al procesar los datos del usuario.");
  }
};

// Iniciar sesión con Google
export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await fetch(`${rutaBack}/login/third`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) throw new Error("Error al enviar el token al backend");

    const data = await response.json();
    console.log("Datos recibidos del backend:", data);

    if (data && data.uid) {
      const theUser = data;
      console.log("Objeto theUser:", theUser);
      console.log("uid de theUser:", theUser.uid);
    } else {
      console.error("La respuesta no contiene 'uid'. Datos completos:", data);
      throw new Error("Faltan datos del usuario (uid) en la respuesta del backend");
    }

    const { photoURL } = result.user;

    const userInfo = {
      uid: data.uid,
      email: data.email,
      name: data.name,
      picture: photoURL,
      rol: data.role,
    };

    storeUserData(userInfo, token);
    store.dispatch(loginWithGoogle(userInfo));

    toast.success("Ingreso exitoso, redirigiendo...");
    setTimeout(() => {
      const redirectPath = userInfo.rol === "user" || userInfo.rol === "admin" ? "/dashboard" : "/";
      window.location.replace(redirectPath);
    }, 2000);
  } catch (error) {
    console.error("Error:", error);
    toast.error(error.message || "Error al ingresar");
  }
};

// Iniciar sesión con email y contraseña
export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();

    const response = await fetch(`${rutaBack}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
      toast.success("Ingreso exitoso, redirigiendo..");
      const sellerData = await response.json();
      let userInfo;

      if (sellerData.rol === "user") {
        userInfo = {
          uid: sellerData.uid,
          email: sellerData.email,
          name: sellerData.nombre,
          direccion: sellerData.direccion,
          provincia: sellerData.provincia,
          cp: sellerData.cp,
          rol: sellerData.rol,
        };
      } else {
        userInfo = {
          uid: sellerData.uid,
          email: sellerData.email,
          name: sellerData.nombre,
          rol: sellerData.rol,
        };
      }

      storeUserData(userInfo, token);

      setTimeout(() => {
        if (sellerData.rol === "seller" || sellerData.rol === "admin") {
          window.location.replace(`/dashboard`);
        } else {
          window.location.replace("/");
        }
      }, 2000);
    } else {
      toast.error("Error al ingresar");
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error al ingresar:", error);
    toast.error("Error al ingresar");
  }
};

// Crear nuevo usuario
export const createNewUser = async (newUser) => {
  try {
    const { name, state, postalCode, address, email, password, role } = newUser;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    let data = {
      uid: user.uid,
      email: user.email,
      name,
      address,
      state,
      postalCode,
      role,
    };
    store.dispatch(createUser(data));

    toast.success("Usuario creado exitosamente");
  } catch (error) {
    console.log(error);
    toast.error("Error al crear nuevo usuario");
  }
};

// Cerrar sesión
export const doSignOut = async () => {
  try {
    sessionStorage.removeItem("user");
    localStorage.removeItem("authToken");

    await signOut(auth)
      .then(() => {
        toast.success("Saliendo...");
      })
      .catch((error) => {
        toast.error("Error");
        console.log(error);
      });

    window.location.replace("/");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
