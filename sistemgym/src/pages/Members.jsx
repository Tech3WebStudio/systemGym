import { useDispatch, useSelector } from "react-redux";
import { Layout } from "../components/Layout/Layout";
import { useEffect, useState } from "react";
import { deleteMember, getAllMembers } from "../redux/actions/actions";
import { Link } from "react-router-dom";
import TabInfoMember from "../components/Popups/TabInfoMember";
import Swal from "sweetalert2";

const Members = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const allMembers = useSelector((state) => state.members.allMembers);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  const toggleModal = (member) => {
    setSelectedMember(member);
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  // Calcular los miembros a mostrar en la página actual
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = allMembers.slice(
    indexOfFirstMember,
    indexOfLastMember
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(allMembers.length / membersPerPage);

  // Manejadores de cambio de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleDeleteMember = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            dispatch(deleteMember(id));
            swalWithBootstrapButtons.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } catch (error) {
            Swal.fire({
              title: "Error!",
              text: `${error.message}`,
              icon: "error",
              confirmButtonText: "Cool",
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <Layout isAuth={isAuth}>
      {isOpen && (
        <TabInfoMember
          isOpen={isOpen}
          onClose={toggleModal}
          member={selectedMember}
        />
      )}
      <div className="flex justify-between">
        <h1 className="text-gray-400">Members</h1>
        <Link
          to={"/createmember"}
          className="p-2 border shadow-lg rounded-lg bg-green-500 text-gray-100 active:translate-y-1 hover:text-white hover:bg-green-600"
        >
          Create member
        </Link>
      </div>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>Miembro</td>
            <td>Activo</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody>
          {currentMembers.length > 0 ? (
            currentMembers.map((member, i) => (
              <tr key={i}>
                <td>
                  {member.name} {member.lastname}
                </td>
                <td>
                  <span
                    className={`text-white m-1 p-2 ${
                      member.isActive ? "bg-green-500" : "bg-red-500"
                    } rounded-full`}
                  >
                    {member.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="flex gap-2">
                  <button
                    onClick={() => toggleModal(member)}
                    className="p-2 rounded-full border hover:border-gray-400"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="p-2 rounded-full border border-red-400 text-red-400 hover:border-red-600 hover:text-red-600"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full border border-green-400 text-green-400 hover:border-green-600 hover:text-green-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Cargando...</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="p-2 border rounded-lg bg-gray-300 disabled:bg-gray-200"
        >
          Anterior
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="p-2 border rounded-lg bg-gray-300 disabled:bg-gray-200"
        >
          Siguiente
        </button>
      </div>
    </Layout>
  );
};

export default Members;
