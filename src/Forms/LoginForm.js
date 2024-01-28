import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FiLogIn } from 'react-icons/fi';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = () => {
    // Prepare the login data
    const loginData = {
      email: email,
      password: password,
    };

    // Make the API request
    fetch('http://localhost:8000/api/Login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response here
        console.log(data);
        if (data.message === 'Login successful') {
          // Login successful, perform necessary actions (e.g., redirect to dashboard)
          alert('Login successful');
          localStorage.setItem("user-info",JSON.stringify(loginData.email));
          navigate('/TaskCreation');
        } else {
          // Login failed, display error message to the user
          alert('Login failed');
        }
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  };

  return (
    <Container className='col-lg-5 text-center mt-5 mb-5 py-4 border bg-body-tertiary'>
      <h1 className='py-3'>Login Form</h1>
      <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
        <Form.Control
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </FloatingLabel>
      <p>Don't have an account <Link to={"/Register"}>Create Now</Link> </p>
      <Button variant="dark" className='w-100' onClick={handleLogin}><FiLogIn /> Login</Button>
    </Container>
  );
}

export default LoginForm;
