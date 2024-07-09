const { User } = require("../../db.js");

const deleteMember = async (id) => {
    try {
      // Busca el miembro por ID y actualiza su estado a inactivo
      const member = await User.findByPk(id);
      if (!member) {
        throw new Error("Member not found");
      }
  
      // Realiza el borrado lógico, por ejemplo, estableciendo isActive a false
      member.isActive = false;
      await member.save();
  
      return member;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  module.exports = deleteMember;