<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
// use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserController extends Controller
{
    // User registration function
    function RegisterUser(Request $req){
    // Get the email and password from the request
    $email = $req->input('email');
    $password = $req->input('password');

    // Check if email and password are not empty
    if (!empty($email) && !empty($password)) {
        // Create a new User instance
        $user = new User;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->save();

        // Check if the user was successfully saved
        if ($user) {
            // Registration successful
            return response()->json(['message' => 'Registration successful']);
        } else {
            // Registration failed
            return response()->json(['message' => 'Registration failed']);
        }
    } else {
        // Email or password is missing
        return response()->json(['message' => 'Email and password are required'], 400);
    }
    }

    
    //User login function
    function UserLogin(Request $req)
    {
    $email = $req->input('email');
    $password = $req->input('password');

    // Find the user by email
    $user = User::where('email', $email)->first();

    if ($user) {
        // User found, verify password
        if (Hash::check($password, $user->password)) {
            // Password is correct, login successful
            return response()->json(['message' => 'Login successful']);
        } else {
            // Password is incorrect
            return response()->json(['message' => 'Invalid password'], 401);
        }
    } else {
        // User not found
        return response()->json(['message' => 'User not found'], 404);
    }
    }

    
    //Get User Emails
    function getAllUserEmails()
    {
    // Retrieve all users from the User model and select only the 'email' column
    $users = User::select('email')->get();

    // Extract the 'email' values from the collection of users using pluck()
    $emails = $users->pluck('email');

    // Return the emails as a JSON response
    return response()->json($emails);
    }

    
}
