import { useSelector } from "react-redux";
import { Layout } from "../components/Layout/Layout";
import SelectPayments from "../components/Payment/SelectPayments";

const Payments = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  return (
    <Layout isAuth={isAuth}>
      <div>
        <SelectPayments />
      </div>
    </Layout>
  );
};

export default Payments;
