<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  header('Access-Control-Allow-Origin: http://localhost:5173');
  header('Access-Control-Allow-Headers: access');
  header('Access-Control-Allow-Methods: POST');
  header('Content-Type: application/json; charset=UTF-8');
  header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  header("Access-Control-Allow-Credentials: true");
  exit;
}

include('connection.php');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
header("Access-Control-Allow-Credentials: true");

// Get the data from the request body
$data = json_decode(file_get_contents("php://input"));

$dateD = $data->dateD;
$dateF = $data->dateF;
$Id_participant = $data->id_par;

$_SESSION['startCounter'] = $dateD;
$_SESSION['endCounter'] = $dateF;

// Insert the data into the tirage table
$query = "INSERT INTO tirage (DateD, DateF, Id_participant) VALUES ('$dateD', '$dateF', '$Id_participant')";
if ($conn->query($query) === true) {
  // Get the last inserted ID in the tirage table
  $tirageId = $conn->insert_id;

  // Insert the data into the participants_tirages table
  $query = "INSERT INTO participants_tirages (participant_id, tirage_id) VALUES ('$Id_participant', '$tirageId')";
  if ($conn->query($query) === true) {
    $output = array(
      "status" => "success",
      "message" => "Form submitted successfully. Counter started",
      "RefT" => $tirageId
    );
    echo json_encode($output);
  } else {
    $output = array(
      "status" => "error",
      "message" => "Failed to submit the form."
    );
    echo json_encode($output);
  }
} else {
  $output = array(
    "status" => "error",
    "message" => "Failed to submit the form."
  );
  echo json_encode($output);
}


// $query = "INSERT INTO tirage (RefT, DateD, DateF) VALUES ('$refT', '$dateD', '$dateF')";
// $result = $conn->query($query);

// if ($result) {
//   // Database insertion successful
//   $output = array(
//     "status" => "success",
//     "message" => "Data inserted successfully."
//   );
//   echo json_encode($output);
// } else {
//   // Database insertion failed
//   $output = array(
//     "status" => "error",
//     "message" => "Failed to insert data into the database."
//   );
//   echo json_encode($output);
// }
?>
