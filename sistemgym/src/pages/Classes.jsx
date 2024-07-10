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
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            {classes.length > 0 &&
              classes.map((clase, i) => (
                <div key={i} className="w-full md:w-1/2 xl:w-1/3 px-4">
                  <div className="bg-gray-300 border shadow-md text-center rounded-lg overflow-hidden mb-10">
                    
                    <div className="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                      <h3>
                        <button
                          className="
                            font-semibold
                            text-dark text-xl
                            sm:text-[22px]
                            md:text-xl
                            lg:text-[22px]
                            xl:text-xl
                            2xl:text-[22px]
                            mb-4
                            block
                            hover:text-primary
                            "
                        >
                        {clase.nombre}
                        </button>
                      </h3>
                      <p className="text-base text-body-color leading-relaxed mb-7">
                        {clase.dias}
                      </p>
                      <button
                        className="
                         inline-block
                         py-2
                         px-7
                         border border-[#E5E7EB]
                         rounded-full
                         text-base text-body-color
                         font-medium
                         hover:border-primary hover:bg-primary hover:text-white
                         transition
                         "
                      >
                        {clase.precio}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Classes;
