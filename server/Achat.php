<?php
session_start();


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include('connection.php');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header("Access-Control-Allow-Credentials: true");

$dateD = $_SESSION['startCounter'];
$dateF = $_SESSION['endCounter'];


$data = json_decode(file_get_contents("php://input"));

if (!isset($data->ticketType) || !isset($data->ticketCount)) {
    $response = [
        'status' => 'error',
        'message' => 'Missing ticket type or ticket count.'
    ];
    echo json_encode($response);
    exit;
}

$typeB = $data->ticketType;
$nbrB = $data->ticketCount;
$total = $data->ticketCount * getPrice($typeB);

// Check if the connection is valid
if ($conn) {
    // Prepare the SQL insert statement
    $stmt = $conn->prepare("INSERT INTO paiment (TypeB, NbrB, Total, TypeP) VALUES (?, ?, ?, '')");
    
    // Check if the prepare() function succeeded
    if ($stmt) {
        $stmt->bind_param("sii", $typeB, $nbrB, $total);

        // Execute the insert statement
        if ($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'Data inserted successfully.'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to insert data: ' . $stmt->error
            ];
        }

        $stmt->close();
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Failed to prepare statement: ' . $conn->error
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'Failed to establish database connection.'
    ];
}

echo json_encode($response);

// Helper function to get the price based on ticket type
function getPrice($ticketType)
{
    if ($ticketType === "solo") {
        return 100;
    } else if ($ticketType === "couple") {
        return 200;
    } else if ($ticketType === "Famille") {
        return 300;
    }
    return 0;
}

$conn->close();
?>
