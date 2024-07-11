<?php
// pesapal.php

// Replace these with your PesaPal consumer key and secret
$consumerKey = "8gCRXw2zl80/8kAEHqEBdovTRF7jf2Sm";
$consumerSecret = "1r09BX9nZMkANp5riWNRdMn48WU=";

// PesaPal API endpoint
$pesapal_endpoint = 'https://cybqa.pesapal.com/pesapalv3';

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get payment details from the form
    $payment_method = $_POST['payment-method'];
    $address_line_1 = $_POST['address-line-1'];
    $city = $_POST['city'];
    $state = $_POST['state'];
    $country = $_POST['country'];
    $first_name = $_POST['first-name']; // Get the first name from the form
    $last_name = $_POST['last-name'];   // Get the last name from the form
    $email = $_POST['email'];           // Get the email from the form
    $phone_number = $_POST['phone-number']; // Get the phone number from the form

    // Prepare the request data for PesaPal
    $amount = 1000; // Example amount, you should dynamically set this based on cart total
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

    // Set HTTP Basic Auth headers
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