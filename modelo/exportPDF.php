<?php
/**
 * Created by PhpStorm.
 * User: ahmedjorge
 * Date: 12/28/16
 * Time: 11:53 AM
 */
require_once "../resources/fw/dompdf/dompdf/dompdf_config.inc.php";
$dompdf = new DOMPDF();

$document = dataExport();
$dompdf->load_html($document);

//$dompdf->set_paper("A4","landscape");

$dompdf->render();

$docName = "pdf.pdf";
$output = $dompdf->output();
$url = "../" . $docName;
file_put_contents($url, $output);
die(json_encode(array("url" => $url)));


function dataExport(){
    return '<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Document</title>
           <!--link rel="stylesheet" href="../resources/css/geralStyle.css"-->
           <link rel="stylesheet" href="../resources/css/table.css">
           <style>.sh-rcrs{display: none}</style>
        </head>
        <body>
            <div class="geral-content">
                <h1></h1>
                <header>
                    <nav class="logo-nav"><span class="logo">LOGO HERE!</span></nav>
                    <nav class="enterprise-det">
                        <p class="name">Enterprise Name Here</p>
                        <p class="email">Email: <span></span></p>
                        <p class="telfax">Tel / Fax: <span></span></p>
                        <p class="cp">Caixa Postal: <span></span></p>
                    </nav>
                </header>
                <h1 class="title-report">Title Here!</h1>
                <div class="content-table">
                    <div class="x-table">
                        <table id="table-client" class="selectable" cellpadding="0" cellspacing="0">
                            <thead>
                                <tr>                    
                                    <th grow="1">Ações</th>
                                    <th grow="1.5">NIF</th>
                                    <th grow="5">Nome</th>
                                    <th grow="1">Telemóvel</th>
                                    <th grow="1">Créditos</th>
                                </tr>
                            </thead>
                            <tbody id="">
                                <tr><td>Value here!</td><td>Value here!</td><td>Value here!</td><td>Value here!</td><td>Value here!</td></tr>
        
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
        <script type="text/javascript" src="../resources/js/jQuery.js"></script>
        <script type="text/javascript" src="../resources/js/table.js"></script>
        <style>
            .geral-content{
                padding: 2rem;
            }
            .geral-content nav{
                margin-bottom: 2rem;
            }
            .enterprise-det p{
                line-height: 1.7rem;
            }
            .geral-content .title-report{
                text-align: center;
                margin-bottom: 1rem;
                font-size: 1.5rem;
            }
        </style>
        </html>';
}