import React from "react";
import { MDBNavbar, MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = ({ redirect }) => {
  const navigate = useNavigate();
  const onLogout = async () => {
    try {
      await axios.post("/logout/", {}, { withCredentials: true });
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <MDBNavbar light bgColor="light" className="d-flex justify-content-between px-3 py-2">
      <MDBBtn color="light" onClick={() => navigate(redirect.url)}>
        <MDBIcon fas icon="arrow-left" className="me-2" /> {redirect.page}
      </MDBBtn>
      <MDBBtn color="danger" onClick={onLogout}>
        Logout <MDBIcon fas icon="sign-out-alt" className="ms-2" />
      </MDBBtn>
    </MDBNavbar>
  );
};

export default Header;
