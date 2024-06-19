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
  import Footer2 from './Footer2';

function AboutUs() {

  return (
    <div >
  <Container fluid style={{ padding: 0 }}>
        <Row noGutter>
          <Col md={{ span: 8, offset: 2 }} style={{ padding: 0 }}>

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
                    <p> Department of Electronics & Telecommunication Engineering started in the year 2001 with an intake of
                  60. The intake was increased to 120 in the year 2003. The department is accredited by NBA in 2018 and
                  2022.</p>

                  <p>The department has highly qualified and well-motivated faculty supported by dedicated technical and
              nonteaching staff members. The department has well equipped labs with latest state of art facilities. The
              department is committed to impart excellent teaching-learning and research & development activities in
              the field of electronics & telecommunication to the students in a most effective manner. The department
              organizes expert lectures, workshops, seminars, industrial visits, internships and other co-curricular
              activities for the all-round development of students that provide an engineering attitude amongst students
              to solve technical problems with confidence. The department also organizes the activities to inculcate
              ethical behavior, responsibility and commitment amongst the students. The students take active
              participation in workshops, project competitions and other co-curricular & extracurricular activities.</p>

                <p>The current curriculum of the department under autonomy has a blend of courses covering IT and the
                core domain catering to the current industry requirements. The curriculum includes courses such as
                Artificial Intelligence, Cloud Computing, Data science, Machine and Deep learning, Natural Language
                Processing etc. in the IT domain and courses like wireless networks, 5G technology, RF Design, Sensor
                Technology and Internet of Things, Embedded Systems, Robotics and Autonomous vehicle etc. in the
                core area.</p>

                <p>The students of the department have scope of placement in the fields of Mobile & Wireless
                Communication, Microwave & RF communication, Signal Processing & Machine Learning, VLSI &
                Embedded System Design, Networking, Robotics, Defense and Research applications. </p>

                <div>
                <p>Best practices of the department include:</p>
                <p><strong>Curriculum Innovation:</strong> Department regularly updates the curriculum to align with industry trends and emerging technologies, which include a balance of theory and practical hands-on experience.</p>

                <p><strong>Laboratory Infrastructure:</strong> Maintain well-equipped laboratories with modern instruments and softwaretools.</p>

                <p><strong>Industry Partnerships:</strong>  Foster strong relationships with industry partners to facilitate internships, guest lectures, and collaborative projects. This collaboration often leads to internships, research projects, and job placements.</p>


                <p><strong>Research and Innovation:</strong>  Encourage faculty and students to participate in research activities aligned with national and global challenges. Support interdisciplinary collaborations with other departments to address complex engineering problems. Encourages participation in hackathons and reputed competitions and projects like ISRO-Touch the Jovian Moon.</p>

                <p><strong>Professional Development:</strong>  Provide opportunities for faculty and students to attend conferences, workshops, and certification programs. Encouraging them to publish research papers in reputed journals and present at conferences to enhance the department's academic reputation.</p>
              </div>

              <p>We at KJSIT-EXTC facilitates a strong mentoring system, involving the students in various prestigiousstudents bodies like the IEEE, IEI, IETE.</p>
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

                <Card.Body>
                <Card.Title>What is the Faculty Performance Appraisal Management System (FPAMS)?</Card.Title>
                <Card.Text>
                Faculty Performance Appraisal Management System (FPAMS) is a platform for the faculty to upload their professional information/activities that are carried out throughout the academic year for the development of self/department/institute. The system is designed to help the faculty provide their details related to academic/extracurricular & curricular/ Research & Development activities along with proofs for the yearly performance evaluation and annual increments. The system helps the HoDs and Principal to evaluate the performance of their faculty with ease. The system is environment friendly and sustainable as it promotes the paperless environment. Overall, this system has multiple uses with a very efficient and user friendly interface.
                </Card.Text>
                </Card.Body>

                <Card.Body>
                <Card.Title>Main Features</Card.Title>
                <Card.Text>
                <p>  ●  A 100% responsive and user friendly system.</p>
                <p>  ●  Promotes paperless environment.</p>
                <p>  ●  Helps the authorities in assessing the faculty performance with ease.</p>
                <p>  ●  Helps the faculty to retrieve their previous year data at the time of their application for promotion.</p>
                </Card.Text>
                </Card.Body>

                <div style={{ textAlign: 'center ', fontWeight: 'bold' }}>
      Mentored by<br />
      Dr. Jayashree Khanapuri (Head of Department (EXTC))
      <br />
      <p></p>
    </div>

                <div style={{ textAlign: 'center ', fontWeight: 'bold' }}>
      Developed by<br />
      Ziabanu Dongri (Student of EXTC Department)
      <br />
      <p></p>
    </div>

            </Card>
            </Col>
            

            
        </Row>
        <Footer2/>
        </Container>
      </div>
    
  )
}

export default AboutUs