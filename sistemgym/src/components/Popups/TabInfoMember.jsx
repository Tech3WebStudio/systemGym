const TabInfoMember = ({ isOpen, onClose, member }) => {
  if (!isOpen) return null; // Si el modal no está abierto, no renderizar nada

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md px-6 py-4 my-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="sm:flex sm:justify-between">
          <div className="flex items-center">
            <div className="ml-2">
              <h3 className="text-lg text-gray-800 font-medium">
                {member.name}{" "}{member.lastname}
              </h3>
              <span className="text-gray-600">{member.email}</span>
            </div>
          </div>
          <div className="mt-2 sm:mt-0">
            <button className="flex items-center text-white bg-blue-600 rounded px-2 py-1 hover:bg-blue-500 focus:outline-none focus:shadow-outline">
              <svg
                className="h-5 w-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span className="ml-1 text-sm">Follow</span>
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div>
            <h4 className="text-gray-600 text-sm"></h4>
            {member.isActive ? (
              <span className="mt-2 p-2 rounded-md text-md font-medium text-white bg-green-500">Activo</span>
            ) : (
              <span className="mt-2 p-2 rounded-md text-md font-medium text-white bg-red-500">Inactivo</span>
            )}
          </div>
          <div>
            <h4 className="text-gray-600 text-sm">Contacto</h4>
            <span className="mt-2 text-xl font-medium text-gray-800">
              {member.phone}
            </span>
          </div>
          <div>
            <h4 className="text-gray-600 text-sm">DNI</h4>
            <span className="mt-2 text-xl font-medium text-gray-800">{member.dni}</span>
          </div>
        </div>
        <div className="mt-3">
          <h4 className="text-gray-600 text-sm">Fecha de creacion</h4>
          <span className="mt-2 text-xl font-medium text-gray-800">{member.createdAt}</span>
        </div>
        <div className="mt-4">
          <h4 className="text-sm text-gray-600">45 Followers</h4>
          <div className="flex items-center overflow-hidden mt-2"></div>
        </div>
        <div className="mt-4">
          <h4 className="text-sm text-gray-600">250 Following</h4>
          <div className="flex items-center overflow-hidden mt-2"></div>
        </div>
        {/* <a className="block mt-4 text-blue-400 hover:underline" href="#">
          3 Collections
        </a> */}
      </div>
    </div>
  );
};

export default TabInfoMember;
