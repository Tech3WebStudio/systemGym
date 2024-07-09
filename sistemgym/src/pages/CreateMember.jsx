import { Layout } from "../components/Layout/Layout";
import { useSelector } from "react-redux";
import FormCreateMember from "../components/Member/FormCreateMember";

const CreateMember = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <Layout isAuth={isAuth}>
      <div className="mt-8 border p-8 shadow-lg max-w-screen-lg bg-gray-50 flex justify-center items-center">
        <FormCreateMember />
      </div>
    </Layout>
  );
};

export default CreateMember;
