pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";
import "./Token.sol";
import "./Promotores.sol";
import "./Inversores.sol";

/**
*	Plataforma de inversiones inmobiliarias distribuidas
*	
*	El token almacena:
*		balanceOf de un inversor es saldo disponible para invertir
*		balanceOf de un proyecto es la cantidad de tokens invertidos. Cuando empieza el proyecto es 0
*		balanceOf de un promotor es la cantidad de tokens disponibles para pagar intereses. 
*                 Comienza en 0, aumenta al tener que pagar intereses
*
*/
contract PlataformaPromoInver is Promotores, Inversores, Token {
    
    //Promotores promotores;
    //Inversores inversores;
    //Token token;

    constructor() public {
    	//promotores = new Promotores();
    	//inversores = new Inversores();
    	//token = new Token();
    }
  
  	/**
  	* 	El promotor finaliza proyecto y devuelve los tokens con los intereses a los inversores
  	**/
    function finalizarProyecto(address cuentaProyecto) public onlyOwner {  
    	//TODO Cambiar estado a ProjectStatus.FINALIZADO
    	//Transferencia de tokens de proyecto a inversores
    	//Transferencia de intereses de tokens de promotor a inversores
    }

    /**
    *	El promotor cancela el proyecto y devuelve los tokens a los inversores
    **/
    function cancelarProyecto(address cuentaProyecto) public onlyOwner { 
		//TODO Cambiar estado a ProjectStatus.FINALIZADO
		//Transferencia de tokens de proyecto a inversores
		//Borramos proyecto o solo se transfieren los tokens y se deja en estado FINALIZADO?
		//Si no se borra ¿Introducimos la fecha de cancelacion en el Proyecto?
    }

    /**
    *	El inversor compra tokens a plataforma (se transfieren simplemente ya que no hay ningun exchange)
    **/
    function comprarTokens(address cuentaInversor, uint256 numeroTokens) public { 
    	//TODO El inversor compra tokens a plataforma
    	//Se transfiere el numero de tokens que desee de la plataforma (owner) al inversor
    }

    /**
    *	El inversor invierte tokens en un proyecto concreto
    **/
    function invertirProyecto(address cuentaInversor, address cuentaProyecto, uint256 numeroTokens) public { 
    	//TODO Se transfieren numeroTokens de cuentaInversor a cuentaProyecto
    }

    /**
    *	El inversor abandona el proyecto antes de ejecutarse y se devuelven los tokens al proyecto
    *	Una vez que esta en ejecucion no se puede abanadonar.
    */
    function abandonarProyecto(address cuentaInversor, address cuentaProyecto) public {
		//TODO Se transfieren numeroTokens de cuentaProyecto a cuentaInversor
    }


}