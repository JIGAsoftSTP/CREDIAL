<?php


/**
 * Description of Session
 *
 * @author AhmedJorge
 */
class Session 
{
    const USER="UTILIZADOR";
    const MENU ="MENU";

    static function newSession($name,$object)
    {
        if(session_status() != PHP_SESSION_ACTIVE)
            session_start();
        $_SESSION[$name]=$object;
    }
    
    static function sessionDestroy()
    {
        session_destroy();
    }
    
    static function destruirSessao($nomeSessao)
    {
        unset($_SESSION[$nomeSessao]);
    }

    /**
     * @return User
     */
    static function getUserLogado()
    {
        if(session_status() != PHP_SESSION_ACTIVE)
            session_start([
                'cookie_lifetime' => (86400*5),
            ]);
        if(isset($_SESSION[Session::USER]))
        {
            return $_SESSION[Session::USER];
        }
        else return new User();
    }
    /**
     * Devolve o id de todos os menus que o utilizador tem acesso
     */
    static function getUserMenu()
    {
        if(session_status() != PHP_SESSION_ACTIVE)
            session_start();
        if(isset($_SESSION[Session::MENU]))
           return $_SESSION[Session::MENU];
        else return null;
    }
    public function serialize() {
        $f= 'select func_reg_client()';
    }
    static function  user()
    {
        $user =Session::getUserLogado();
        if($user != null)
           return $user->getNome()." ".$user->getApelido();
        else return null;     
    }
    /**
     * Mostra o nome e apelido do utilizador logado no sistema.
     * Esta função é usada para o mostrar o nome do utilizador na modal de alterar palavra-passe
     */
    static function nomeUtilizador()
    {

         $user =Session::getUserLogado();
        if($user != null)
           return $user->getNome()." ".$user->getApelido();
        else return null;
    }
    /**
     * Remove todas as informações armazenadas na sessão
     */
    static function terminarSessao()
    {
        session_start();
        session_destroy();
    }
    
}
