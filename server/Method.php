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



if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$_SESSION['methodPaiement'] = $_POST['paymentType'];

// // Prepare and execute the SQL statement to insert data
// $stmt = $conn->prepare("INSERT INTO paiment (TypeP) VALUES (?)");
// $stmt->bind_param("s", $typeP);
// $stmt->execute();

// // Check if the insertion was successful
// if ($stmt->affected_rows > 0) {
//     $response = [
//         'status' => 'success',
//         'message' => 'Payment data inserted successfully.'
//     ];
// } else {
//     $response = [
//         'status' => 'error',
//         'message' => 'Error inserting payment data.'
//     ];
// }

// // Close the statement and connection
// $stmt->close();
// $conn->close();

// echo json_encode($response);
?>
