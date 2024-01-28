import { Button, Nav } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from 'react-icons/fa';
import { FiLogIn, FiUserPlus  } from 'react-icons/fi';

function HeaderNavbar() {
  const userInfoString = localStorage.getItem("user-info");
  const userInfo = JSON.parse(userInfoString);

  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();
    navigate("/");
  }

  function RegisterPage() {
    navigate("/Register");
  }

  function LoginPage() {
    navigate("/Login");
  }

  return (
    <Navbar bg="body-tertiary" expand="md">
      <Container fluid>
        <Navbar.Brand>Task Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {localStorage.getItem("user-info") ? (
              <>
                <Nav.Link onClick={() => navigate("/TaskCreation")}>Task Creation</Nav.Link>
                <Nav.Link onClick={() => navigate("/AllTasks")}>All Tasks</Nav.Link>
                <Nav.Link onClick={() => navigate("/MyTasks")}>My Tasks</Nav.Link>
                <Nav.Link onClick={() => navigate("/CompletedTasks")}>Completed Tasks</Nav.Link>
              </>
            ) : (
              <></>
            )}
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          {localStorage.getItem("user-info") ? (
            <>
              <Navbar.Text className="mx-2">
                User: <u>{userInfo}</u>
              </Navbar.Text>
              <Button className="mx-2" variant="dark" onClick={Logout}>
                <FaSignOutAlt /> Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="dark" onClick={RegisterPage}><FiUserPlus /> Register</Button>
              <Button className="mx-2" variant="dark" onClick={LoginPage}><FiLogIn /> Login</Button>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HeaderNavbar;
