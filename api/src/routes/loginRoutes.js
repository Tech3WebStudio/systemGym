const { Router } = require("express");
const loginRoutes = Router();
const login = require("../controllers/loginControllers/login");
const { verifyToken, isAdmin } = require("../middleware/authorization");
const authThird = require("../controllers/loginControllers/thirdPartyAuth");
loginRoutes.post("/", async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = await verifyToken(token);
    const email = decodedToken.email;

    const { clave, cookieOption } = await login(email);
    return res
      .status(200)
      .json({ message: "Correct login", clave, cookieOption });
  } catch (error) {
    console.log(error);
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
