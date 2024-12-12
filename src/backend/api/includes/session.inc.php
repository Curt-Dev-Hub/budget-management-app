<?php
session_start();
include '../config/request_config.php';

// Error reporting during development stage 
error_reporting(E_ALL);
ini_set('display_errors', 1);

// sleep(3);

echo $_SESSION['name'];
echo $_SESSION['username'];
echo $_SESSION['loggedIn'];

// check if user is logged in 
// if(isset($_SESSION['user_id']) && isset($_SESSION['username']))
if($_SERVER['REQUEST_METHOD'] === 'GET')
{
    echo json_encode([
        'status' => 'success',
        'data' => [
            'name' => $_SESSION['name'],
            'username' => $_SESSION['username'],
            'message' => $_SESSION['loggedIn'],
        ]
    ]);
} else {
    http_response_code(401);
    echo json_encode([
        'status' => 'error',
        'message' => 'Not authenticated'
    ]);
}