import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { SingUp } from "./pages/SingUp";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isAuthenticated } from "./redux/actions/actions";
import jwtToken from "./components/getCookie";
import Income from "./pages/Income";
import Members from "./pages/Members";
import CreateMember from "./pages/CreateMember";
import Payments from "./pages/Payments";
import Classes from "./pages/Classes";
import Plans from "./pages/Plans";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);

  useEffect(() => {
    dispatch(isAuthenticated(jwtToken));
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<SingUp />} />
      <Route path="/income" element={<Income />} />
      {isAuth && (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members" element={<Members />} />
          <Route path="/createmember" element={<CreateMember />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/payment" element={<Payments />} />
          <Route path="/plans" element={<Plans />} />
        </>
      )}
    </Routes>
  );
}

export default App;
