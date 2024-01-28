<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Mail\Notification;
use Illuminate\Support\Facades\Mail;
use App\Jobs\TestEmailJob;

class TaskController extends Controller
{
    //Task Creation function
    function CreateTask(Request $request)
    {
    // Validate the incoming request data
    $validatedData = $request->validate([
        'title' => 'required|string',
        'description' => 'required|string',
        'deadline' => 'required|date',
        'assign_task' => 'required|array',
    ]);

    // Create a new instance of the Task model
    $task = new Task;

    // Set the properties of the task using the validated data
    $task->title = $validatedData['title'];
    $task->description = $validatedData['description'];
    $task->deadline = $validatedData['deadline'];
    $task->assign_task = json_encode($validatedData['assign_task']);

    // Set additional properties of the task
    $task->status = 'Not Started'; // Set status as "Not Started"
    $task->comments = ''; // Set comments as empty
    $task->priority = ''; // Set priority as empty

    // Save the task in the database
    $task->save();

    // Call the sendWelcomeEmail function and pass the necessary data
    $this->sendEmail(
        $validatedData['title'],
        $validatedData['description'],
        $validatedData['deadline'],
        $validatedData['assign_task']
    );

    // Return a JSON response indicating successful task creation
    return response()->json(['message' => 'Task stored successfully']);
    }


    //Get All Tasks
    function GetTasks()
    {
    // Retrieve all tasks from the Task model
    $tasks = Task::all();

    // Return a JSON response containing the tasks
    return response()->json($tasks);
    }


    // Get Current User's Tasks 
    public function getTasksByEmail($email)
    {
    // Retrieve tasks that are assigned to the specified email
    $tasks = Task::whereRaw("JSON_CONTAINS(assign_task, '\"$email\"')")->get();

    // Return a JSON response containing the tasks
    return response()->json($tasks);
    }


    // Get Task Detail by id 
    public function getTaskById($taskId)
    {
    // Find the task with the specified ID
    $task = Task::find($taskId);

    // Check if the task exists
    if (!$task) {
        // Task not found, return a JSON response with an appropriate message and status code
        return response()->json(['message' => 'Task not found'], 404);
    }

    // Decode the "assign_task" JSON field to convert it into an array
    $task->assign_task = json_decode($task->assign_task);

    // Return a JSON response containing the task
    return response()->json($task);
    }


    // Edit Task 
    public function updateTask(Request $request, $taskId)
    {
    // Validate the incoming request data
    $validatedData = $request->validate([
        'status' => 'required|string',
        'comments' => 'nullable|string',
        'priority' => 'nullable|string',
    ]);

    // Find the task with the specified ID
    $task = Task::find($taskId);

    // Check if the task exists
    if (!$task) {
        // Task not found, return a JSON response with an appropriate message and status code
        return response()->json(['message' => 'Task not found'], 404);
    }

    // Update the task properties with the validated data
    $task->status = $validatedData['status'];
    $task->comments = $validatedData['comments'] ?? '';
    $task->priority = $validatedData['priority'] ?? '';
    $task->save();

    // Return a JSON response indicating the task was updated successfully
    return response()->json(['message' => 'Task updated successfully']);
    }


    //Delete Task
    public function deleteTask($id)
    {
    // Find the task with the specified ID
    $task = Task::find($id);

    // Check if the task exists
    if (!$task) {
        // Task not found, return a JSON response with an appropriate error message and status code
        return response()->json(['error' => 'Task not found'], 404);
    }

    // Delete the task
    $task->delete();

    // Return a JSON response indicating that the task was deleted successfully
    return response()->json(['message' => 'Task deleted successfully']);
    }



    // Get Completed Tasks 
    public function getCompletedTasks()
    {
    // Retrieve all tasks with a status of "Completed"
    $tasks = Task::where('status', 'Completed')->get();

    // Return a JSON response with the completed tasks
    return response()->json($tasks);
    }


    // Send Email to user on Task Creation
    public function sendEmail($title, $description, $deadline, $assignTask)
    {
    $user = $assignTask; // Assuming you have a logged-in user
    // Mail::to($user)->send(new Notification($title, $description, $deadline, $assignTask));
    // You can pass additional data to the Mailable constructor if needed

    // return response()->json(['message' => 'Email sent']);

    dispatch(new TestEmailJob($title, $description, $deadline, $assignTask));

    return response()->json(['message' => 'Email job dispatched']);
    }


}
