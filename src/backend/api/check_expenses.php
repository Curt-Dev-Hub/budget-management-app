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
        $expenses = [];
        global $connection;
        //Todo: need to edit the below to also take in a budget id
        $stmt = $connection->prepare("SELECT budget_id, amount, description, updated_at FROM expenses WHERE user_id = ?");

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
            $expenses[] =  $row;
        }
        if(empty($expenses))
        {
            http_response_code(200);
            echo createResponses('success', 'No expenses found for user', []);
            exit;
        } else {
            http_response_code(200);
            echo createResponses('success', 'Expenses Found', $expenses); 
            $stmt->close();
            exit;
        }
    }
}

    
    

