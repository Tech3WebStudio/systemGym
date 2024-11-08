const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

const login = async (email, password) => {
  console.log("Intentando iniciar sesión con:", { email });
  
  if (!email || !password) {
    console.error("Datos incompletos");
    throw new Error("Incomplete data");
  }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) {
    console.error("Email inválido:", email);
    throw new Error("Invalid email");
  }

  const theUser = await User.findOne({ where: { email } });
  console.log(theUser, "este seria el usuario al iniciar con password y email");
  
  if (!theUser) {
    console.error("Email incorrecto:", email);
    throw new Error("Wrong email");
  }

  const correctLogin = await bcryptjs.compare(password, theUser.password);
  console.log("Contraseña correcta:", correctLogin);

  if (!correctLogin) {
    console.error("Contraseña incorrecta para el usuario:", email);
    throw new Error("Incorrect password");
  }

  const token = await admin.auth().createCustomToken(theUser.id.toString());
  console.log("Token generado:", token);
  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
    sameSite: "Lax",
    secure: false,
  };

  return { correctLogin, token, cookieOption };
};


module.exports = login;
