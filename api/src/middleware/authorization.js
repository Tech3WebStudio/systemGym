const admin = require("firebase-admin");
const serviceAccount = require('../../serviceAccountKey.json'); // Ajusta la ruta al archivo

// Inicializa la aplicación de Firebase Admin con el archivo JSON
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send("Authorization header missing");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;

    // Verifica si el usuario tiene permisos para acceder a los datos de Google Sheets
    const allowedUsers = [
      "niveyrojulian5@gmail.com",
      "claudioarganaraz86@gmail.com",
      "matiassjv@gmail.com"
    ];
    if (!allowedUsers.includes(decodedToken.email)) {
      return res.status(403).send("Forbidden: User does not have access");
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send("Unauthorized");
  }
}

async function verifyToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Token verification failed");
  }
}

async function isAdmin(email) {
  const adminEmails = [
    "niveyrojulian5@gmail.com",
    "sebastiannahuelmieres@gmail.com",
    "matiascarballo433@gmail.com"
  ];
  return adminEmails.includes(email);
}

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decodedToken = await verifyToken(token);
    const email = decodedToken.email;

    if (await isAdmin(email)) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: "User is not authorized" });
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  authMiddleware,
  verifyToken,
  isAdmin,
  authenticateToken,
};
