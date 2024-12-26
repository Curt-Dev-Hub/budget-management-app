<?php
require_once 'config/request_config.php';
include 'config/dbconfig.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();


function createResponses($status, $message, $data = [])
{
    $response =
    [
        'status' => $status,
        'message' => $message,
        'data' => $data,
    ];
    return json_encode($response);
}


if (!isset($_SESSION['userId'], $_SESSION['loggedIn']))
{
    echo createResponses("error", "You must be logged in to access this feature"); //! Need to check this - potential security issue
    exit;
}

function validateInput($input)
{
    // SQL injection prevention
    if(preg_match('/script\b[^>]*>(.*?)<\/script/is', $input))
    {
        return false;
    }

    //Todo: XSS protection
    if(preg_match('/<[^>]*>/', $input))
    {
        return false;
    }

    return true;
}



$data = json_decode(file_get_contents('php://input'), true);


if($data)
{
    $name = isset($data['name']) ? $data['name'] : '';
    $max = isset($data['max']) ? $data['max'] : '';

    if (!$data || empty($data['name']) || empty($data['max'])) 
    {
        http_response_code(400);
        echo createResponses('error', 'Missing required fields.', []);
        exit;
    }

    $name = trim($data['name']);
    $max = $data['max'];
    
    if (!validateInput($name) || !validateInput($max)) 
    {
        http_response_code(400);
        echo createResponses('error', 'You have entered incorrect information.');
        // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Entered data did not meet requirements");
        exit;
    }

    if (empty($name) or empty($max)) 
    {
        http_response_code(400);
        echo createResponses('error', 'All fields are mandatory on the form.');
        // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "All fields are mandatory on the form.");
        exit;
    }
    http_response_code(200);
    echo createResponses(
        'success',
        'Budget successfully created.',
        [$data['max'], $data['name']]
    );

    saveUserBudget($data['name'], $data['max'], $_SESSION['userId'],);
    

} else { 
    http_response_code(500); // check this
    echo createResponses(
        'error',
        'Budget was not added, data has not been received'
    );
    exit;
}

function saveUserBudget($name, $max, $userId)
{
    global $connection;
    $query = $connection->prepare("INSERT INTO budgets(name, max, user_id)
    VALUES(?,?,?)");
    $query->bind_param("sdi", $name, $max, $userId);
    $query->execute();
}

