<?php
include_once './config/request_config.php';
include './config/dbconfig.php';

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


if($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (!isset($_SESSION['userId'], $_SESSION['loggedIn']))
    {
        http_response_code(401);
        echo createResponses("error", "Not authenticated"); //! Need to check this - potential security issue
        exit;
    } else {
        $user = $_SESSION["userId"];
        $budgets = [];
        global $connection;
        $stmt = $connection->prepare("SELECT id, name, max, created_at FROM budgets WHERE user_id = ?");

        if(!$stmt) 
        {
            http_response_code(500);
            echo createResponses('error', 'Database query execution failed.', []);
            exit;
        }

        $stmt->bind_param("i", $user); 
        $stmt->execute();
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc())
        {
            $budgets[] =  $row;
        }
        echo createResponses('success', 'Budgets Found', $budgets); // need to make sure that this is able to return multiple rows 
        $stmt->close();
    }
}

    
    

