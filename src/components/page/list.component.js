import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function List() {

    const [patients, setPatient] = useState([])

    useEffect(()=>{
        fetchPatients() 
    },[])

    const fetchPatients = async () => {
        await axios.get(`http://localhost:8000/api/patientInfo`).then(({data})=>{
            setPatient(data.data)
        })
    }
   
    return (
       
      <div className="container">
          <div className="row">
            <div className='col-12'>
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
                                    <th>Mobile_no</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                     
                                 patients.length > 0 && (
                                      
                                        patients.map((row, key)=>(

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