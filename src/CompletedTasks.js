
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Container, Row, Col, Pagination, Form, FloatingLabel } from 'react-bootstrap';

function CompletedTasks() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const tasksPerPage = 2;

  useEffect(() => {
    fetch('http://localhost:8000/api/GetCompletedTasks')
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Calculate indexes of tasks to display on the current page
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle search
  const handleSearch = (event) => {
    setSearchKeyword(event.target.value);
    setCurrentPage(1); // Reset current page when performing a new search
  };

  // Handle priority filter
  const handlePriorityFilter = (event) => {
    setSelectedPriority(event.target.value);
    setCurrentPage(1); // Reset current page when changing priority filter
  };

  // Filter tasks based on search keyword and priority
  const filteredTasks = currentTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      task.description.toLowerCase().includes(searchKeyword.toLowerCase())
  ).filter(
    (task) => !selectedPriority || task.priority === selectedPriority
  );

  // Update the currentTasks based on the filtered tasks
  const currentFilteredTasks = filteredTasks.slice(
    indexOfFirstTask,
    indexOfLastTask
  );

  return (
    <Container className="col-lg-8 my-auto mt-5 mb-5 py-3 border border-secondary bg-light">
      <h1 className="text-center pb-2">Completed Tasks</h1>
      <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="Search by title or description"
            >
              <Form.Control
                type="text"
                placeholder="Title"
                value={searchKeyword}
                onChange={handleSearch}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="floatingSelect"
              label="Status:"
              className="mb-3"
            >
              <Form.Select
                aria-label="Floating label select example"
                value={selectedPriority}
                onChange={handlePriorityFilter}
              >
                <option value="">All Priorities</option>
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </Form.Select>
            </FloatingLabel>
          </Col>
        </Row>
      <Row>
        {currentFilteredTasks.map((task) => (
          <Col key={task.id} lg={12}>
            <Card className="mb-3 bg-transparent" border="light">
                <Card.Body>
                  <Card.Title><strong>Title: </strong>{task.title}</Card.Title>
                  <Card.Text><strong>Description: </strong>{task.description}</Card.Text>
                  <Card.Text><strong>Deadline: </strong> {task.deadline}</Card.Text>
                  <Card.Text><strong>Assigned To: </strong> {task.assign_task}</Card.Text>
                  <Card.Text><strong>Progress: </strong> {task.status}</Card.Text>
                  <Card.Text><strong>Comments: </strong> {task.comments}</Card.Text>
                  <Card.Text><strong>Priority: </strong> {task.priority}</Card.Text>
                  <Card.Text><strong>Completed On: </strong> {new Date(task.updated_at).toLocaleDateString()}</Card.Text>
                </Card.Body>
              </Card>
              <hr></hr>
          </Col>
        ))}
      </Row>
      <Pagination>
          {Array(Math.ceil(filteredTasks.length / tasksPerPage))
            .fill()
            .map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
        </Pagination>
    </Container>
  );
}

export default CompletedTasks;

