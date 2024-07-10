import React, { useState } from "react";
import useValidation from "./validationCreateClasses";
import "react-multi-date-picker/styles/colors/teal.css";
import { useDispatch } from "react-redux";
import { createClasses } from "../../redux/actions/actions";

const TabCreateClasses = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    plan: "",
    dias: "",
  });
  const [errors, setErrors] = useState({});
  const validationErrors = useValidation(formData);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log(formData);
      dispatch(createClasses(formData))
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white text-center shadow-md p-4 rounded-xl w-full max-w-sm space-y-6 flex flex-col"
      >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-3xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="nombre">Nombre de la clase</label>
          <input
            className="p-2 border border-gray-500 text-center"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Pilates"
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="precio">Precio</label>
          <input
            className="p-2 border border-gray-500 text-center"
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            placeholder="5000"
          />
          {errors.precio && (
            <span className="text-red-500">{errors.precio}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="plan">Plan</label>
          <select
            className="p-2 border border-gray-500 text-center"
            name="plan"
            value={formData.plan}
            onChange={handleChange}
          >
            <option value="">Seleccione un plan</option>
            <option value="plan1">Plan 1</option>
            <option value="plan2">Plan 2</option>
            <option value="plan3">Plan 3</option>
          </select>
          {errors.plan && <span className="text-red-500">{errors.plan}</span>}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="dias">Dias</label>
          <input
            className="p-2 border border-gray-500 text-center"
            type="text"
            name="dias"
            value={formData.dias}
            onChange={handleChange}
            placeholder="Lunes, miercoles, viernes"
          />
          {errors.dias && <span className="text-red-500">{errors.dias}</span>}
        </div>
        <button className="border border-gray-500 p-2 bg-teal-500 text-gray-200 hover:text-white hover:bg-teal-700 shadow-sm">
          Crear
        </button>
      </form>
    </div>
  );
};

export default TabCreateClasses;
