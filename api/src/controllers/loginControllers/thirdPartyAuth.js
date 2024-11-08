const admin = require("firebase-admin");
const { User } = require('../../db.js');


const authThird = async (token) => {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      const { uid, email, email_verified, firebase, name, picture } = decodedToken;
  
      const userExist = await User.findOne({
        where: { email }
      });
  
      if(userExist) throw new Error("The user already exists");
  
      const [theUser, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          id_user: uid,
          name: name || " ",
          email_verified,
          sign_in_provider: firebase.sign_in_provider,
          picture: picture || " ",
        },
      });
  
      if (!created) {
        await theUser.update({
          email_verified,
        });
      }
  
      return theUser;
    } catch (error) {
      console.error("Error en el inicio de sesión con Google:", error);
      throw new Error(error.message);  // Proporciona el error detallado
    }
  };
  

module.exports = authThird;
