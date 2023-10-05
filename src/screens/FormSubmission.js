
import React from 'react'
import { Container,  Row, Col } from 'react-bootstrap'


const FormSubmission = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {/* <h1 className="text-center mt-5">Form Submission</h1> */}
          <p className="text-center mt-3">Your form has been submitted successfully!</p>
        </Col>
      </Row>
    </Container>
  )
}

export default FormSubmission