const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
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
  if (!theUser) {
    console.error("Email incorrecto:", email);
    throw new Error("Wrong email");
  }

  const correctLogin = await bcryptjs.compare(password, theUser.password);
  if (!correctLogin) {
    console.error("Contraseña incorrecta para el usuario:", email);
    throw new Error("Incorrect password");
  }

  const token = jsonwebtoken.sign({ user: theUser.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
    sameSite: "Lax",
    secure: false,
  };

  return { correctLogin, token, cookieOption };
};


module.exports = login;
