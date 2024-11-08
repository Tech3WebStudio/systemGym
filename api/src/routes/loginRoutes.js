const { Router } = require("express");
const loginRoutes = Router();
const { User } = require("../db");
const login = require("../controllers/loginControllers/login");
const { verifyToken, isAdmin } = require("../middleware/authorization")
const authThird = require("../controllers/loginControllers/thirdPartyAuth");
const { sign } = require("jsonwebtoken");

loginRoutes.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { correctLogin, token, cookieOption } = await login(email, password);
    return res
      .status(200)
      .json({ message: "Correct login", token, correctLogin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

loginRoutes.post('/third', async (req, res) => {
  try {
    const { token } = req.body;  
    console.log(token);
    // Asegúrate de que el token esté presente en el cuerpo

    if (!token) {
      return res.status(400).json({ message: "Token no proporcionado" });
    }

    const decodedToken = await verifyToken(token); 
    console.log(decodedToken);
     // Verifica el ID token con Firebase

    // Si el token es válido, procede con el inicio de sesión
    const { uid, email, name, picture } = decodedToken;


    const theUser = await User.findOne({ where: { email } });
    console.log(theUser);
    
    if(theUser){
      await theUser.update({
        id_user: uid,
        sign_in_provider: "google",
        picture: picture || " ",
      });
    }else{
      theUser = await User.create({
        id_user: uid,
        name: name || " ",
        email_verified: decodedToken.email_verified,
        sign_in_provider: "google",
        picture: picture || " ",
      });
    }
    return res.json(theUser);  // Envía el usuario al frontend
  } catch (error) {
    console.error("Error en el inicio de sesión con Google:", error);
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
  }
});


module.exports = loginRoutes;
