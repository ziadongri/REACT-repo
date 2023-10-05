import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Table,
} from "react-bootstrap";
import { auth, db } from "../firebase";
import { doc, collection, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function Form2A() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theorysub, setTheorysub] = useState("");
  const [practicalsub, setPracticalsub] = useState("");
  const [IActa, setIActa] = useState("");
  const [IActb, setIActb] = useState("");
  const [IActc, setIActc] = useState("");
  const [IActd, setIActd] = useState("");
  const [IActe, setIActe] = useState("");
  const [IActf, setIActf] = useState("");
  const [IOddsem, setIOddsem] = useState([]);
  const [IEvensem, setIEvensem] = useState([]);
  const [IActTotal, setIActTotal] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
      } else {
        navigate("/login");
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [navigate]);

  const Total = () => {
    setIActTotal(
      parseFloat(IActa) +
        parseFloat(IActb) +
        parseFloat(IActc) +
        parseFloat(IActd) +
        parseFloat(IActe) +
        parseFloat(IActf)
    );
  };

  useEffect(() => {
    Total();
  }, [IActa, IActb, IActc, IActd, IActe, IActf]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "partB", user.uid);
    const data = {
      IActa,
      IActb,
      IActc,
      IActd,
      IActe,
      IActf,
      IOddsem,
      IEvensem,
      IActTotal,
    };
    await setDoc(docRef, data, { merge: true });
    // navigate('/form2');
  };

  const fetchData = async (uid) => {
    const docRef = doc(db, "partB", uid);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setIActa(data.IActa || "");
        setIActb(data.IActb || "");
        setIActc(data.IActc || "");
        setIActd(data.IActd || "");
        setIActe(data.IActe || "");
        setIActf(data.IActf || "");
        setIOddsem(data.IOddsem || []);
        setIEvensem(data.IEvensem || []);
        setIActTotal(data.IActTotal || "0");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData(user.uid);
    }
  }, [user]);

  const calculateoddpercentage = (index) => {
    const newIOddsem = [...IOddsem];
    newIOddsem[index].percentage =
      (newIOddsem[index].actualLectures / newIOddsem[index].lectures) * 100;
    setIOddsem(newIOddsem);
  };

  useEffect(() => {
  IOddsem.map((oddsem, index) => {
      calculateoddpercentage(index);
    });
  }, [IOddsem]);



  // useEffect(() => {
  //   IOddsem.map((oddsem, index) => {
  //     calculateoddpercentage(index);
  //   });
  // }, [IOddsem]);

  const handleAddIOddsem = () => {
    setIOddsem((prevIOddsem) => [
      ...prevIOddsem,
      {
        course: "",
        class: "",
        lectures: "",
        actualLectures: "",
        percentage: "",
      },
    ]);
  };

  const handleRemoveIOddsem = (index) => {
    setIOddsem((prevIOddsem) => prevIOddsem.filter((oddsem, i) => i !== index));
  };

  const calculateevenpercentage = (index) => {
    const newIEvensem = [...IEvensem];
    newIEvensem[index].percentage =
      (newIEvensem[index].actualLectures / newIEvensem[index].lectures) * 100;
    setIEvensem(newIEvensem);
  };

  // useEffect(() => {
  //   calculateevenpercentage();
  // }, [IEvensem]);
  
  useEffect(() => {
    IEvensem.map((evensem, index) => {
      calculateevenpercentage(index);
    });
  }, [IEvensem]);

  const handleAddIEvensem = () => {
    setIEvensem((prevIEvensem) => [
      ...prevIEvensem,
      {
        course: "",
        class: "",
        lectures: "",
        actualLectures: "",
        percentage: "",
      },
    ]);
  };

  const handleRemoveIEvensem = (index) => {
    setIOddsem((prevIEvensem) =>
      prevIEvensem.filter((evensem, i) => i !== index)
    );
  }

  return (
    <Container fluid >
      <Row>
      <Col md={2} className="form-navigation">
    <h3>Form Navigation</h3>
    <ul>
      <li>
        <Link to="/">Part A</Link>
      </li>
      <li>
        <span className="form2-subsection">Part B</span>
        <ul className="form2-subsection-list">
          <li>
            <Link to="/form2a" className="form2-subsection-link">Category A</Link>
          </li>
          <li>
            <Link to="/form2b" className="form2-subsection-link">Category B</Link>
          </li>
          <li>
            <Link to="/form2c" className="form2-subsection-link">Category C</Link>
          </li>
        </ul>
      </li>
      {/* Add more form links as needed */}
    </ul>
  </Col>
        <Col md={9}>
      <h1>Part B: Academic Performance Indicators</h1>
      <h4 className="fw-lighter">Category I: Teaching, Learning and Evaluation related activities</h4>
      <p>
        *proof to be submitted for all claims and to be verified by HOD's in
        presence of respective faculty
      </p>
      <Form onSubmit={handleSubmit}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Courses Taught code and name</th>
              <th>Class for which conducted</th>
              <th>Target Lectures/ Practical</th>
              <th>Lectures/ Practical Actually conducted</th>
              <th>% of Classes conducted</th>
            </tr>
          </thead>

          {IOddsem.map((oddsem, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter course"
                    value={oddsem.course}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].course = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter class"
                    value={oddsem.class}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].class = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter lectures"
                    value={oddsem.lectures}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].lectures = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter actual lectures"
                    value={oddsem.actualLectures}
                    onChange={(e) => {
                      const newIOddsem = [...IOddsem];
                      newIOddsem[index].actualLectures = e.target.value;
                      setIOddsem(newIOddsem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter % of classes conducted"
                    value={oddsem.percentage}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIOddsem(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
          
        </Table>
        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddIOddsem}>
            <Link className="text-decoration-none text-white">Add Odd semester</Link>
          </Button>
          </Col>
          </Row>
          </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Courses Taught code and name</th>
              <th>Class for which conducted</th>
              <th>Target Lectures/ Practical</th>
              <th>Lectures/ Practical Actually conducted</th>
              <th>% of Classes conducted</th>
            </tr>
          </thead>
          {IEvensem.map((evensem, index) => (
            <tbody key={index}>
              <tr>
                <td>{index + 1}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter course"
                    value={evensem.course}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].course = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter class"
                    value={evensem.class}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].class = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter lectures"
                    value={evensem.lectures}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].lectures = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter actual lectures"
                    value={evensem.actualLectures}
                    onChange={(e) => {
                      const newIEvensem = [...IEvensem];
                      newIEvensem[index].actualLectures = e.target.value;
                      setIEvensem(newIEvensem);
                    }}
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Enter % of classes conducted"
                    value={evensem.percentage}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveIEvensem(index)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            </tbody>
          ))}
          
        </Table>
        <div className="text-center mb-3">
            <Row>
              <Col>
          <Button variant="primary" onClick={handleAddIEvensem}>
            <Link className="text-decoration-none text-white">Add Even semester</Link>
          </Button>
          </Col>
          </Row>
          </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Natural of Activity</th>
              <th>MAX API Score alloted</th>
            </tr>
          </thead>

          {/* <Form.Group className="mb-3" controlId="theorysub"> */}
          <tbody>
            <tr>
              <td>a.</td>
              <td>
                <Col>
                  Lectures, Seminars, tutorials, practical, contact hours
                  undertaken taken as percentage of lectures allocated
                </Col>
                <Col>Total lectures conducted {">"} 90% score = 50</Col>
                <Col>90% {">"} Lectures taken ≥ 80% = 40</Col>
                <Col> 80% {">"} Lectures taken ≥ 70% = 30</Col>
                <Col>
                  no score if number of lectures taken is less than 70%{" "}
                </Col>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActa}
                  onChange={(e) => setIActa(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>b.</td>
              <td>
                <Col> Lectures or lab in excess of UGC norms </Col>
                <Col>(One point for each extra class) </Col>
                <Col>
                  {" "}
                  This refers to lecture load allotted above 16/week for Asst
                  Prof or above 14/week for Associate Prof and Professor. Repeat
                  classes for diploma students may be given 5 marks
                </Col>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActb}
                  onChange={(e) => setIActb(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>c.</td>
              <td>
                <Col>
                  {" "}
                  Remedial lectures or Revision Lectures actually conducted for
                  weak students (one point for each extra class in other than
                  mentioned in 1.a)
                </Col>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActc}
                  onChange={(e) => setIActc(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>d.</td>
              <td>
                <Col>
                  Learning material prepared for students: Provide short
                  description of each work done in separate sheet
                </Col>
                <Col>Evaluation Criteria:</Col>
                <Col>1. Quality PPT made by self (5)</Col>
                <Col>2. Animations/virtual labs/website (10)</Col>
                <Col>
                  3. Good quality video lectures available on public platforms
                  (recorded online lectures not to be considered) (10)
                </Col>
                <Col>
                  4. Arranged guest lecture (2 points per lecture. The guest
                  should be external faculty from reputed institute or industry)
                </Col>
                <Col>5. Arranged subject related Industrial Visit (2 pts)</Col>
                <Col>6. Use of ICT (max 2)</Col>
                <Col>7. Innovative pedagogy (max 2)</Col>
                <Col>8. Content beyond syllabus(max 2)</Col>{" "}
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActd}
                  onChange={(e) => setIActd(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>e.</td>
              <td>
                <Col>Updating of subject content course improvement etc</Col>
                <Col>
                  <Col>1. Updated lecture notes (max 3)</Col>
                  <Col>2. Updated lab manual (max 3)</Col>
                  <Col>3. Question bank (2 marks)</Col>
                  <Col>
                    4. Question Paper solution
                    <Col>1. Term Test (1 each max 2)</Col>
                    <Col>2. Model University solution (5)</Col>
                  </Col>
                  <Col>5. Assignment solution (1 each max 2)</Col>
                  <Col>6. Syllabus setting (5 marks each)(max 2)</Col>
                </Col>
                <Col>*quality of notes/solution to be considered</Col>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActe}
                  onChange={(e) => setIActe(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>g.</td>
              <td>
                <Col>
                  Examination duties (invigilation; Question paper setting, evaluation/ assessment of answer scripts) as per allotment.
                </Col>
                <Col>
                  1. Invigilation (flying squad duties/Joint CC/any exam related
                  duties) (max 5 points)
                </Col>
                <Col>
                  100% compliance: 5, 80% compliance: 3, less than 80%: no score
                </Col>
                <Col>
                  2. Evaluation of answer script, preparation of result list on
                  time as specified by Examination Section (max 10 points)
                </Col>
                <Col>100% compliance: 5, less than 100%: no score.</Col>
                <Col>Question paper setting (5 each, max score 10)</Col>
              </td>
              <td>
                <Form.Control
                  type="text"
                  placeholder=""
                  value={IActf}
                  onChange={(e) => setIActf(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td></td>
              <td>Total of Category I</td>
              <td>
                <Form.Control type="text" placeholder="" value={IActTotal} />
              </td>
            </tr>
          </tbody>

          {/* <Row>
            <Col>
              <Button variant="primary" type="submit">
                <Link to="/" className="btn btn-primary ms-2">
                  Previous
                </Link>
              </Button>
            </Col>
            <Col>
              <Button variant="primary" type="submit" onClick={handleSubmit}>
                <Link to="/form2b" className="btn btn-primary ms-2">
                  Next
                </Link>
              </Button>
            </Col>
          </Row> */}
          {/* <Link to="/form2" className="btn btn-primary ms-2">Next</Link> */}
        </Table>
      </Form>
      <div className="text-center mb-4" >
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              <Link to="/" className="text-decoration-none text-white">
                Previous
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              <Link className="text-decoration-none text-white">
                Save
              </Link>
            </Button>
          </Col>
          <Col>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              <Link to="/form2b" className="text-decoration-none text-white">
                Next
              </Link>
            </Button>
          </Col>
          </Row>
          </div>
      </Col>
      </Row>
      </Container>
  );
}

export default Form2A;
