import { FormLogin } from "../components/Login/FormLogin";
import gymImg from "../assets/gym.webp";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src={gymImg}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full h-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>

        <FormLogin />
        <div className="mt-6 text-blue-500 text-center">
          <Link to={"/register"} className="hover:underline">
            Sign up Here
          </Link>
        </div>
      </div>
    </div>
  );
};
