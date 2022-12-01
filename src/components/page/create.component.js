import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function CreateProduct() {

  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [mobile_no, setMobile] = useState("")
  const [date, setDate] = useState("")

  const [validationError, setValidationError] = useState({})

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('name', name)
    formData.append('email', email)
    formData.append('address', address)
    formData.append('mobile_no', mobile_no)
    formData.append('date', date)

    await axios.post(`http://localhost:8000/api/saveData`, formData).then(({ data }) => {

      if (data.status === 'error') {
        Swal.fire({
          icon: "error",
          text: data.message
        })
      } else {
        Swal.fire({
          icon: "success",
          text: data.message

        })
        navigate('/')
      }
    }).catch(({ response }) => {
      console.log(response.message);

      if (response.status === 422) {
        setValidationError(response.data.errors)
      } else {

      }
    })
  }

  return (

    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Add Appointment</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (

                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value]) => (
                                <li key={key}>{value}</li>
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }

                <Form onSubmit={createProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={name} onChange={(event) => {
                          setName(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={(event) => {
                          setEmail(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" value={address} onChange={(event) => {
                          setAddress(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="mobile_no">
                        <Form.Label>Mobile No</Form.Label>
                        <Form.Control type="text" value={mobile_no} onChange={(event) => {
                          setMobile(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="my-3">
                    <Col>
                      <Form.Group controlId="Date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" value={date} onChange={(event) => {
                          setDate(event.target.value)
                        }} />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Add Appointment
                  </Button>
                </Form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}