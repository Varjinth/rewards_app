import React, { useEffect, useState } from "react";
import axios from "axios";
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBSpinner } from "mdb-react-ui-kit";
import Header from "./Header";

const UsersPointsTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const redirect = { url: '/rewards', page: 'Home' };


    useEffect(() => {
        axios
            .get("/user/details/", { withCredentials: true }) // Fetch user points API
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load data");
                setLoading(false);
            });
    }, []);

    return (
        <>
            <Header redirect={redirect} />
            <MDBContainer className="mt-4">
                <h3 className="text-center mb-3">Users' Earned Points</h3>
                {loading && <MDBSpinner color="primary" className="d-flex justify-content-center" />}

                {/* {error && <MDBAlert color="danger">{error}</MDBAlert>} */}

                {!loading && !error && (
                    <MDBTable align="middle" bordered hover responsive>
                        <MDBTableHead dark>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Points Earned</th>
                            </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                            {users.length > 0 ? (
                                users.map((user, index) => (
                                    <tr key={user.username}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td className="fw-bold">{user.points_earned}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="text-center text-muted">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </MDBTableBody>
                    </MDBTable>
                )}
            </MDBContainer>
        </>
    );
};

export default UsersPointsTable;
