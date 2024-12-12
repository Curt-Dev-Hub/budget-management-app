<?php

//Todo: Call API header
require_once 'config/request_config.php';

include 'config/dbconfig.php';

include_once 'includes/request_logger.inc.php';

//Todo: Output values
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


//Todo: protect against SQL injection / validation
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

//! Working on Currently
//Todo: Brute force protection - Limit requests
// function checkRequestLimit($ip_address)
// {
//     global $connection;

//     $query = $connection->prepare("SELECT COUNT(*) FROM requests
//     WHERE ip_address = :ip_address AND request_time > DATE_SUB(NOW(),
//     INTERVAL 1 HOUR)");
//     $query->bindParam(':ip_address', $ip_address, PDO::PARAM_STR);
//     $query->execute();
//     $result = $query->fetch(PDO::FETCH_ASSOC);

//     //Todo: Maximum 100 requests/hour
//     if($result['COUNT(*)'] > 100)
//     {
//         return false;
//     }

//     return true;
// }

//Todo: Limitation of access time
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

//Todo: Encrypt
function xorEncrypt($input)
{
    return base64_encode($input);
}

//Todo: Processing API requests
if($_SERVER['REQUEST_METHOD'] == 'POST') 
{

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

    //Todo: Check and process entered data


    $data = json_decode(file_get_contents('php://input'), true);
    if($data) 
    {
        $username = isset($data['username']) ? $data['username'] : '';
        $password = isset($data['password']) ? $data['password'] : '';

        if (!$data || empty($data['username']) || empty($data['password'])) 
        {
            http_response_code(400); // set response code
            echo createResponses('error', 'Missing required fields.', []);
            exit;
        }

        // $username = base64_encode($data['username']);
        $username = trim($data['username']);
        $password = $data['password'];
       

        global $connection;
        $stmt = $connection->prepare("SELECT * FROM users WHERE username = ?"); // using $username here could open up SQL injection vulnerabilities 
        
        if(!$stmt) 
        {
            saveRequest($_SERVER['REMOTE_ADDR'], null, 'login', 0, 'Database preparation issue');
            http_response_code(500);
            echo createResponses('error', 'Database preparation issue.', []);
            exit;
        }
        
        $stmt->bind_param("s", $username); // removed $password from here
        $stmt->execute();
        $result = $stmt->get_result();

        //save user data for checking whether user exists
        $user = $result->fetch_assoc();

        if(!$user)
        {
            saveRequest($_SERVER['REMOTE_ADDR'], null, 'login', 0, 'Invalid login credentials');
            http_response_code(401);
            echo createResponses('error', 'Invalid login credentials', []);
            exit;
        }
        
        
        // Verify password
        $password_hash = $user['password'];
        if(password_verify($password, $password_hash))
        {
            session_start();
            session_regenerate_id(true);
            saveRequest($_SERVER['REMOTE_ADDR'], $user['id'], 'login', 1);
            $_SESSION['username'] = $user['username'];
            $_SESSION['name'] = $user['name'];
            $_SESSION['loggedIn'] = true; //check this 
            $username = $_SESSION['username'];
            $_SESSION['userId'] = $user['id']; //! have added this in for use in update_budget update_expense 
            echo createResponses('success', 'Logged in successfully.', ['username' => $_SESSION['username']]);
            $stmt->close();
        }

        else if(!password_verify($password, $password_hash)) 
        {
            saveRequest($_SERVER['REMOTE_ADDR'], null, 'login', 0, 'Invalid login information');
            http_response_code(401);
            echo createResponses('error', "Incorrect login information.", []);
            exit;    
        }
        
    } else {
        saveRequest($_SERVER['REMOTE_ADDR'], null, 'login', 0, 'Incorrect login information');
        http_response_code(401);
        echo createResponses('error', "Incorrect login information.", []);
        exit;
    }

}
