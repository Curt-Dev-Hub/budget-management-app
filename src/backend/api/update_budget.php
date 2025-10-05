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
    echo createResponses("error", "User not authenticated"); 
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


if($_SERVER['REQUEST_METHOD'] === 'POST')
{
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if(!$data)
        {
            throw new Exception('Budget was not added, data has not been received', 400);
        }

        if(empty($data['name']) || empty($data['max'])) 
        {
            throw new Exception('All fields are mandatory on the form.', 400);
        }

        $name = trim($data['name']);
        $max = $data['max'];

        if(!validateInput($name) || !validateInput($max)) 
        {
            throw new Exception('You have entered incorrect information.', 400);
        }

        $result = saveUserBudget($name, $max, $_SESSION['userId']);
        // saveUserBudget($name, $max, $_SESSION['userId']); Testing

        http_response_code($result['code']);
        echo $result['response'];
        exit;

    } catch(Exception $e) {
        $code = $e->getCode() ?: 500;
        http_response_code($code);
        echo createResponses('error', $e->getMessage());
        exit;
    }
}


function saveUserBudget($name, $max, $userId) {
    global $connection;
    $query = null;
    
    try {
        // Input validation
        if(empty($name) || !is_numeric($max) || !is_numeric($userId)) 
        {
            throw new Exception('Invalid input parameters', 400);
        }

        // Check connection
        if(!$connection) 
        {
            error_log("Database connection failed", 0);
            throw new Exception("Database connection failed", 500);
        }

        // check for duplicate entry
        //! testing
        $stmt = $connection->prepare("SELECT id FROM budgets WHERE name = ? AND user_id = ?");
        $stmt->bind_param("si", $name, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // echo createResponses('error', "A budget with the name '$name' already exists");
            throw new Exception("A budget with the name '$name' already exists", 409);
        }

        $query = $connection->prepare("INSERT INTO budgets(name, max, user_id) VALUES(?,?,?)");

        if(!$query) 
        {
            throw new Exception("Query preparation failed", 500);
        }

        $query->bind_param("sdi", $name, $max, $userId);
        
        
        if (!$query->execute()) 
        {
            throw new Exception("Query execution failed", 500);
        }

        $newBudgetId = $query->insert_id;
        
        return [
            'status' => true,
            'code' => 201,
            'response' => createResponses('success', 'Budget created successfully', ['id' => $newBudgetId])
        ];

    } catch (Exception $e) {
        // error handling for duplicate entry
        if($query && $query->errno === 1062)
        {
            return [
                'status' => false,
                'code' => 409,
                'response' => createResponses('error', 'Budget already exists'),
            ];
        }
        $code = $e->getCode() ?: 500;
        error_log("Database error: " . $e->getMessage());
        
        return [
            'status' => false,
            'code' => $code,
            'response' => createResponses('error', $e->getMessage())
        ];
    } finally {
        if(isset($query)) 
        {
            $query->close();
        }
    }
}


if($_SERVER['REQUEST_METHOD'] === 'DELETE')
{
    try {
        $data = json_decode(file_get_contents('php://input'), true);

        if(!$data)
        {
            throw new Exception('Budget was not deleted, data has not been received', 400);
        }

        $budgetId = isset($data['id']) ?? '';
        if(empty($data['id'])) 
        {
            throw new Exception('Missing required fields', 400);
        }

        $budgetId = $data['id'];

        if (!validateInput($budgetId)) {
            throw new Exception('Invalid budget ID format', 400);
        }

        deleteBudget($budgetId);
        
        http_response_code(200);
        echo createResponses(
            'success',
            'Budget successfully deleted.',
            [$budgetId]
        );
    } catch(Exception $e) {
        $code = $e->getCode() ?: 500;
        http_response_code($code);
        echo createResponses('error', $e->getMessage());
        exit;
    }
}

function deleteBudget($budgetId)
{
    global $connection;

    try {
        $connection->begin_transaction();

        $query = $connection->prepare("DELETE FROM budgets WHERE id = ?");
        $query->bind_param("i", $budgetId);
        $query->execute();

        if($query->affected_rows === 0)
        {
            throw new Exception("Budget not found", 400);
        }

        $connection->commit();
    } catch(Exception $e) {
        $connection->rollback();
        error_log("Failed to delete budget", $e->getMessage());
        throw new Exception("Failed to delete budget");
    }
}

