import React from 'react'
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Alert,
    Table,
    Card
  } from "react-bootstrap";

function AboutUs() {

  return (
    <Container style={{ padding: '20px' }}>
        <Row>
            <Col md={12}>
            {/* <h1>About Us</h1> */}
            <Card>
                <Card.Body>
                <Card.Title style={{fontSize:40}}>About Us</Card.Title>
                <Card.Text>
                   
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>About the Department of Electronics & Telecommunication Engineering</Card.Title>
                <Card.Text>
                    <p> Department of Electronics & Telecommunication Engineering started in the year 2001 with an intake of 60. The intake was increased to 120 in the year 2003. The department is accredited by NBA in 2018 and subsequently in first cycle.</p>
                  <p>The department has well qualified and highly motivated faculty supported by dedicated nonteaching staff members. The department has well equipped labs with latest state of art facilities. The department is committed to impart excellent teaching- learning, and research & development activities in the field of electronics & communication to its students in a most effective manner. The department organizes activities such as expert lecture, workshops, seminars, industrial visits, internships and other co-curricular activities for the all-round development of students that provide an engineering attitude amongst students to solve technical problems with confidence. The department also organizes the activities to inculcate ethical behavior, responsibility and commitment amongst the students. The students take active participation in workshops, project competitions and other co-curricular & extracurricular activities. The department is also collaborated with different industries/organizations for research work that provide an opportunity for the students for their all round development.</p>
                <p>The students of the department have scope in the fields of Mobile & Wireless Communication, Microwave & RF communication, Signal Processing & Machine Learning, VLSI & Embedded System Design, Networking, Robotics, Defense and Research applications.</p>
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Vision of Department of Electronics and Telecommunication Engineering</Card.Title>
                <Card.Text>
                To be recognized as a department of excellence that produces committed, responsible and skilled telecommunication engineers.
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Mission of Department of Electronics and Telecommunication Engineering</Card.Title>
                <Card.Text>
                <p>M1: To offer quality training in Electronics and Telecommunication Engineering to groom students into successful professionals.</p>

                <p>M2: To instill the skills that enable students to design and implement the technical solution.</p>

                <p>M3: To inculcate ethical behavior, soft skills and team work in students.</p>
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Program Educational Objectives (PEOs)</Card.Title>
                <Card.Text>
                Within four years of graduation, the graduate will be :
                <p>PEO I: Analyzing and applying engineering knowledge for solving engineering problems.</p>

                <p>PEO II: Demonstrating professional and ethical practices in the area of academia, research, career and entrepreneurship. </p>

                <p>PEO III: Applying the knowledge of engineering to solve societal and environmental problems as an individual or in a team.</p>

                <p>PEO IV: Demonstrating effective oral and written communication skills and excellence in management and leadership.</p>

                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Program Specific Outcomes (PSO)</Card.Title>
                <Card.Text>
                <p> PSO I: Design cost effective solutions using VLSI/ Embedded technologies for societal use.</p>
                <p>PSO II: Apply specific tools for design and development of RF communication systems.</p>
                <p>PSO III: Design and develop optimized hardware and software solutions for signal processing applications.</p>
                </Card.Text>
                </Card.Body>


                <div style={{ textAlign: 'center ', fontWeight: 'bold' }}>
      Developed by<br />
      Ziabanu Dongri (Student of EXTC Department)
      <br />
      <p></p>
    </div>
               

                


            </Card>
            </Col>
        </Row>
        
        </Container>
  )
}

export default AboutUs