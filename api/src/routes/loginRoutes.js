const { Router } = require("express");
const loginRoutes = Router();
const login = require("../controllers/loginControllers/login");
const loginAuthorization = require("../controllers/loginControllers/loginAuthorization");
// const authThird = require("../controllers/loginControllers/thirdPartyAuth");

loginRoutes.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { correctLogin, token, cookieOption } = await login(email, password);
    res.cookie("jwt", token, cookieOption);
    return res
      .status(200)
      .json({ message: "Correct login", token, correctLogin });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

loginRoutes.post("/auth", async (req, res) => {
  try {
    const { token } = req.body;
    const auth = await loginAuthorization(token);
    return res.status(200).json(auth);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = loginRoutes;
