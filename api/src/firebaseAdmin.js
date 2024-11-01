const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json'); // Descarga la clave privada de tu proyecto en Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;