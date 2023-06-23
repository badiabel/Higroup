<?php

$conn = new mysqli('localhost', 'root', '', 'upgrade_me');

if ($conn->connect_errno) {
    die("Connection error: " . $conn->connect_error);
}