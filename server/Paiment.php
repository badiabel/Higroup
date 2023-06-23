<?php
session_start();
// Retrieve session cookie from the request headers or any other method
//$MYSESSIONID = $_COOKIE['MYSESSIONID'];

// Set the session ID to the retrieved session cookie value
//session_id($MYSESSIONID);

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include('connection.php');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Headers: access');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

require_once __DIR__ . '/vendor/autoload.php';
require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/Exception.php';
require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

use Endroid\QrCode\QrCode;


$jsonData = file_get_contents('php://input');
$paymentData = json_decode($jsonData, true);

$response = [
  'participant_id' => $_SESSION['ID'],
  'startTime' => $_SESSION['startCounter'],
  'endTime' => $_SESSION['endCounter'],
  'typeP' => $_SESSION['methodPaiement'],
];


$startCounter = $_SESSION['startCounter'];
$endCounter = $_SESSION['endCounter'];
$participant_id = $_SESSION['ID'];
$email = $paymentData['email'];

$startTime = new DateTime($startCounter);
$endTime = new DateTime($endCounter);

$dateActual = date('Y-m-d H:i:s');

$actuelDate = new DateTime($dateActual);

if ($actuelDate > $startTime && $actuelDate < $endTime) {
  $query = "INSERT INTO tirage (DateD, DateF) VALUES ('$startCounter', '$endCounter')";
  if (mysqli_query($conn, $query)) {
    $last_id = mysqli_insert_id($conn);
    $queryTP = "INSERT INTO participants_tirages (participant_id, tirage_id) VALUES ('$participant_id', '$last_id')";
    if (mysqli_query($conn, $queryTP)) {
      $queryPaiement = "INSERT INTO paiment (Email_Participant) VALUES ('$email')";
      if (mysqli_query($conn, $queryPaiement)) {
        $qrCodeData = 'congrats you won a business class'; // Replace with the data or URL you want to encode
        $qrCode = new QrCode($qrCodeData);

        // Set additional options if needed
        $qrCode->setSize(300);
        $qrCode->setMargin(10);
        $qrCode->setForegroundColor(['r' => 0, 'g' => 0, 'b' => 0]);


        
        // Generate the QR code image
        $qrCodeImage = $qrCode->writeString();

        // Prepare the email content
        $mail = new PHPMailer(true);

        try {
          // SMTP configuration
          $mail->isSMTP();
          $mail->Host = 'smtp.gmail.com'; // Replace with your SMTP host
          $mail->SMTPAuth = true;
          $mail->Username = 'upgrademe043@gmail.com'; // Replace with your email address
          $mail->Password = 'yqljlabxfxqvqqad'; // Replace with your email password
          $mail->SMTPSecure = 'tls';
          $mail->Port = 587; // Replace with your SMTP port

          // Sender and recipient
          $mail->setFrom('upgrademe043@gmail.com', 'upgrademe043@gmail.com'); // Replace with your email and name
          $mail->addAddress($email); // Recipient email

          // Email subject and body
          $mail->isHTML(true);
          $mail->Subject = 'Payment Confirmation';
          $mail->Body = 'Thank you for your payment. Please find the QR code below:<br><br>';
          $mail->Body .= '<img src="data:image/png;base64,' . base64_encode($qrCodeImage) . '" alt="QR Code"><br><br>';
          $mail->Body .= 'For any queries, please contact us.';

          // Send the email
          $mail->send();
          $response = [
            'success' => true,
            'message' => 'Email sent successfully'
          ];
          echo json_encode($response);
        } catch (Exception $e) {
          echo 'Email could not be sent. Error: ', $mail->ErrorInfo;
        }
      }
    }
  }
} else {
  var_dump("NOT PASSED");
}




// if(date() > $_SESSION['startCounter'] && date() < $_SESSION['endCounter']) {
   // insert tirage
   // insert participant_tirage
  // insert pament
// } else {
    //tirarg
// }
?>