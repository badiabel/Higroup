<?php
session_start();
    include('connection.php');
    header('Access-Control-Allow-Origin: http://localhost:5173');
    header('Access-Control-Allow-Headers: access');
    header('Access-Control-Allow-Methods: POST');
    header('Content-Type: application/json; charset=UTF-8');
    header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    $data=json_decode(file_get_contents("php://input"));


     $email=$data->email;
     $psw=$data->psw;
     
     $query = "SELECT * FROM user WHERE Email = '$email' AND Mdp = '$psw'";
      $res=$conn->query($query);
    if ($res && $res->num_rows > 0) {
        http_response_code(200);
        $row = $res->fetch_assoc();
        $output=array(

            "status"=>"valid",
            "prenom"=>$row["Prenom"],
            "nom"=>$row["Nom"],
            "email"=>$row["Email"],
            "tel"=>$row["Tele"],
            "numSF"=>$row["NumSF"],
            "psw"=>$row["Mdp"],
            "dateInsc"=>$row["DateIn"],
            "id_user"=>$row["Id_User"],

        );
      
        echo json_encode($output);
    }else{
        http_response_code(202);
        $output=array(
            "status"=>"invalid"
        );
        echo json_encode($output);
    }
