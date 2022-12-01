import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function List() {

    const [patients, setPatient] = useState([])

    useEffect(() => {
        fetchPatients()
    }, [])


    const getInputValue = (event) => {

        const userValue = event.target.value;

        const article = { title: userValue };


        axios.post(`http://localhost:8000/api/postSearch`, article).then(({ data }) => {
            setPatient(data.data)
        })

        console.log(patients);
    }

    const fetchPatients = async () => {
        await axios.get(`http://localhost:8000/api/patientInfo`).then(({ data }) => {
            setPatient(data.data)
        })
    }

    return (

        <div className="container">
            <div className="row">
                <div className='col-12'>
                    <Col>
                        <input type="text" onChange={getInputValue} placeholder="Search here" />
                    </Col>

                    <Col>
                        <Link className='btn btn-primary mb-2 float-end' to={"/create"}>
                            Create Appointment
                        </Link>
                    </Col>
                </div>
                <div className="col-12">
                    <div className="card card-body">
                        <div className="table-responsive">
                            <table className="table table-bordered mb-0 text-center">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Address</th>
                                        <th>Mobile no</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {

                                        patients.length > 0 && (

                                            patients.map((row, key) => (

                                                <tr key={key}>
                                                    <td>{row.id}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.email}</td>
                                                    <td>{row.address}</td>
                                                    <td>{row.mobile_no}</td>
                                                    <td>{row.date}</td>
                                                    <td>{row.time}</td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}