import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBTable, MDBTableHead, MDBTableBody, MDBBtn } from "mdb-react-ui-kit";
// import { toast } from "react-toastify";
import Header from "./Header";


const AdminPage = () => {
  const [apps, setApps] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    download_link: "",
    points: "",
  });
  const redirect = { url: '/pointstable', page: 'Points' };


  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      const response = await axios.get(`https://varjinth.pythonanywhere.com/apps/`, { withCredentials: true });

      setApps(response.data);
    } catch (error) {
      //   toast.error("Failed to load apps.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://varjinth.pythonanywhere.com/apps/`, formData, { withCredentials: true });
      //   toast.success("App added successfully!");
      alert("App added successfully!!!")
      fetchApps();
      setFormData({ name: "", description: "", download_link: "", points: "" });
    } catch (error) {
      //   toast.error("Failed to add app.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://varjinth.pythonanywhere.com/apps/${id}/`, { withCredentials: true });
      //   toast.success("App deleted successfully!");
      if (response.status === 200) {
        console.log("App deleted successfully!");
        alert("App deleted successfully!")
        fetchApps(); 

      } else {
        console.error("Unexpected response:", response);
      }

    } catch (error) {
      //   toast.error("Failed to delete app.");
    }
  };

  return (
    <>
      <Header redirect={redirect} />
      <MDBContainer className="mt-5" style={{ width: "40rem" }}>
        <h2 className="text-center mb-4">Admin Panel</h2>
        <MDBCard>
          <MDBCardBody>
            <h4 className="text-center mb-3">Add New App</h4>
            <form onSubmit={handleSubmit}>
              <MDBInput className="mb-3" type="text" name="name" label="App Name" value={formData.name} onChange={handleChange} required />
              <MDBInput className="mb-3" type="url" name="download_link" label="Download Link" value={formData.download_link} onChange={handleChange} required />
              <MDBInput className="mb-3" type="number" name="points" label="Points" value={formData.points} onChange={handleChange} required />
              <textarea className="form-control mb-3" name="description" placeholder="App Description" value={formData.description} onChange={handleChange} required />
              <MDBBtn color="primary" type="submit" block>
                Add App
              </MDBBtn>
            </form>
          </MDBCardBody>
        </MDBCard>

        {/* App List Table */}
        <MDBCard className="mt-4">
          <MDBCardBody>
            <h4 className="text-center mb-3">Existing Apps</h4>
            <MDBTable align="middle" hover>
              <MDBTableHead>
                <tr>
                  <th>App Name</th>
                  <th>Download Link</th>
                  <th>Points</th>
                  <th>Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {apps.map((app) => (
                  <tr key={app.id}>
                    <td>{app.name}</td>
                    <td>
                      <a href={app.download_link} target="_blank" rel="noopener noreferrer" className="text-primary">
                        Open
                      </a>
                    </td>
                    <td>{app.points}</td>
                    <td>
                      <MDBBtn color="danger" size="sm" onClick={() => handleDelete(app.id)}>
                        Delete
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>

  );
};

export default AdminPage;
