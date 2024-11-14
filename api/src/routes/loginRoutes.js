const { Router } = require("express");
const loginRoutes = Router();
const login = require("../controllers/loginControllers/login");
const { verifyToken, isAdmin } = require("../middleware/authorization");
const authThird = require("../controllers/loginControllers/thirdPartyAuth");
loginRoutes.post("/", async (req, res) => {
  try {
    console.log("Cuerpo de la solicitud:", req.body);
    const { email, password } = req.body;
    const { correctLogin, token, cookieOption } = await login(email, password);
    console.log("Token recibido:", token); // Mueve esta línea aquí
    return res
      .status(200)
      .json({ message: "Correct login", token, correctLogin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

loginRoutes.post("/third", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token no proporcionado" });
    }

    const decodedToken = await verifyToken(token);
    const admin = await isAdmin(decodedToken.email);
    if (admin) {
      const theUser = await authThird(token);
      return res.json(theUser);
    }
  } catch (error) {
    console.error("Error en el inicio de sesión con Google:", error);
    res
      .status(500)
      .json({ message: "Error interno del servidor", error: error.message });
  }
});

module.exports = loginRoutes;
