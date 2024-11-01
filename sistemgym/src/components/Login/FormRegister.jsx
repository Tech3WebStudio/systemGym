import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import validationRegister from "./validationRegister";
import { register } from "../../redux/actions/actions";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from "../../firebase"

export const FormRegister = () => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const memoizedErrors = useMemo(() => {
    return validationRegister(formData);
  }, [formData]);

  useEffect(() => {
    setErrors(memoizedErrors);
  }, [memoizedErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.keys(memoizedErrors).length === 0) {
      try {
        await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        console.log("Usuario registrado con éxito", user.email);
        dispatch(register(formData));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center text-2xl mb-6 text-gray-600 font-bold font-sans">
        Register
      </h1>
      <div className="mb-4">
        <label
          className="text-gray-800 font-semibold block my-3 text-md"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full bg-white px-4 py-2 rounded-lg focus:outline-none"
          type="text"
          name="name"
          id="name"
          placeholder="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && (
          <p className="text-red-500 text-xs italic">{errors.name}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="text-gray-800 font-semibold block my-3 text-md"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="w-full bg-white px-4 py-2 rounded-lg focus:outline-none"
          type="text"
          name="email"
          id="email"
          value={formData.email}
          placeholder="@email"
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="text-gray-800 font-semibold block my-3 text-md"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="w-full bg-white px-4 py-2 rounded-lg focus:outline-none"
          type="password"
          name="password"
          value={formData.password}
          id="password"
          placeholder="password"
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="text-gray-800 font-semibold block my-3 text-md"
          htmlFor="confirmPassword"
        >
          Confirm password
        </label>
        <input
          className="w-full bg-white px-4 py-2 rounded-lg focus:outline-none"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={formData.confirmPassword}
          placeholder="confirm password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs italic">
            {errors.confirmPassword}
          </p>
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-indigo-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
      >
        Register
      </button>
      <button
        type="submit"
        className="w-full mt-6 mb-3 bg-indigo-100 rounded-lg px-4 py-2 text-lg text-gray-800 tracking-wide font-semibold font-sans"
      >
        Login
      </button>
    </form>
  );
};
