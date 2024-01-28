import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import { FiEdit2 } from "react-icons/fi";

function EditTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/GetTaskById/${taskId}`)
      .then((response) => response.json())
      .then((data) => {
        setTask(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [taskId]);

  const handleSave = () => {
    // Prepare the data to be sent for updating the task
    const updatedTask = {
      status: task.status || "",
      comments: task.comments || "",
      priority: task.priority || "",
    };

    // Make the PUT request to update the task
    fetch(`http://localhost:8000/api/UpdateTask/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Task updated successfully", data);
        // Handle any success actions or show a success message
        setShowAlert(true);
      })
      .catch((error) => {
        console.error("Error updating task", error);
        // Handle any error cases or show an error message
      });
  };

  return (
    <>
      <Container className="col-lg-5 text-center my-auto mt-5 mb-5 py-4 border border bg-body-tertiary">
        <h1 className="py-3">Edit Task</h1>
        {showAlert && (
          <Alert
            variant="success"
            onClose={() => setShowAlert(false)}
            dismissible
          >
            Task updated successfully.
          </Alert>
        )}
        <FloatingLabel controlId="floatingInput" label="Title" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Title"
            value={task.title || ""}
            disabled
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea"
          className="mb-3"
          label="Description"
        >
          <Form.Control
            as="textarea"
            placeholder="Description"
            style={{ height: "100px" }}
            value={task.description || ""}
            disabled
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingInput"
          label="Deadline"
          className="mb-3"
        >
          <Form.Control
            type="date"
            placeholder="Deadline"
            value={task.deadline || ""}
            disabled
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingSelect"
          label="Assign Task To:"
          className="mb-3"
        >
          <Form.Select
            aria-label="Floating label select example"
            value={task.assign_task}
            disabled
          >
            <option value="" disabled hidden>
              Select Assignee
            </option>
            {task.assign_task &&
              task.assign_task.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingSelect"
          label="Status:"
          className="mb-3"
        >
          <Form.Select
            aria-label="Floating label select example"
            value={task.status || ""}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
          >
            <option value="none" selected hidden>
              Open this select menu
            </option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingTextarea"
          className="mb-3"
          label="Comments"
        >
          <Form.Control
            as="textarea"
            placeholder="Comments"
            style={{ height: "100px" }}
            value={task.comments || ""}
            onChange={(e) => setTask({ ...task, comments: e.target.value })}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="floatingSelect"
          label="Priority:"
          className="mb-3"
        >
          <Form.Select
            aria-label="Floating label select example"
            value={task.priority || ""}
            onChange={(e) => setTask({ ...task, priority: e.target.value })}
          >
            <option value="none" selected hidden>
              Open this select menu
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </FloatingLabel>
        <Button variant="dark" className="w-100" onClick={handleSave}>
          <FiEdit2 /> Update
        </Button>
      </Container>
    </>
  );
}

export default EditTask;
