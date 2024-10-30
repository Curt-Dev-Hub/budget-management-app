<?php

//TODO: Call API header

require_once '../api/config/request_config.php';

//TODO: Connect to the database

require_once '../api/config/dbconfig.php';

//TODO: Output values

function createResponse($status, $message, $data = [])
{
    $response = 
    [
        'status' => $status,
        'message' => $message,
        'data' => $data,
    ];
    return json_encode($response);
}

//TODO: Validate

function validateInput($input)
{
    //TODO: against SQL injection
    if (preg_match('/<script\b[^>]*>(.*?<\/script>/is', $input))
    {
        return false;
    }

    //TODO: against XSS
    if (preg_match('/<[^>]*>/', $input))
    {
        return false;
    }

    return true;
}
    


//TODO: Brute force protection

function checkRequestLimit($ip_address)
{
    global $connection;
    $query = $connection->prepare("SELECT COUNT(*) FROM requests
    WHERE ip_address = :ip_address AND request_time > DATE_SUB(NOW(),
    INTERVAL 1 HOUR)");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);

    //TODO: 100 requests per hour
    if($result['COUNT(*)'] > 100)
    {
        return false;
    }

    return true;
}



//TODO: Limit access time - prevention of excessive requests 

function checkRequestTime($ip_address)
{
    global $connection;
    $query = $connection->prepare("SELECT request_time FROM requests 
    WHERE ip_address = :ip_address 
    ORDER BY request_time 
    DESC LIMIT 1");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->execute();
    $result = $query->fetch(PDO::FETCH_ASSOC);

    if($result)
    {
        $last_request_time = strtotime($result['request_time']);
        $current_time = strtotime(date('Y-m-d H:i:s'));
        
        if($current_time - $last_request_time < 1)
        {
            return false;
        }
    }
    return true;
}

//TODO: Encryption
function xorEncrypt($input)
{
    return base64_encode($input);
}

//TODO: Processing API requests

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    if(!checkRequestLimit($_SERVER['REMOTE_ADDR'])) 
    {
        echo createResponse('error', 'Too many requests! Try again later.', []);
        exit;
    }

    if(!checkRequestTime($_SERVER['REMOTE_ADDR'])) 
    {
        echo createResponse('error', 'Request too common! Try again later.', []);
        exit;
    }

}
//TODO: Check and process entered data  

$data = json_decode(file_get_contents('php://input'), true);
if ($data) {

    $username = isset($data['username']) ? $data['username'] : '';
    $password = isset($data['password']) ? $data['password'] : '';
    $email = isset($data['email']) ? $data['email'] : '';

    if (!validateInput($username) || !validateInput($password) || !validateInput($email)) {
        echo createResponse('error', 'You have entered incorrect information.');
        exit;
    }

    if (empty($username) or empty($email) or empty($password)) {
        echo createResponse('error', 'All fields are mandatory on the form.');
        exit;
    }

    $pattern = '/^(?=.*[0-9])(?=.*[A-Z]).{8,24}$/';
    if (!preg_match($pattern, $password)) {
        echo createResponse('error', 'The password is not strong enough. It must be at least 8 characters long and contain at least one uppercase letter and number. Your password can be a maximum of 24 characters.');
        exit;
    }

    $encrypted_password = password_hash(
        $password,
        PASSWORD_ARGON2ID,
        [
            'memory_cost' => 2048,
            'time_cost'   => 4,
            'threads'     => 2,
        ]
    );
    $encrypted_email = xorEncrypt($email, 'secret_key');

    echo createResponse(
        'success',
        'Account registered successfully.',
        [
            'username' => $username,
            'password' => $encrypted_password,
            'email' => $encrypted_email
        ]
    );

    saveRequest($_SERVER['REMOTE_ADDR'], $username, $encrypted_password, $encrypted_email);
} else {
    echo createResponse('error', 'Wrong request.', []);
    exit;
}


function saveRequest($ip_address, $username, $password, $email)
{
    global $connection;
    $query = $connection->prepare("INSERT INTO requests (ip_address, username, password, email)
    VALUES (:ip_address, :username, :password, :email)");
    $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    $query->bindParam(':username', $username, PDO::PARAM_STR);
    $query->bindParam(':password', $password, PDO::PARAM_STR);
    $query->bindParam(':email', $email, PDO::PARAM_STR);
    $query->execute();
}




