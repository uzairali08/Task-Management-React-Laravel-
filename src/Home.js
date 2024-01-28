import { Container, Row, Col, Card, Button } from "react-bootstrap";
import img from "./assets/background.jpg";
import { useNavigate } from "react-router-dom";
import { FiArrowRight } from 'react-icons/fi';

function Home() {
  const navigate = useNavigate();
  function GetStarted(){
    navigate("/Login");
  }
  return (
    <>
      <div>
        <Card className="bg-dark text-white text-center">
          <Card.Img src={img} alt="Card image" height={"400px"} />
          <Card.ImgOverlay>
            <Card.Title className="pt-5">
              <h2>Welcome to Task Management System</h2>
            </Card.Title>
            <Card.Text className="p-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
              vestibulum lacus a leo sagittis, eu tincidunt diam blandit.
              Vivamus felis justo, finibus et consectetur consequat, condimentum
              eu est. Nulla at metus vel libero finibus aliquam. Integer
              faucibus nisl id justo sagittis, vel posuere neque finibus. Donec
              in dui ultricies, efficitur massa nec, scelerisque elit.
            </Card.Text>
            <Button variant="light" onClick={GetStarted}><FiArrowRight /> Get Started</Button>
          </Card.ImgOverlay>
        </Card>

        <Container className="py-5">
          <Row>
            <Col className="text-center py-4">
              <h3>Why Choose Our Task Management System?</h3>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Easy Task Creation</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    vestibulum lacus a leo sagittis, eu tincidunt diam blandit.
                    Vivamus felis justo, finibus et consectetur consequat,
                    condimentum eu est.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Efficient Collaboration</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    vestibulum lacus a leo sagittis, eu tincidunt diam blandit.
                    Vivamus felis justo, finibus et consectetur consequat,
                    condimentum eu est.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>Insightful Analytics</Card.Title>
                  <Card.Text>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    vestibulum lacus a leo sagittis, eu tincidunt diam blandit.
                    Vivamus felis justo, finibus et consectetur consequat,
                    condimentum eu est.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;
