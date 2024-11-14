const { User } = require("../../db.js");
const bcryptjs = require("bcryptjs");
const admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

const login = async (email) => {

  if (!email) {
    throw new Error("Incomplete data");
  }

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regexEmail.test(email)) {
    throw new Error("Invalid email");
  }

  const theUser = await User.findOne({ where: { email } });

  if (!theUser) {
    throw new Error("Wrong email");
  }

  const clave = await admin.auth().createCustomToken(theUser.token);
  const cookieOption = {
    maxAge: 24 * 60 * 60 * 1000,
    path: "/",
    sameSite: "Lax",
    secure: false,
  };

  return { clave, cookieOption };
};

module.exports = login;
