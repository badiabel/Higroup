<?php
    include('connection.php');
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Headers: access');
    header('Access-Control-Allow-Methods: POST');
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
   
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    use PHPMailer\PHPMailer\Exception;
    
    require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/Exception.php';
    require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/PHPMailer.php';
    require_once __DIR__ . '/vendor/phpmailer/phpmailer/src/SMTP.php';
    
    $data=json_decode(file_get_contents("php://input"));
    $nom=$data->nom;
    $email=$data->email;
    $user_activation_code =$data->otp;
    $query="update user set user_activation_code='$user_activation_code' where email='$email'";
    $result=$conn->query($query);
    if($result){
        $message = "
         <p>Hi ".$nom.",</p>
         <p>Thanks for Registration. You will be logged in only after your email verification.</p>
         <p>Please use this code to activate your account: ".$user_activation_code."
         <p>Best Regards, <br />Upgrade Me</p>
         ";

         $mail = new PHPMailer(true);
    
         $mail->SMTPDebug = 0;
         $mail->isSMTP();
         $mail->Host = 'smtp.gmail.com';
         $mail->SMTPAuth = true;
         $mail->SMTPSecure = 'tls';   
         $mail->Port = 587;
         
         $mail->mailer = "smtp";
         
         $mail->Username = 'upgrademe043@gmail.com';
         $mail->Password = 'yqljlabxfxqvqqad';
         $mail->SetFrom('upgrademe043@gmail.com', 'upgrademe043@gmail.com');
         $mail->addAddress($email, $email);
         $mail->IsHTML(true);
         $mail->Subject = "Email Verification";
         $mail->Body = $message;
         
         if ($mail->send()) {
             $output =array(
                      "status"=>true,
                      "message"=>"Message has been sent.......",
                 );
                 echo json_encode($output);
         } else {
             $output =array(
                 "status"=>false,
                 "message"=>"Message could not be sent.... ",
            );
            echo json_encode($output);
         }

       
    }