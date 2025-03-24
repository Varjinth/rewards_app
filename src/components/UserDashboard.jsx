import React, { useState, useEffect, useCallback } from "react";
import { MDBCard, MDBCardBody, MDBContainer, MDBAccordion, MDBAccordionItem, MDBTable, MDBTableHead, MDBTableBody, MDBBtn} from "mdb-react-ui-kit";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Header from "./Header";

const UserDashboard = () => {
  const [user, setUser] = useState({ name: "", points: 0 });
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const redirect = { url: '/', page: 'Home' };
  const axiosInstance = axios.create({
    withCredentials: true,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingRes = await axiosInstance.get("https://varjinth.pythonanywhere.com/tasks/pending/");
        const completedRes = await axiosInstance.get("https://varjinth.pythonanywhere.com/tasks/completed/");
        const userRes = await axiosInstance.get('https://varjinth.pythonanywhere.com/user/details/')

        setPendingTasks(pendingRes.data);
        setCompletedTasks(completedRes.data);
        setUser(userRes.data)

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const onDrop = useCallback((acceptedFiles) => {
    setUploadedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

  const handleUpload = async () => {
    if (!uploadedFile || !selectedTask) return;

    const formData = new FormData();
    formData.append("screenshot", uploadedFile);
    formData.append("app_id", selectedTask.id);

    try {
      const response = await axios.post(`https://varjinth.pythonanywhere.com/tasks/`, formData, { withcredentials: true });
      if (response.status === 201) {
        alert("Screenshot uploaded successfully for " + selectedTask.name);
        setUploadedFile(null);
        setSelectedTask(null);
        const pendingRes = await axiosInstance.get("https://varjinth.pythonanywhere.com/tasks/pending/");
        const completedRes = await axiosInstance.get("https://varjinth.pythonanywhere.com/tasks/completed/");
        const userRes = await axiosInstance.get('https://varjinth.pythonanywhere.com/user/details/')
        setPendingTasks(pendingRes.data);
        setCompletedTasks(completedRes.data);
        setUser(userRes.data)
      } else {
        alert("Failed to upload screenshot.");
      }
    } catch (error) {
      console.error("Error uploading screenshot:", error);
    }
  };


  return (
    <>
      <Header redirect={redirect} />
      <MDBContainer>
        <MDBCard className="mt-4">
          <MDBCardBody>
            <h4 className="text-center">User Dashboard</h4>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Name: {user.name}</h5>
              <h5>Points Earned: {user.points}</h5>
            </div>

            <MDBAccordion alwaysOpen>
              {/* Pending Tasks Section */}
              <MDBAccordionItem collapseId="pendingTasks" headerTitle="Pending Tasks">
                {pendingTasks.length > 0 ? (
                  <MDBTable align="middle" hover>
                    <MDBTableHead>
                      <tr>
                        <th>App Name</th>
                        <th>Download Link</th>
                        <th>Points</th>
                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {pendingTasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.name}</td>
                          <td><a href={task.download_link} target="_blank" rel="noopener noreferrer">Download</a></td>
                          <td>{task.points}</td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                ) : (
                  <p>No pending tasks.</p>
                )}
              </MDBAccordionItem>

              {/* Completed Tasks Section */}
              <MDBAccordionItem collapseId="completedTasks" headerTitle="Completed Tasks">
                {completedTasks.length > 0 ? (
                  <MDBTable align="middle" hover>
                    <MDBTableHead>
                      <tr>
                        <th>App Name</th>
                        <th>Screenshot Link</th>
                        <th>Points</th>

                      </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                      {completedTasks.map((task) => (
                        <tr key={task.id}>
                          <td>{task.app_name}</td>
                          <td><a href={task.screenshot} target="_blank" rel="noopener noreferrer">Screenshot</a></td>

                          <td>{task.points}</td>
                        </tr>
                      ))}
                    </MDBTableBody>
                  </MDBTable>
                ) : (
                  <p>No completed tasks.</p>
                )}
              </MDBAccordionItem>


              {/* Upload Screenshot Section */}
              <MDBAccordionItem collapseId="uploadScreenshot" headerTitle="Upload Screenshot">
                <h5>Select Task</h5>
                <div className="mb-3">
                  <select className="form-select" id="taskSelect" onChange={(e) => setSelectedTask(pendingTasks.find(task => task.id === parseInt(e.target.value)))}>
                    <option value="">Choose a Pending Task</option>
                    {pendingTasks.map((task) => (
                      <option key={task.id} value={task.id}>{task.name}</option>
                    ))}
                  </select>
                </div>
                <h5 className="mt-3">Upload Screenshot</h5>
                <div {...getRootProps()} className="border p-3 text-center" style={{ cursor: "pointer" }}>
                  <input {...getInputProps()} />
                  {uploadedFile ? <p>{uploadedFile.name}</p> : <p>Drag & Drop an image or click to upload</p>}
                </div>
                <MDBBtn className="mt-3" color="primary" onClick={handleUpload} disabled={!selectedTask}>
                  Upload
                </MDBBtn>
              </MDBAccordionItem>
            </MDBAccordion>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};

export default UserDashboard;