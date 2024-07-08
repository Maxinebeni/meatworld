// pesapal.js
function createPesapalOrder() {
    const consumerKey = "8gCRXw2zl80/8kAEHqEBdovTRF7jf2Sm";
    const consumerSecret = "1r09BX9nZMkANp5riWNRdMn48WU="; 

    // PesaPal API URL for the sandbox environment
    const pesapalAPIUrl = 'https://demo.pesapal.com/api/PostPesapalDirectOrderV4'; // Use the live URL for production

    // Collect payment details
    const amount = document.getElementById('total').innerText.replace('RWF ', '').replace(/,/g, '');
    const description = 'Order description'; // Replace with your order description
    const type = 'MERCHANT'; // Payment type
    const reference = '123456789'; // Unique reference ID for the order
    const firstName = document.querySelector('input[name="card-name"]').value.split(' ')[0];
    const lastName = document.querySelector('input[name="card-name"]').value.split(' ')[1];
    const email = 'customer@example.com'; // Replace with the customer's email address
    const phoneNumber = document.querySelector('input[name="mobile-money-number"]').value;

    const params = {
        oauth_consumer_key: consumerKey,
        oauth_nonce: Math.floor(Math.random() * 1e12).toString(),
        oauth_signature_method: 'HMAC-SHA1',
        oauth_timestamp: Math.floor(new Date().getTime() / 1000).toString(),
        oauth_version: '1.0',
        amount,
        description,
        type,
        reference,
        firstName,
        lastName,
        email,
        phoneNumber
    };

    const message = {
        action: pesapalAPIUrl,
        method: 'GET',
        parameters: Object.entries(params)
    };

    const accessor = {
        consumerSecret
    };

    OAuth.setTimestampAndNonce(message);
    OAuth.SignatureMethod.sign(message, accessor);

    const authorizationHeader = OAuth.getAuthorizationHeader('', message.parameters);
    const formData = new URLSearchParams(params).toString();

    fetch(pesapalAPIUrl, {
        method: 'POST',
        headers: {
            'Authorization': authorizationHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
    .then(response => response.text())
    .then(responseText => {
        // Redirect to PesaPal for payment
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, "text/xml");
        const redirectUrl = xmlDoc.getElementsByTagName("redirect_url")[0].textContent;
        window.location.href = redirectUrl;
    })
    .catch(error => console.error('Error creating PesaPal order:', error));
}

document.getElementById('place-order').addEventListener('click', createPesapalOrder);
