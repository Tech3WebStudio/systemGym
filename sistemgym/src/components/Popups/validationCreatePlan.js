import { useMemo } from "react";

const useValidation = (formData) => {
  const errors = useMemo(() => {
    let validationErrors = {};

    if (!formData.nombre) {
      validationErrors.nombre = "El nombre es obligatorio.";
    } else if (formData.nombre.length < 3) {
      validationErrors.nombre = "El nombre debe tener al menos 3 caracteres.";
    }

    if (!formData.descripcion) {
      validationErrors.descripcion = "La descripción es obligatoria.";
    } else if (formData.descripcion.length < 10) {
      validationErrors.descripcion = "La descripción debe tener al menos 10 caracteres.";
    }

    if (!formData.precio) {
      validationErrors.precio = "El precio es obligatorio.";
    } else if (isNaN(formData.precio) || formData.precio <= 0) {
      validationErrors.precio = "El precio debe ser un número positivo.";
    }

    if (!formData.dias) {
      validationErrors.dias = "La cantidad de días es obligatoria.";
    } else if (!/^\d+$/.test(formData.dias)) {
      validationErrors.dias = "La cantidad de días debe ser un número.";
    }

    if (!formData.condiciones) {
      validationErrors.condiciones = "Las condiciones son obligatorias.";
    } else if (formData.condiciones.length < 10) {
      validationErrors.condiciones = "Las condiciones deben tener al menos 10 caracteres.";
    }

    return validationErrors;
  }, [formData]);

  return errors;
};

export default useValidation;
