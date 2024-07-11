import { useState } from "react";
import useValidation from "./validationCreatePlan";
import { useDispatch } from "react-redux";
import { createPlans } from "../../redux/actions/actions";

const TabCreatePlan = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    dias: "",
    condiciones: "",
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
      dispatch(createPlans(formData));
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
          <label htmlFor="nombre">Nombre del plan</label>
          <input
            className="p-2 border border-gray-500 text-center"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Plan familiar"
          />
          {errors.nombre && (
            <span className="text-red-500">{errors.nombre}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="descripcion">Descripción del plan</label>
          <textarea
            className="p-2 border border-gray-500 text-center"
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Plan familiar a partir de 3 personas"
          />
          {errors.descripcion && (
            <span className="text-red-500">{errors.descripcion}</span>
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
          <label htmlFor="dias">Cantidad de días</label>
          <input
            className="p-2 border border-gray-500 text-center"
            type="text"
            name="dias"
            value={formData.dias}
            onChange={handleChange}
            placeholder="30"
          />
          {errors.dias && (
            <span className="text-red-500">{errors.dias}</span>
          )}
        </div>
        <div className="mt-4 flex flex-col">
          <label htmlFor="condiciones">Condiciones</label>
          <textarea
            className="p-2 border border-gray-500 text-center"
            type="text"
            name="condiciones"
            value={formData.condiciones}
            onChange={handleChange}
            placeholder="Minimo 3 personas, m"
          />
          {errors.condiciones && (
            <span className="text-red-500">{errors.condiciones}</span>
          )}
        </div>
        <button className="border border-gray-500 p-2 bg-teal-500 text-gray-200 hover:text-white hover:bg-teal-700 shadow-sm">
          Crear
        </button>
      </form>
    </div>
  );
};

export default TabCreatePlan;
