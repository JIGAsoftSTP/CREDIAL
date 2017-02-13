<?php
/* Carrega a classe DOMPdf */
require_once("dompdf/dompdf_config.inc.php");

/* Cria a instância */
$dompdf = new DOMPDF();

$html = "<!DOCTYPE html>
        <html lang='en'>
       <head>
	<meta charset='UTF-8'>
	<title>Document</title>
</head>
<body style='min-height: 100vh;display: flex;font-family: arial;justify-content: center;align-items: center;background: #F3F7FA;'>
	<div class='content-all' style='max-width: 500px;border-radius: 7px;background: #FFF;padding: 2rem 3rem;color: #505f86;box-sizing: border-box;'>
		<h1 style='font-weight: lighter;color: #333;margin-bottom: 4rem;'><span style='color: #17A599;'>my</span>USTP</h1>
		<p class='welcome' style='line-height: 1.7rem;'>
			Olá, <span style='font-weight: bold; color: #555;'>Name here!</span>
			<br><br>
			Estamos felizes que tenha acessado <span><span style='color: #17A599;'>my</span>USTP</span>. <br> Para ativar a sua conta e desfrutar do que preparamos para si, clique no link abaixo 'Leve-me a minha conta!'.
			<br><br>
			Esperamos que tenha uma agradável experiência!

		</p>
		<a href='#' style='display: inline-block;margin: 2rem 0 4rem;line-height: 3.5rem;padding: 0 2rem;border-radius: 2px;font-size: .97rem;cursor: pointer;background: #17A599;color: #FFF;text-decoration: none'>Leve-me a minha conta!</a>
		<div>
			<small>Com os melhores cumprimentos <br><br> USTP</small>
		</div>
	</div>
</body>
</html>";

/* Carrega seu HTML */
$dompdf->load_html($html);

/* Renderiza */
$dompdf->render();

/* Exibe */
$dompdf->stream(
    "saida.pdf", /* Nome do arquivo de saída */
    array(
        "Attachment" => false /* Para download, altere para true */
    )
);
?>

