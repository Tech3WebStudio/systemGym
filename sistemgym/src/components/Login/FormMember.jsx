import { useState } from "react";
import validationDni from "./validationDni"; 
import { useDispatch } from "react-redux";
import { authMember } from "../../redux/actions/actions";

const FormMember = () => {
  const [dni, setDni] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDni(value);
    validationDni({ [name]: value }, errors, setErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length === 0) {
      // Aquí puedes despachar la acción para enviar los datos
      dispatch(authMember(dni));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center flex-col"
    >
      <div className="text-center mt-16 text-4xl">
        <label htmlFor="ingresar">Ingresar</label>
        <input
          type="number"
          name="dni"
          value={dni}
          onChange={handleChange}
          className="bg-white w-full p-4 text-center mt-4 rounded-md border border-gray-400"
        />
        {errors.dni && (
          <p className="text-red-500 text-xs italic mt-2">{errors.dni}</p>
        )}
      </div>
      <button
        type="submit"
        className="p-4 shadow-lg bg-blue-300 text-gray-500 rounded-md text-center border mt-2 hover:bg-blue-500 hover:text-white active:translate-y-1 active:bg-blue-500 w-96"
      >
        Ingresar
      </button>
    </form>
  );
};

export default FormMember;
