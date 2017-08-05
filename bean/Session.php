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
        self::start_session();
        $_SESSION[$name]=$object;
    }
    
    static function sessionDestroy()
    {
        self::start_session();
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
        self::start_session();
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
        self::start_session();
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
        self::start_session();
        session_destroy();
    }

    public static function start_session()
    {
        if (session_status() != PHP_SESSION_ACTIVE) {
            session_cache_limiter('private, must-revalidate');
            session_cache_expire(-1);
            session_start();
        }
    }
    
}
