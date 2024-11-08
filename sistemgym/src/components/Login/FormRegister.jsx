import { useDispatch } from "react-redux";
import validationRegister from "./validationRegister";
import {createNewUser} from '../../firebase/auth'
import {useState} from 'react'
import { getAuth } from "firebase/auth";

export const FormRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const dispatch = useDispatch();

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const data = {
        name: name,
        email: email,
        password: password,
      };
      await createNewUser(data, auth, dispatch);
    } catch (error) {
      console.log(error);
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
          value={name}
          onChange={(e)=>setName(e.target.value)}
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
          value={email}
          placeholder="@email"
          onChange={(e)=>setEmail(e.target.value)}
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
          value={password}
          id="password"
          placeholder="password"
          onChange={(e)=>setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
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
