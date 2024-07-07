import { Layout } from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import FormCreateMember from "../components/Member/FormCreateMember";

const CreateMember = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Layout isAuth={isAuth}>
      <div className="mt-8 border shadow-lg bg-gray-50">
        <FormCreateMember />
      </div>
    </Layout>
  );
};

export default CreateMember;
