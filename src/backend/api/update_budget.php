<?php
require_once 'config/request_config.php';
include 'config/dbconfig.php';

session_start();

if (!isset($_SESSION['user_id'], $_SESSION['loggedIn']))
{
    exit;
}

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

    $name = trim($data['username']);
    $max = $data['max'];
    
    if (!validateInput($name) || !validateInput($max)) 
    {
        http_response_code(400);
        echo createResponse('error', 'You have entered incorrect information.');
        // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Entered data did not meet requirements");
        exit;
    }

    if (empty($name) or empty($max) or empty($password)) 
    {
        http_response_code(400);
        echo createResponse('error', 'All fields are mandatory on the form.');
        // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "All fields are mandatory on the form.");
        exit;
    }

    echo createResponse(
        'success',
        'Budget successfully created.'
    );

    

} else { 
    http_response_code();
    echo createResponse(
        'error',
        'Budget was not added, please contact the website owner'
    );
}

function saveUserBudget($name, $max, $userId)
{
    global $connection;
    $query = $connection->prepare("INSERT INTO budgets(name, max, user_id)
    VALUES(?,?,?)");
    $query->bind_param("sdi", $name, $max, $userId);
    $query->execute();
}

