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
    <Container >
        <Row>
            <Col md={12}>
            {/* <h1>About Us</h1> */}
            <Card>
                <Card.Body>
                <Card.Title style={{fontSize:40}}>About Us</Card.Title>
                <Card.Text>
                    <br/>
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Department of Electronics and Telecommunication Engineering</Card.Title>
                <Card.Text>
                Communication products play a vital role in our daily lives and its availability with affordable means has been one of electronics’ greatest contributions to human society. Today, Telecommunications, Computer Technology and consumer electronics are advancing at an ever-increasing pace. The telephone, radio, satellite communications, the internet, mobile phones etc each new development has revolutionized the way we live and the way we think about our world. New technologies continuously emerge, with 4G mobile phones offering the possibility of real-time high quality video. All these developments have been stimulated by advances in Electronics and Telecommunications technology.
                The Department of Electronics and Telecommunication Engineering was established in year 2001 duly approved by AICTE with a intake of 60 students. It remains committed to impart teaching, training and research in the field of technical education in most efficient manner to its students. In the year 2004, the Department intake increased to 120 students and continues to be the same till date. In the span of a decade the Department has grown with a stability of 20 members of teaching staff out of which 4 staff having Doctorate degree. There are well equipped laboratories with qualified technical assistants and about 500 students at UG program. The staff specializes in various fields of Signal Processing, Digital Systems, Control Systems, Microwaves, Microprocessor Applications, Communication Engineering and VLSI Design etc. The department believes in innovations & perfection and works to give an engineering attitude to the students for their confidence building so as to solve technical problems.
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Vision of Institute</Card.Title>
                <Card.Text>
                To be universally accepted as a synonym of quality, excellence and commitment in the field of engineering education by nurturing talent and transforming young minds to realise their potential and become future ready engineers.
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Mission of Institute</Card.Title>
                <Card.Text>
                <p>• To provide students with a thorough knowledge of engineering to refine their professional skills.</p>

                <p>•To nurture creativity and innovation while encouraging multidisciplinary interaction.</p>

                <p>•To train students to be industry ready and capable of working effectively as an individual and in a team.</p>

                <p>•To inculcate ethical behaviour, responsibility and commitment among students.</p>
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Vision of Department of Electronics and Telecommunication Engineering</Card.Title>
                <Card.Text>
                To be recognised as a department of excellence that produces committed, responsible and skilled telecommunication engineers.
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Mission of Department of Electronics and Telecommunication Engineering</Card.Title>
                <Card.Text>
                <p>• To offer quality training in Electronics and Telecommunication Engineering to groom students into successful professionals.</p>
                <p>• To instil the skills that enable students to design and implement the technical solution.</p>
                <p>• To inculcate ethical behaviour, soft skills and teamwork in students.</p>
                </Card.Text>
                </Card.Body>

                {/* <Card.Body>
                <Card.Title>Developers</Card.Title>
                <Card.Text>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Roll Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Shubham Kumar</td>
                        <td>1900290140023</td>
                        </tr>
                        
                    </tbody>
                    </Table>
                </Card.Text>
                </Card.Body> */}

                <Card.Body>
                <Card.Title>Technologies Used</Card.Title>
                <Card.Text>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Technology</th>
                        <th>Version</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>React</td>
                        <td>17.0.2</td>
                        </tr>
                        <tr>
                        <td>React Bootstrap</td>
                        <td>1.6.1</td>
                        </tr>
                        <tr>
                        <td>Firebase</td>
                        <td>9.1.3</td>
                        </tr>
                        <tr>
                        <td>React Router Dom</td>
                        <td>5.2.0</td>
                        </tr>
                        <tr>
                        <td>React Wavify</td>
                        <td>1.1.0</td>
                        </tr>
                    </tbody>
                    </Table>
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>References</Card.Title>
                <Card.Text>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Reference</th>
                        <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>React</td>
                        <td>https://reactjs.org/</td>
                        </tr>
                        <tr>
                        <td>React Bootstrap</td>
                        <td>https://react-bootstrap.github.io/</td>
                        </tr>
                        <tr>
                        <td>Firebase</td>
                        <td>https://firebase.google.com/</td>
                        </tr>
                        <tr>
                        <td>React Router Dom</td>
                        <td>https://reactrouter.com/web/guides/quick-start</td>
                        </tr>
                        <tr>
                        <td>React Wavify</td>
                        <td>https://www.npmjs.com/package/react-wavify</td>
                        </tr>
                    </tbody>
                    </Table>
                </Card.Text>
                </Card.Body>

                


            </Card>
            </Col>
        </Row>
        
        </Container>
  )
}

export default AboutUs