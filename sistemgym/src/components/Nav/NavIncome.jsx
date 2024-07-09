import { Link } from "react-router-dom";

const NavIncome = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <header className="bg-gray-800 text-white p-4 flex w-screen justify-between items-center">
        <h1 className="text-2xl font-bold">Gimnasio XYZ</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/newmember" className="hover:text-gray-400">
                Suscribirse
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default NavIncome;
