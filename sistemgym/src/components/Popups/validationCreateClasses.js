import { useMemo } from "react";

const useValidation = (formData) => {
  const errors = useMemo(() => {
    let validationErrors = {};

    if (!formData.nombre) {
      validationErrors.nombre = "El nombre de la clase es requerido";
    }

    if (!formData.precio) {
      validationErrors.precio = "El precio es requerido";
    } else if (isNaN(formData.precio) || formData.precio <= 0) {
      validationErrors.precio = "El precio debe ser un número positivo";
    }

    if (!formData.plan) {
      validationErrors.plan = "El plan es requerido";
    }

    if (!formData.dias) {
      validationErrors.dias = "Los días son requeridos";
    }

    return validationErrors;
  }, [formData]);

  return errors;
};

export default useValidation;
