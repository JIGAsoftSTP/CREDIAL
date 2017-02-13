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
    private  $headers;
    private  $assunto;
    private  $texto;
    private  $propetario = "JIGAsoft STP <jigasoft.stp2015@gmail.com>";
    private  $destino;
    private  $cc = array();
    private  $reenvio = FALSE;
    private  $anexo = array();
    
    function __construct() {
        
    }
    function getHeaders() {
        return $this->headers;
    }

    function getAssunto() {
        return $this->assunto;
    }

    function getTexto() {
        return $this->texto;
    }

    function getPropetario() {
        return $this->propetario;
    }

    function Headers($headers) {
        $this->headers = $headers;
        return $this;
    }

    function Assunto($assunto) {
        $this->assunto = $assunto;
        return $this;
    }

    function Texto($texto) {
        $this->texto = $texto;
        return $this;
    }

    function Propetario($propetario) {
        $this->propetario = $propetario;
        return $this;
    }
    function getDestino() {
        return $this->destino;
    }

    function Destino($destino) {
        $this->destino = $destino;
        return $this;
    }
    function getCc() {
        return $this->cc;
    }

    function Cc($cc) {
        $this->cc = $cc;
        return $this;
    }
    function getReenvio() {
        return $this->reenvio;
    }

    function Reenvio($reenvio) {
        $this->reenvio = $reenvio;
        return $this;
    }
    
    function getAnexo() {
        return $this->anexo;
    }

    function Anexo($anexo) {
        $this->anexo = $anexo;
        return $this;
    }

    function sendEmail()
    {        
        header('Content-type: text/html; charset=UTF-8');

        $this->headers = "MIME-Version: 1.1\r\n";
        $this->headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $this->headers .= "From: ".$this->propetario."\r\n";
        $this->headers .= "X-Sender:  ".$this->propetario."\r\n"; //email do servidor //que enviou
        if(count($this->cc) > 0){
            for ($f = 0; $f < count($this->cc); $f++)
                $this->headers .= "Bcc: ".$this->cc[$f]."\r\n";
        }
        $this->headers .= "X-Mailer: PHP". phpversion() ."\r\n";
        $this->headers .= "X-Priority: 3\r\n";

        if(count($this->anexo) > 0){

        }

        $envio = mail($this->destino, $this->assunto, $this->texto,$this->headers);

        if ($envio) 
            {return true;}
        else
            {return false;}
    }
}
