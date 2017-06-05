<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Description of SendEmail
 *
 * @author AhmedJorge
 */
class SendEmail {
    public $mail;

    function __construct() {
        $this->mail = new PHPMailer();
        $this->mail->CharSet = "UTF-8";
        $this->mail->isSMTP();                                      // Set mailer to use SMTP
        $this->mail->Host = 'smtp.gmail.com';                       // Specify main and backup SMTP servers
        $this->mail->SMTPAuth = true;                               // Enable SMTP authentication
        $this->mail->Username = 'jigasoft.stp2015@gmail.com';               // SMTP username
        $this->mail->Password = 'OurAccountEnterprise2015';                        // SMTP password
        $this->mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
        $this->mail->Port = 587;
    }

    /**
     * @return PHPMailer
     */
    public function getMail(): PHPMailer
    {
        return $this->mail;
    }
}
