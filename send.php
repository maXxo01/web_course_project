<?php
$conn = new mysqli("localhost", "root", "", "web_course");

$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];

$sql = "INSERT INTO contacts (name, email, phone, message)
        VALUES ('$name', '$email', '$phone', '$message')";

$conn->query($sql);
$conn->close();

header("Location: contacts.html");
?>
