const { User, SpecialGroup, UserSpecialGroups, Plan } = require("../../db.js"); // Asegúrate de que la ruta sea correcta

const authMember = async (dni) => {
  // Validar que el DNI sea un número
  if (!/^\d+$/.test(dni)) {
    throw new Error("DNI inválido. Solo se permiten números.");
  }

  // Buscar el usuario en la base de datos por DNI
  const user = await User.findOne({
    where: { dni },
    include: [
      {
        model: SpecialGroup,
        through: { attributes: ['discount', 'benefits'] } // Incluye el descuento y beneficios del grupo especial
      },
      Plan // Incluye el plan del usuario
    ]
  });

  if (!user) {
    throw new Error("Usuario no encontrado.");
  }

  const isActive = user.plan && user.plan.active;
  // Si el plan no está activo, el usuario no tiene acceso
  if (!isActive) {
    return {
      status: 'error',
      message: 'El plan del usuario no está activo. Acceso denegado.'
    };
  }

  // Obtener los beneficios del grupo especial, si existen
  const specialGroups = user.SpecialGroups; // Obtener todos los grupos especiales asociados al usuario
  const discount = specialGroups.length > 0 ? specialGroups[0].UserSpecialGroups.discount : 0;
  const benefits = specialGroups.length > 0 ? specialGroups[0].UserSpecialGroups.benefits : 'No benefits';

  return {
    status: 'success',
    user,
    discount,
    benefits
  };
};

module.exports = authMember;
