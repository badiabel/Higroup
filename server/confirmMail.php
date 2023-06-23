<?php
    include('connection.php');
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Headers: access');
    header('Access-Control-Allow-Methods: POST');
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    $data=json_decode(file_get_contents("php://input"));
    $otp=$data->otp;
    $query="select * from user where user_activation_code='$otp'";
    $res=$conn->query($query);
    if($res->num_rows>0){
        $row=$res->fetch_assoc();
        $updateQuery = "UPDATE user SET isVerified = true WHERE user_activation_code = '$otp' AND isVerified = false AND Id_User = '".$row['Id_User']."'";
        if($conn->query($updateQuery)){
            $output =array(
                "status"=>"verified",
           );
           echo json_encode($output);
        } else {
            $output =array(
                "status"=>"already Verified",
            );
            echo json_encode($output);
        }
        
    }else{
        $output =array(
            "status"=>"Code Invalid",
       );
       echo json_encode($output);
    }