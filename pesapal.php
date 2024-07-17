<?php
// pesapal.php

$consumerKey = "8gCRXw2zl80/8kAEHqEBdovTRF7jf2Sm";
$consumerSecret = "1r09BX9nZMkANp5riWNRdMn48WU=";

// PesaPal API endpoint
$pesapal_endpoint = 'https://cybqa.pesapal.com/pesapalv3';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $address_line_1 = $_POST['address-line-1'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $country = $_POST['country'];
    $first_name = $_POST['first-name']; 
        $last_name = $_POST['last-name'];   
    $email = $_POST['email'];           
    $phone_number = $_POST['phone-number']; 

    // Prepare the request data for Pesapal dynamic amount from the Cart
    $amount = 1000; 
    $currency = 'RWF';
    $description = 'Purchase from Meat World';
    $type = $payment_method === 'card'? 'MERCHANT' : 'MOBILE';
    $reference = uniqid(); // Unique order reference

    $data = array(
        'Amount' => $amount,
        'Description' => $description,
        'Type' => $type,
        'Reference' => $reference,
        'FirstName' => $first_name,
        'LastName' => $last_name,
        'Email' => $email,
        'PhoneNumber' => $phone_number
    );

    $json_data = json_encode($data);

    $headers = array(
        'Authorization: Basic '. base64_encode($consumerKey. ':'. $consumerSecret),
        'Content-Type: application/json'
    );

    // Create a new CURL session
    $ch = curl_init($pesapal_endpoint);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

    // Execute the request
    $response = curl_exec($ch);
    curl_close($ch);

    // Redirect to PesaPal
    header('Location: '. $pesapal_endpoint);
    exit();
}
?>