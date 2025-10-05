<?php

//TODO: Call API header

require_once 'config/request_config.php';

require_once 'config/dbconfig.php';

require_once './includes/request_logger.inc.php';


$config = array(
    'db_hostname' => 'localhost',
    'db_name' => 'budgeting_data',
    'db_username' => 'root',
    'db_password' => '',
);

$connection = new mysqli($config["db_hostname"], $config["db_username"], $config["db_password"], $config["db_name"], 3308);

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
    if (preg_match('/<script\b[^>]*>(.*?)<\/script>/is', $input))
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

// function checkRequestLimit($ip_address)
// {
    // Refactor -------------------------------------------------------------
    // global $connection;
    // $stmt = $connection->prepare("SELECT COUNT(*) FROM requests
    // WHERE ip_address = $ip_address AND request_time > DATE_SUB(NOW(INTERVAL 1 HOUR");
    // $stmt->bind_param("s", $ip_address);
    // $stmt->execute();
    // $result = $stmt->get_result();
    // $row = $stmt->fetch_assoc();



    // ----------------------------------------------------------------------
    // $query = $connection->prepare("SELECT COUNT(*) FROM requests
    // WHERE ip_address = :ip_address AND request_time > DATE_SUB(NOW(),
    // INTERVAL 1 HOUR)");
    // $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
    // $query->execute();
    // $result = $query->fetch(PDO::FETCH_ASSOC);

//     //TODO: 100 requests per hour
//     if($result['COUNT(*)'] > 100)
//     {
//         return false;
//     }

//     return true;
// }



//TODO: Limit access time - prevention of excessive requests 

// function checkRequestTime($ip_address)
// {
//     global $connection;
//     $query = $connection->prepare("SELECT request_time FROM requests 
//     WHERE ip_address = :ip_address 
//     ORDER BY request_time 
//     DESC LIMIT 1");
//     $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
//     $query->execute();
//     $result = $query->fetch(PDO::FETCH_ASSOC);

//     if($result)
//     {
//         $last_request_time = strtotime($result['request_time']);
//         $current_time = strtotime(date('Y-m-d H:i:s'));
        
//         if($current_time - $last_request_time < 1)
//         {
//             return false;
//         }
//     }
//     return true;
// }

//TODO: Encryption
function xorEncrypt($input)
{
    return base64_encode($input);
}

//TODO: Processing API requests

// if($_SERVER['REQUEST_METHOD'] == 'POST')
// {
    // if(!checkRequestLimit($_SERVER['REMOTE_ADDR'])) 
    // {
    //     echo createResponse('error', 'Too many requests! Try again later.', []);
    //     exit;
    // }

    // if(!checkRequestTime($_SERVER['REMOTE_ADDR'])) 
    // {
    //     echo createResponse('error', 'Request too common! Try again later.', []);
    //     exit;
    // }

// }
//TODO: Check and process entered data  


$data = json_decode(file_get_contents('php://input'), true);

if ($data === null) 
{
    // debugging to understand the incoming data
    error_log('Received data: ' . file_get_contents('php://input'));
    saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Invalid or missing JSON data received.");
    echo createResponse('error', 'Invalid JSON data received.');
    exit;
}

if ($data) {
    
    $name = isset($data['name']) ? $data['name'] : '';
    $username = isset($data['username']) ? $data['username'] : '';
    $password = isset($data['password']) ? $data['password'] : '';
    

    if (!validateInput($username) || !validateInput($password) || !validateInput($name)) {
        echo createResponse('error', 'You have entered incorrect information.');
        saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Entered data did not meet requirements");
        exit;
    }

    if (empty($username) or empty($name) or empty($password)) {
        echo createResponse('error', 'All fields are mandatory on the form.');
        saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "All fields are mandatory on the form.");
        exit;
    }
    // DONE *Add this requirement into react Register.jsx form for user* ✅
    $pattern = '/^(?=.*[0-9])(?=.*[A-Z]).{8,24}$/';
    if (!preg_match($pattern, $password)) {
        echo createResponse('error', 'The password is not strong enough. It must be at least 8 characters long and contain at least one uppercase letter and number. Your password can be a maximum of 24 characters.');
        saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "The password is not strong enough.");
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

    //TODO Implement this at a later stage
    // $encrypted_email = xorEncrypt($email, 'secret_key');

    echo createResponse(
        'success',
        'Account registered successfully.',
        [
            'name' => $name,
            'username' => $username,
            'password' => $encrypted_password,
            // 'email' => $encrypted_email
        ]
    );
    
    saveUserDetails($name, $username, $encrypted_password,); // might need to open a new connection here to get new user_id
    saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 1);

} else {
    echo createResponse('error', 'Wrong request.', []);
    saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Wrong request");
    exit;
}


function saveUserDetails($name, $username, $password)
{
    global $connection;
    $query = $connection->prepare("INSERT INTO users(name, username, password)
    VALUES(?,?,?)");
    $query->bind_param("sss", $name, $username, $password);
    $query->execute();
    //! Have made changes here - related to newly registered user not being initially authenticated
    session_start();
    $_SESSION['user_id'] = $connection->insert_id;
    $_SESSION['loggedIn'] = true;
    $_SESSION['username'] = $username;
    $_SESSION['name'] = $name;
}




