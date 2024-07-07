const validationRegister = ({ name, password, confirmPassword, email }) => {
  let newErrors = {};

  if (!name || !name.trim()) {
    newErrors.name = "El nombre está vacío";
  } else if (!/^[a-zA-Z\s]*$/.test(name)) {
    newErrors.name = "El nombre no puede contener símbolos";
  } else if (name.length > 35) {
    newErrors.name = "El nombre no debe superar los 35 caracteres";
  }

  if (!password) {
    newErrors.password = "El password está vacío";
  } else if (password.length < 6) {
    newErrors.password = "El password debe tener al menos 6 caracteres";
  } else if (
    !/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(password)
  ) {
    newErrors.password = "El password debe contener al menos un número, una letra mayúscula, una letra minúscula y un símbolo especial";
  }

  if (!confirmPassword) {
    newErrors.confirmPassword = "El confirmar password está vacío";
  } else if (confirmPassword !== password) {
    newErrors.confirmPassword = "El password de confirmación no coincide con el nuevo password";
  }

  if (!email) {
    newErrors.email = "El correo electrónico está vacío";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "El correo electrónico no es válido";
  }

  return newErrors;
};

export default validationRegister;