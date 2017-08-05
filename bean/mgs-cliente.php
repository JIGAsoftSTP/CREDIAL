
<?php
/**
 * Created by PhpStorm.
 * User: siie
 * Date: 24.06.17
 * Time: 13:43
 */

function getMessagem(){
    global $empresa;
    global $cliente_nome;
    global $cliente_apelido;
    $nome_empresa = explode(" ", $empresa->name);
    return '<div style="min-height: 100vh;display: flex;font-family: arial;justify-content: center;align-items: center;background: #F3F7FA;">
    <div class="content-all" style="max-width: 500px;border-radius: 7px;background: #FFF;padding: 2rem 3rem;color: #505f86;box-sizing: border-box;">
        <h1 style="font-weight: lighter;color: #333;margin-bottom: 4rem;"><span style="color: #17A599;">'.$nome_empresa[0].' </span>'.((count($nome_empresa)>1) ? $nome_empresa[1] : "").'</h1>
        <p class="welcome" style="line-height: 1.7rem;">
            Olá, Senhor(a) <span style="font-weight: bold; color: #555;">'.$cliente_nome." ".$cliente_apelido.'</span>
            <br><br>
            Nos <span><span style="color: #17A599;">'.$nome_empresa[0].' </span>'.((count($nome_empresa)>1) ? $nome_empresa[1] : "").'</span>. <br> Viemos por esse meio informar que hoje e o dia do fecho do seu credito.
            <br><br>
            Por favor dirija a uma das nossas agencia para efetuar o pagamento do mesmo!
        </p>
        <div>
            <small>Caso tenha alguma duvida contate com o email: '.$empresa->mail.'<br/><br/></small>
        </div>
        <div align="right">
            <small >by <a href="https://www.facebook.com/jigasoftstp/">JIGAsoft HG</a></small>
        </div>
    </div>
</div>';
}