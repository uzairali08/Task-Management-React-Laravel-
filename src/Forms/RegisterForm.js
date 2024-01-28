import { useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { FiUserPlus } from 'react-icons/fi';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Prepare the registration data
    const registrationData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    // Make the API request
    fetch('http://localhost:8000/api/Register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registrationData),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the API response here
        console.log(data);
        if (data.message === 'Registration successful') {
          // Registration successful, navigate to Login page
          alert(data.message);
          navigate('/Login');
        } else {
          // Registration failed, stay on the same page
          alert(data.message);
        }
      })
      .catch(error => {
        // Handle any errors here
        console.error(error);
      });
  };

  return (
    <Container className='col-lg-5 text-center mt-5 mb-5 py-4 border bg-body-tertiary'>
      <h1 className='py-3'>Registration Form</h1>
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
      <FloatingLabel controlId="floatingPassword" label="Confirm Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </FloatingLabel>
      {error && <p className="text-danger">{error}</p>}
      <p>Already have an account <Link to={"/Login"}>Login Now</Link> </p>
      <Button variant="dark" className='w-100' onClick={handleRegister}><FiUserPlus /> Register</Button>
    </Container>
  );
}

export default RegisterForm;
