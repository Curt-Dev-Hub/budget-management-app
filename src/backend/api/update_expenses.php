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
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if(!$data)
        {
            throw new Exception("Expense was not added, data has not been received", 400);
        }

        if (empty($data['description']) || empty($data['amount']) || empty($data['budget_id'])) 
        {
            throw new Exception("Missing required fields", 400);
        }

        $description = trim($data['description']);
        $amount = $data['amount'];
        $budgetId = $data['budget_id'];

        if(!validateInput($description) || !validateInput($amount) || !validateInput($budgetId)) 
        {
            throw new Exception("You have entered incorrect information", 400);
        }

        saveUserExpense($budgetId, $description, $amount, $_SESSION['userId'],);

        http_response_code(200);
        echo createResponses(
            'success',
            'Expense successfully created.',
            [$budgetId, $description, $amount,]
        );       
    } catch (Exception $e) {
        $code = $e->getCode() ?: 500;
        http_response_code($code);
        echo createResponses(
            'error',
            $e->getMessage()
        );
        exit;
    }
}


if ($_SERVER['REQUEST_METHOD'] === 'DELETE') 
{
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if (!$data) 
        {
            throw new Exception("Expense was not deleted, data has not been received", 400);
        } 
    
        if (empty($data['id']) || empty($data['budgetId'])) 
        {
            throw new Exception("Missing required fields", 400);
        }

        $expenseId = $data['id'];
        $budgetId = $data['budgetId'];

        if (!validateInput($expenseId) || !validateInput($budgetId)) 
        {
            throw new Exception("You have entered incorrect information", 400);
        }

        deleteExpense($expenseId, $budgetId);

        http_response_code(200);
        echo createResponses(
            'success',
            'Expense successfully deleted.',
            [$expenseId]
        );
        
    } catch (Exception $e) {
        $code = $e->getCode() ?: 500;
        http_response_code($code);
        echo createResponses(
            'error',
            $e->getMessage()
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

        $connection->commit();
    } catch (Exception $e) {
        $connection->rollback();
        throw $e;
    } finally {
        if(isset($query1)) $query1->close();
        if(isset($query2)) $query2->close();
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
        if(isset($query1)) $query1->close();
        if(isset($query2)) $query2->close();
    }
    
}

