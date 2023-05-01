import React, { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

const AbsenList = () => {
    const [absens, setAbsens] = useState([]);

    useEffect(() => {
        getAbsens();
    }, []);

    const getAbsens = async () => {
        const response = await axios.get("http://localhost:5000/absen");
        setAbsens(response.data);
    }

    return (
        <div className="columns mt-5 is-centered">
            <div className="columns is-half">
                <table className="table is-striped is-fullwidth table is-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absens.map((absen, index) => (
                            <tr key={absen.id}>
                                <td>{index + 1}</td>
                                <td>{absen.name}</td>
                                <td>{absen.date}</td>
                                <td><img className="image" width="550" src={absen.url} alt="placeholder text" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AbsenList