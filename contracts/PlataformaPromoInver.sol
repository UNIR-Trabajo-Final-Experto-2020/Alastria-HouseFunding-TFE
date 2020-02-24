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
    
    //Eventos
    event TokensEmitidos(address _from, address _to, uint256 _numeroTokens, bool _comprados);
	event TokensInvertidosProyecto(address _cuentaInversor, address _cuentaProyecto, uint256 _numeroTokens, bool _invertidos); 
    event PromotorRegistrado(address _cuenta, string _nombre, string _cif, uint256 capacidad);

    //Promotores promotores;
    //Inversores inversores;
    //Token token;

    constructor() public {
    	//promotores = new Promotores();
    	//inversores = new Inversores();
    	//token = new Token();
    }
  

  function registrarPromotor(string memory nombre, string memory cif, uint256 capacidad) public esCapacidadValida(capacidad) {
        //Registra nuevo promotor
        address cuentaPromotor = _msgSender();
        super.registrarPromotor(cuentaPromotor, nombre, cif, capacidad);

        emit PromotorRegistrado(cuentaPromotor, nombre, cif, capacidad);

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
    *   
    *   La plataforma es la que emite los tokens al inversor
    **/
    function emitirTokensParaInversor(address cuentaInversor, uint256 numeroTokens) public esInversorValido(cuentaInversor) { 
        
        //Se transfiere el numero de tokens que desee de la plataforma (owner) al inversor
        //Se comprueba que cuentaInversor esta registrada como inversor 
        emitirTokens(cuentaInversor, numeroTokens);
    }

    /**
    *   
    *   La plataforma es la que emite los tokens al promotor
    **/
    function emitirTokensParaPromotor(address cuentaPromotor, uint256 numeroTokens) public esPromotorValido(cuentaPromotor) { 
        
        //Se transfiere el numero de tokens que desee de la plataforma (owner) al inversor
        //Se comprueba que cuentaPromotor esta registrada como promotor 
        emitirTokens(cuentaPromotor, numeroTokens);
    }

    /**
    *	El inversor compra tokens a plataforma (se transfieren simplemente ya que no hay ningun exchange)
    *   Se puede utilizar tambien para que el promotor compre tokens a la plataforma?
    **/
    function emitirTokens(address cuentaDestino, uint256 numeroTokens) internal onlyOwner { 
    	//Se transfiere el numero de tokens que desee de la plataforma (owner) a cuentaDestino
        address owner = currentOwner();
    	bool comprados = transferFrom(owner, cuentaDestino, numeroTokens);
    	emit TokensEmitidos(owner, cuentaDestino, numeroTokens, comprados);

    }

    /**
    *	El inversor invierte tokens en un proyecto concreto
    **/
    function invertirProyecto(address cuentaPromotor, address cuentaProyecto, address cuentaInversor, uint256 numeroTokens) public esProyectoValido(cuentaProyecto) { 
    	
        //Se transfieren numeroTokens de cuentaInversor a cuentaProyecto
    	
    	//TODO Pendiente comprobar tokensGoal y estadoProyecto
        //TODO Comprobar que cuentaInversor y cuentaProyecto estan registradas en el sistema     

        // Añadimos los inversores que están participando en el proyecto (TODO: verificar primero si el inversor ha invertido previamente)
        Promotor storage promotor = promotoresInfo[cuentaPromotor];
        promotor._proyectos[cuentaProyecto].inversores.push(cuentaInversor);

        // Actualizamos el número de token que un inversor tiene en un proyecto
        promotor._proyectos[cuentaProyecto]._tokensPorInversor[cuentaInversor] += numeroTokens;        

    	//bool invertidos = transferFrom(cuentaInversor, cuentaProyecto, numeroTokens);
    	//emit TokensInvertidosProyecto(cuentaInversor, cuentaProyecto, numeroTokens, invertidos);
    }

    /**
    *	El inversor abandona el proyecto antes de ejecutarse y se devuelven los tokens al proyecto
    *	Una vez que esta en ejecucion no se puede abanadonar.
    */
    function abandonarProyecto(address cuentaInversor, address cuentaProyecto) public {
        address cuentaInversor = currentOwner();
		//TODO Se transfieren numeroTokens de cuentaProyecto a cuentaInversor
    }

    modifier esCapacidadValida(uint256 capacidad) {
        require(capacidad <= totalSupply());
        _;
    }

}