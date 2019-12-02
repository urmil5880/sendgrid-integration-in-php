<?php

$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$phonenumber = $_POST["phonenumber"];
$email = $_POST["email"];
$message = $_POST["message"];

# Mail Content
$content = "First Name: $firstname\n <br>";
$content .= "Last Name: $lastname\n <br>";
$content .= "Phone Number: $phonenumber\n <br>";
$content .= "Email: $email\n <br>";
$content .= "Message: $message\n <br>";

#sendgrid library
    require __DIR__ . '/sendgrid-php/vendor/autoload.php';

    $email = new \SendGrid\Mail\Mail();
    $email->setFrom("contactus@gmail.com", "example name");
    $email->setSubject("text name : Contact Us Inquiry");
    $email->addTo("urmilpatel.it@gmail.com", "");
    $email->addContent("text/plain", $content);
    $email->addContent(
        "text/html", $content
    );
    #api key use
    $sendgrid = new \SendGrid('SENDGRID_API_KEY');
    try {
        $response = $sendgrid->send($email);
        print $response->statusCode() . "\n";
        print_r($response->headers());
        print $response->body() . "\n";
    } catch (Exception $e) {
        echo 'Caught exception: '. $e->getMessage() ."\n";
    }

      	if($response){			
			$msg = "Thank You! Your message has been sent.";
			$status = true;
		}
		else{
			$status = false; 
			$msg = "Oops! Something went wrong, we couldn't send your message.";
		}

			############################# send email end ############################
		$response_array = array( 'status' => $status, 'message' => $msg);
		echo json_encode($response_array);
			
		die();
?>
