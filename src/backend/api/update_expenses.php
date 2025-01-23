<?php
require_once 'config/request_config.php';
include 'config/dbconfig.php';

error_reporting(E_ALL);
ini_set('display_errors', 1);
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

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
    echo createResponses("error", "You must be logged in to access this feature"); 
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

        saveUserExpense($data['budget_id'], $data['description'], $data['amount'], $_SESSION['userId'],);
    } else {
        http_response_code(500); 
        echo createResponses(
            'error',
            'Expense was not added, data has not been received'
        );
        exit;
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') 
{
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data) 
    {
        $expenseId = isset($data['id']) ? $data['id'] : '';
        $budgetId = isset($data['budgetId']) ? $data['budgetId'] : '';

        if (!$data || empty($data['id']) || empty($data['budgetId'])) 
        {
            http_response_code(400);
            echo createResponses('error', 'Missing required fields.', []);
            exit;
        }

        $expenseId = $data['id'];
        $budgetId = $data['budgetId'];

        if (!validateInput($expenseId) && !validateInput($budgetId)) 
        {
            http_response_code(400);
            echo createResponses('error', 'You have entered incorrect information.');
            // saveRequest($_SERVER['REMOTE_ADDR'], null, 'register', 0, "Entered data did not meet requirements");
            exit;
        }

        deleteExpense($expenseId, $budgetId);

        http_response_code(200);
        echo createResponses(
            'success',
            'Expense successfully deleted.',
            [$data['id']]
        );

        
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

    try {
        $connection->begin_transaction();
        $query1 = $connection->prepare("INSERT INTO expenses(budget_id, description, amount, user_id)
        VALUES(?,?,?,?)");
        $query1->bind_param("isdi", $budgetId, $description, $amount, $userId);
        $query1->execute();

        $query2 = $connection->prepare("UPDATE budgets SET updated_at = NOW() WHERE id = ?");
        $query2->bind_param("i", $budgetId);
        $query2->execute();
    } catch (Exception $e) {
        $connection->rollback();
        throw $e;
    } finally {
        if (isset($query1)) $query1->close();
        if (isset($query2)) $query2->close();
    }
}

//TODO: Need to add delete functionality
function deleteExpense($expenseId, $budgetId)
{
    global $connection;

    try {
        $connection->begin_transaction();
        $query1 = $connection->prepare("DELETE FROM expenses WHERE id = ?");
        $query1->bind_param("i", $expenseId);
        $query1->execute();

        $query2 = $connection->prepare("UPDATE budgets SET updated_at = NOW() WHERE id = ?");
        $query2->bind_param("i", $budgetId);
        $query2->execute();

        $connection->commit();
    } catch(Exception $e) {
        $connection->rollback();
        throw $e;
    } finally {
        if (isset($query1)) $query1->close();
        if (isset($query2)) $query2->close();
    }
}

