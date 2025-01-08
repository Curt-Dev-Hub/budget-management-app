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
    http_response_code(401);
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




if ($_SERVER['REQUEST_METHOD'] === 'POST') 
{
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) 
    {
        $description = isset($data['description']) ? $data['description'] : '';
        $amount = isset($data['amount']) ? $data['amount'] : '';
        $budgetId = isset($data['budget_id']) ? $data['budget_id'] : '';

        if (!$data || empty($data['description']) || empty($data['amount'])) 
        {
            http_response_code(400);
            echo $data;
            echo strval($data['description']);
            echo strval($data['amount']);
            echo createResponses('error', 'Missing required fields.', []);
            exit;
        }

        $description = trim($data['description']);
        $amount = $data['amount'];

        if (!validateInput($description) || !validateInput($amount)) 
        {
            http_response_code(400);
            echo createResponses('error', 'You have entered incorrect information.');
            // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Entered data did not meet requirements");
            exit;
        }


        http_response_code(200);
        echo createResponses(
            'success',
            'Expense successfully created.',
            [$data['amount'], $data['description'], $data['budget_id']]
        );

        //TODO: Need to pass in budgetId
        saveUserExpense($data['budget_id'], $data['description'], $data['amount'], $_SESSION['userId'],);
    } else {
        http_response_code(500); // check this
        echo createResponses(
            'error',
            'Expense was not added, data has not been received'
        );
        exit;
    }
}

// currently testing

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') 
{
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) 
    {
        $expenseId = isset($data['id']) ? $data['id'] : '';

        if (!$data || empty($data['id'])) 
        {
            http_response_code(400);
            echo createResponses('error', 'Missing required fields.', []);
            exit;
        }

        $expenseId = $data['id'];

        if (!validateInput($expenseId)) 
        {
            http_response_code(400);
            echo createResponses('error', 'You have entered incorrect information.');
            // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Entered data did not meet requirements");
            exit;
        }

        http_response_code(200);
        echo createResponses(
            'success',
            'Expense successfully deleted.',
            [$data['id']]
        );

        deleteExpense($data['id']);
    } else {
        http_response_code(500); // check this
        echo createResponses(
            'error',
            'Expense was not deleted, data has not been received'
        );
        exit;
    }
}



function saveUserExpense($budgetId, $description, $amount, $userId)
{
    global $connection;
    $query = $connection->prepare("INSERT INTO expenses(budget_id, description, amount, user_id)
    VALUES(?,?,?,?)");
    $query->bind_param("isdi", $budgetId, $description, $amount, $userId);
    $query->execute();
}

//TODO: Need to add delete functionality
function deleteExpense($expenseId)
{
    global $connection;
    $query = $connection->prepare("DELETE FROM expenses WHERE id = ?");
    $query->bind_param("i", $expenseId);
    $query->execute();
}

