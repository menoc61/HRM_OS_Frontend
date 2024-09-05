import { Navigate } from "react-router-dom";
import PageTitle from "../page-header/PageHeader";
import AddRole from "./AddRole";

const RoleList = (props) => {
  const isLogged = Boolean(localStorage.getItem("isLogged"));

  if (!isLogged) {
    return <Navigate to={"/admin/auth/login"} replace={true} />;
  }
  return (
    <div>
      <PageTitle title="Retour" />
      <AddRole />
    </div>
  );
};

export default RoleList;
