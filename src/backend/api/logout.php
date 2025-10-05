<?php
// Error reporting during development stage 
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');
require_once 'config/request_config.php';

session_start();

if($_SERVER["REQUEST_METHOD"] === "GET") 
{
    try 
    {
        $_SESSION = [];
        session_destroy();

        echo json_encode([
            'status' => 'success',
            'message' => "You have logged out successfully"
        ]);
    } catch(Exception $e) {
        echo json_encode([
            'status' => 'error',
            'message' => 'Logout failed: ' . $e->getMessage()
         ]);
    }
    exit;
}
http_response_code(405); // Method Not Allowed
echo json_encode([
    'status' => 'error',
    'message' => 'Invalid request method'
]);
exit;