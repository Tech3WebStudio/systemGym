const validationDni = (formData, errors, setErrors) => {
  const { dni } = formData;
  let newErrors = { ...errors };

  // Validar que el DNI sea un número y tenga una longitud mínima de 7 caracteres (puedes ajustar este valor según tus necesidades)
  if (!/^\d+$/.test(dni)) {
    newErrors.dni = "El DNI debe ser un número.";
  } else if (dni.length < 7) {
    newErrors.dni = "El DNI debe tener al menos 7 dígitos.";
  } else {
    delete newErrors.dni;
  }

  setErrors(newErrors);
};

export default validationDni;
