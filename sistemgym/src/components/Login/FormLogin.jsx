import { GoogleAuthProvider } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/actions";
import validationLogin from "./validationLogin";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

export const FormLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const isAuth = useSelector((state) => state.auth.isAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validationLogin({ ...formData, [name]: value }, errors, setErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validationLogin(formData, errors, setErrors);
    const noErrors = Object.keys(errors).every((key) => errors[key] === "");

    if (noErrors) {
      try {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        dispatch(login(formData));

        /*setTimeout(() => {
          window.location.reload();
        }, 2000);*/
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Usuario de google", user);
    } catch (error) {
      console.log(error);
    }
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/dashboard");
    }
  }, [isAuth, navigate]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic">{errors.email}</p>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-600">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          onChange={handleChange}
        />
        {errors.password && (
          <p className="text-red-500 text-xs italic">{errors.password}</p>
        )}
      </div>
      <div className="mb-4 flex items-center">
        <input
          type="checkbox"
          id="remember"
          name="remember"
          className="text-blue-500"
        />
        <label htmlFor="remember" className="text-gray-600 ml-2">
          Remember Me
        </label>
      </div>
      <div className="mb-6 text-blue-500">
        <a href="#" className="hover:underline">
          Forgot Password?
        </a>
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Login
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"onClick={handleLoginWithGoogle}>Iniciar sesión con Google</button>
    </form>
  );
};
