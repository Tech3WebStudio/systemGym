import { FormRegister } from "../components/Login/FormRegister";
import gymImg from "../assets/gym.webp";

export const SingUp = () => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="w-1/2 h-full hidden lg:block">
        <img
          src={gymImg}
          alt="Placeholder Image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="lg:p-20 md:p-52 p-2 w-full h-full lg:w-1/2">
        <FormRegister />
      </div>
    </div>
  );
};
