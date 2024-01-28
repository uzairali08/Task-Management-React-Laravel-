<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TaskController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//User Controller API Routes
Route::post("/Register", [UserController::class, "RegisterUser"]);
Route::post("/Login", [UserController::class, "UserLogin"]);
Route::get("/GetUserEmails", [UserController::class, "getAllUserEmails"]);

// Task Controller API Routes 
Route::post("/CreateTask", [TaskController::class, "CreateTask"]);
Route::get("/GetTasks", [TaskController::class, "GetTasks"]);
Route::get("/MyTasks/{email}", [TaskController::class, "getTasksByEmail"]);
Route::get("/GetTaskById/{taskId}", [TaskController::class, "getTaskById"]);
Route::put('/UpdateTask/{taskId}', [TaskController::class, 'updateTask']);
Route::delete('/DeleteTask/{taskId}', [TaskController::class, 'deleteTask']);
Route::get("/GetCompletedTasks", [TaskController::class, "getCompletedTasks"]);

Route::post('/send-email', [TaskController::class, 'sendEmail']);
