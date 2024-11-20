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
import {
  createUser,
  loginWithGoogle,
  authenticateUserFromSession,
  login
} from "../redux/actions/actions";





export const doSignInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();

    const response = await fetch(`${rutaBack}/login/third`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token }),
    });

    if (response.ok) {
     console.log( "Ingreso exitoso, redirigiendo..");
      const { theUser } = await response.json();
      const { id, email, displayName, photoURL } = result.user;

      const userInfo = {
        id,
        email,
        name: displayName,
        picture: photoURL,
      };

      const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;

      const hashedUserInfo = CryptoJS.AES.encrypt(
        JSON.stringify(userInfo),
        secretKey
      ).toString();

      sessionStorage.setItem("user", hashedUserInfo);
      localStorage.setItem("authToken", token);

      store.dispatch(loginWithGoogle(userInfo));
    } else {
      toast.error("Error al ingresar");
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error:", error);
    toast.error("Error al ingresar");
  }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  try {
    // Validar que los valores de correo y contraseña no sean vacíos
    if (!email || !password) {
      toast.error("Por favor ingresa tu correo y contraseña.");
      return;
    }

    // Intentar iniciar sesión con Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Obtener el token del usuario
    const token = await user.getIdToken();
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Token:", token);

    // Hacer la petición al backend con el token de autenticación
    const response = await fetch(`${rutaBack}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ email: user.email }),
    });

    console.log("Respuesta del servidor:", response);

    if (response.ok) {
      toast.success("Ingreso exitoso, redirigiendo..");

      // Obtener los datos del usuario para almacenarlos en el almacenamiento seguro
      const userInfo = { 
        uid: user.uid, // Obtener el uid del usuario de Firebase
        email: user.email, // Obtener el email del usuario de Firebase
        // ... otras propiedades que necesites ...
      };

      const sellerData = await response.json();
      console.log(sellerData);

      // Cifrar la información del usuario
      const secretKey = import.meta.env.VITE_SECRET_KEY_BYCRYPT;
      const hashedUserInfo = CryptoJS.AES.encrypt(
        JSON.stringify(userInfo),
        secretKey
      ).toString();

      // Almacenar la información cifrada en sessionStorage y localStorage
      sessionStorage.setItem("user", hashedUserInfo);
      localStorage.setItem("authToken", token);

      // Hacer el dispatch de la acción login
      store.dispatch(login(userInfo));
    } else {
      toast.error("Error al ingresar");
      console.error("Error en la respuesta:", response.status, response.statusText);
      throw new Error("Error al enviar el token al backend");
    }
  } catch (error) {
    console.error("Error al ingresar:", error);
    toast.error("Error al ingresar");

    // Manejo de errores según el tipo de error
    if (error.code === "auth/user-not-found") {
      toast.error("El usuario no existe");
    } else if (error.code === "auth/wrong-password") {
      toast.error("La contraseña es incorrecta");
    } else {
      toast.error("Error desconocido en el inicio de sesión");
    }
  }
};


/*export const createNewSeller = async (newSeller) => {
  try {
    const { email, nombre, password, role } = newSeller;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Despacha la acción para crear el usuario en tu backend y guardarlo en Google Sheets
    store.dispatch(createSeller(user.email, nombre, user.uid, role));

    toast.success("Usuario creado exitosamente");
  } catch (error) {
    console.log("Error al crear nuevo vendedor:", error);
    toast.error("Error al crear nuevo vendedor");
  }
};*/

export const createNewUser = async (newUser) => {
  try {
    const { name, state, postalCode, address, email, password, role } = newUser;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
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
    // Despacha la acción para crear el usuario en tu backend y guardarlo en Google Sheets
    store.dispatch(createUser(data));

    toast.success("Usuario creado exitosamente");
  } catch (error) {
    console.log(error);
    toast.error("Error al crear nuevo usuario");
  }
};

export const doSignOut = async () => {
  try {
    // Eliminar datos de sessionStorage y localStorage
    sessionStorage.removeItem("user");
    localStorage.removeItem("authToken");

    // Cerrar la sesión con Firebase Auth
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("Saliendo...");
      })
      .catch((error) => {
        // An error happened.
        toast.error("Error");
        console.log(error);
      });
    // Redireccionar a la página de inicio de sesión u otra página
    window.location.replace("/");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};
