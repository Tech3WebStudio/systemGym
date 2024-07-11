import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout/Layout";
// import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TabCreateClasses from "../components/Popups/TabCreateClasses";
import { allClasses } from "../redux/actions/actions";

const Classes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(allClasses());
  }, [dispatch]);

  const classes = useSelector((state) => state.class.allClasses);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <Layout isAuth={isAuth}>
      {isOpen && <TabCreateClasses onClose={toggleModal} />}
      <div className="flex justify-between">
        <h1 className="text-gray-400 text-xl">Clases</h1>
        <button
          onClick={() => toggleModal()}
          className="p-2 rounded-md text-center border border-gray-300 bg-teal-600 hover:bg-teal-700 hover:shadow-md text-white"
        >
          Crear clase
        </button>
      </div>
      <section className="pt-20 ">
        <div className="flex flex-wrap gap-4 justify-center items-center">
          {classes.length > 0 &&
            classes.map((clase, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg max-w-60">
                <div className="flex flex-col items-center p-10 bg-gray-200">
                  <span className="font-semibold">{clase.nombre}</span>
                  <div className="flex items-center">
                    <span className="text-3xl">$</span>
                    <span className="text-6xl font-bold">{clase.precio}</span>
                    <span className="text-2xl text-gray-500">/ARS</span>
                  </div>
                </div>
                <div className="p-10">
                  <ul>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2 italic">{clase.dias}</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-600 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-2">{clase.plan}</span>
                    </li>
                  </ul>
                </div>
                <div className="flex px-10 pb-10 justfy-center">
                  <button className="flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-gray-200 rounded-lg">
                    Join now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
};

export default Classes;
