import React, { useEffect, useState } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { FiSave } from 'react-icons/fi';

function TaskCreationForm() {
  const [userEmails, setUserEmails] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignTask, setAssignTask] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    description: '',
    deadline: '',
    assignTask: '',
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/GetUserEmails')
      .then(response => response.json())
      .then(data => {
        setUserEmails(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSave = () => {
    const validationErrors = {};

    if (title.trim() === '') {
      validationErrors.title = 'Please enter a title.';
    }

    if (description.trim() === '') {
      validationErrors.description = 'Please enter a description.';
    }

    if (deadline.trim() === '') {
      validationErrors.deadline = 'Please enter a deadline.';
    } else if (new Date(deadline) < new Date()) {
      validationErrors.deadline = 'Deadline cannot be a past date.';
    }

    if (assignTask.length === 0) {
      validationErrors.assignTask = 'Please assign the task to at least one user.';
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const taskData = {
        title: title,
        description: description,
        deadline: deadline,
        assign_task: [assignTask],
      };

      fetch('http://localhost:8000/api/CreateTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setShowAlert(true);
          setTitle('');
          setDescription('');
          setDeadline('');
          setAssignTask('');
          setErrors({});
        })
        .catch(error => {
          console.error(error);
          // Handle errors
        });
    }
  };

  return (
    <>
    <Container className='col-lg-5 text-center my-auto mt-5 mb-5 py-4 border bg-body-tertiary'>
      <h1 className='py-2'>Task Creation & Assignment</h1>
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
          Task created successfully.
        </Alert>
      )}
      <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => setTitle(event.target.value)}
          isInvalid={errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {errors.title}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingTextarea" className="mb-3" label="Description">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          value={description}
          onChange={event => setDescription(event.target.value)}
          isInvalid={errors.description}
        />
        <Form.Control.Feedback type="invalid">
          {errors.description}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput" label="Deadline" className="mb-3">
        <Form.Control
          type="date"
          placeholder="Deadline"
          value={deadline}
          onChange={event => setDeadline(event.target.value)}
          isInvalid={errors.deadline}
        />
        <Form.Control.Feedback type="invalid">
          {errors.deadline}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect" label="Assign Task To:" className="mb-3">
        <Form.Select
          aria-label="Floating label select example"
          value={assignTask}
          onChange={event => setAssignTask(event.target.value)}
          isInvalid={errors.assignTask}
        >
          <option value="none" selected hidden>Open this select menu</option>
          {userEmails.map((email, index) => (
            <option key={index} value={email}>
              {email}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type="invalid">
          {errors.assignTask}
        </Form.Control.Feedback>
      </FloatingLabel>

      <Button variant="dark" className='w-100' onClick={handleSave}>
        <FiSave /> Save
      </Button>
    </Container>
    </>
  );
}

export default TaskCreationForm;
