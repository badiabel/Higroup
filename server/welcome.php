<?php
session_start();

include('connection.php');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  exit();
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->nameInput) && isset($data->reservationInput) && isset($data->numeroBilletInput)) {
  $nameInput = $data->nameInput;
  $reservationInput = $data->reservationInput;
  $numeroBilletInput = $data->numeroBilletInput;
  $id_user = $data->id_user;

  if (empty($nameInput)) {
    $output = array(
      "status" => "error",
      "message" => "Please enter your last name."
    );
    echo json_encode($output);
    return;
  }

  if (empty($reservationInput) && empty($numeroBilletInput)) {
    $output = array(
      "status" => "error",
      "message" => "Please enter the Référence de réservation or Numéro de billet."
    );
    echo json_encode($output);
    return;
  }

  // Insert the data into the database
  $query = "INSERT INTO participant (Nom, RefR, NumB, user_id) VALUES ('$nameInput', '$reservationInput', '$numeroBilletInput', '$id_user')";
  $result = $conn->query($query);

  if ($result) {
    // Retrieve the primary key (id_par)
    $id_par = $conn->insert_id;

    $output = array(
      "status" => "success",
      "message" => "Form submitted successfully.",
      "id_par" => $id_par
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
    "message" => "Invalid request."
  );
  echo json_encode($output);
}
?>
