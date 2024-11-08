const validationLogin = (email, password) => {
  const errors = {};

  if (!email) {
    errors.email = "El email es obligatorio";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    errors.email = "El email no es válido";
  }

  if (!password) {
    errors.password = "La contraseña es obligatoria";
  } else if (password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres";
  }

  return errors;
};

export default validationLogin;
