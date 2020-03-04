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
    event TokensTransferidos(address _from, address _to, uint256 _numeroTokens, bool _transferidos);
    event TokensNoAprobados(address _from, address _to, uint256 _numeroTokens, bool aprobados);
    event TokenPtesCompletarProyecto(uint256 _numeroToken);

	event TokensInvertidosProyecto(address _cuentaInversor, address _cuentaProyecto, uint256 _numeroTokens, bool _invertidos); 
    event PromotorRegistrado(address _cuenta, string _nombre, string _cif, uint256 capacidad);
    event TokensGoalProyectoNoAlcanzado(address _cuentaProyecto, uint256 _balanceOfProyecto, uint256 _tokensGoal);
    

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
    
        require(!promotoresInfo[cuentaPromotor]._existe, "Promotor no debe de existir");

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
    function transferirTokensParaInversor(address cuentaInversor, uint256 numeroTokens) public esInversorValido(cuentaInversor) { 
        
        //Se transfiere el numero de tokens que desee de la plataforma (owner) al inversor
        //Se comprueba que cuentaInversor esta registrada como inversor 
        emitirTokens(cuentaInversor, numeroTokens);
    }

    /**
    *   
    *   La plataforma es la que emite los tokens al promotor
    **/
    function transferirTokensParaPromotor(address cuentaPromotor, uint256 numeroTokens) public esPromotorValido(cuentaPromotor) { 
        
        //Se transfiere el numero de tokens que desee de la plataforma (owner) al inversor
        //Se comprueba que cuentaPromotor esta registrada como promotor 
        emitirTokens(cuentaPromotor, numeroTokens);
    }

    /**
    *   Funcion invocada por el promotor para transferir los tokens del proyecto a su cuenta:
    *   El proyecto debe estar en estado EN_PROGRESO
    **/
    function transferirTokensProyectoAPromotor(address cuentaProyecto) public esProyectoDelPromotor(_msgSender(), cuentaProyecto) {
        
        address cuentaPromotor = _msgSender();

        //Controlar el estado del proyecto, debe estar en progreso
        bool esCorrecto; 
        ProjectStatus estadoProyecto;

        (estadoProyecto, esCorrecto) = esEstadoProyectoValido(cuentaProyecto, ProjectStatus.EN_PROGRESO);
        
        if (!esCorrecto) {
            emit ProjectStatusIncorrecto(cuentaProyecto, estadoProyecto);
        }
        

        uint256 numeroTokensProyecto = balanceOf(cuentaProyecto);
        
        approveAndTransferFrom(cuentaProyecto, cuentaPromotor, numeroTokensProyecto);

    }

    /**
    *  Promotor ejecuta proyecto
    * Cambia el estado a EN_PROGRESO
    * 
    */
    function promotorEjecutaProyecto(address cuentaProyecto, uint256 fechaInicioEjecucion,
      uint256 fechaFinEjecucion) public esProyectoDelPromotor(_msgSender(), cuentaProyecto){

        require (fechaFinEjecucion > fechaInicioEjecucion, "La fecha de fin de ejecucion deber ser mayor a la fecha de inicio");
        string memory nombre;
        uint256 fechaInicioFinanciacion;
        uint256 fechaFinFinanciacion;
        uint256 fechaInicioEjecucion; 
        uint256 fechaFinEjecucion;
        uint256 tokensGoal;
        uint256 rentabilidad; 
        ProjectStatus estadoProyecto;

        (nombre, fechaInicioFinanciacion, fechaFinFinanciacion, fechaInicioEjecucion, fechaFinEjecucion, tokensGoal, rentabilidad, estadoProyecto) = consultarProyecto(cuentaProyecto);

        uint256 balanceOfProyecto = balanceOf(cuentaProyecto);
        
        if (balanceOf(cuentaProyecto) < tokensGoal) {
            emit TokensGoalProyectoNoAlcanzado(cuentaProyecto, balanceOfProyecto, tokensGoal);
        } 
        super.promotorEjecutaProyecto(_msgSender(), cuentaProyecto, fechaInicioEjecucion, fechaFinEjecucion);
    }


    /**
    *	El inversor compra tokens a plataforma (se transfieren simplemente ya que no hay ningun exchange)
    *   Se puede utilizar tambien para que el promotor compre tokens a la plataforma?
    **/
    function emitirTokens(address cuentaDestino, uint256 numeroTokens) internal onlyOwner { 
    	//Se transfiere el numero de tokens que desee de la plataforma (owner) a cuentaDestino
        //address owner = currentOwner();
    	//bool comprados = transferFrom(owner, cuentaDestino, numeroTokens);
        bool comprados = transfer(cuentaDestino, numeroTokens);
    	emit TokensEmitidos(_msgSender(), cuentaDestino, numeroTokens, comprados);

    }

    /**
    *	El inversor invierte tokens en un proyecto concreto
    **/    
    function invertirProyecto(address cuentaPromotor, address cuentaProyecto, uint256 numeroTokens) public 
        esPromotorValido(cuentaPromotor) 
        esProyectoDelPromotor(cuentaPromotor, cuentaProyecto) 
        estaProyectoEnFinanciacion(cuentaPromotor, cuentaProyecto)
        esInversorValido(_msgSender())         
    { 
    	bool invertidos = false;

        // Obtenemos cuenta inversor
        address cuentaInversor = _msgSender();

        // Obtenemos el proyecto del promotor
        Proyecto storage proyecto =  promotoresInfo[cuentaPromotor]._proyectos[cuentaProyecto];
        uint256 tokensGoalProyecto = proyecto._tokensGoal;
        
        // Validar que el número de token invertidos hasta el momento + el numeroTokens a invertir no supera tokensGoal.                
        uint256 numeroTokenInvertidos = balanceOf(cuentaProyecto); 
        if (numeroTokenInvertidos + numeroTokens > tokensGoalProyecto) {

            emit TokenPtesCompletarProyecto(tokensGoalProyecto - numeroTokenInvertidos);
        } else {

            // Se transfieren numeroTokens de cuentaInversor a cuentaProyecto: (descomentar transferFrom y emitir evento).
            //bool invertidos = transferFrom(cuentaInversor, cuentaProyecto, numeroTokens);
            invertidos = transfer(cuentaProyecto, numeroTokens);               
        }

        if (invertidos) {

            // Añadimos al inversor el proyecto en el que ha invertido, si es la primera vez que inverte                                  
            if(inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[cuentaProyecto]._tokensInvertidos == 0) {               
                inversoresInfo[cuentaInversor]._proyectos.push(cuentaProyecto);

                // Contabilizamos los tokens que un inversor invierte en cada proyecto
                inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[cuentaProyecto] = TokensInvertidos(cuentaPromotor, numeroTokens);
            } else {
                // Contabilizamos los tokens que un inversor invierte en cada proyecto
                inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[cuentaProyecto]._tokensInvertidos += numeroTokens;
            }
            
            // Actualizamos el número de token que un inversor tiene en un proyecto             
            proyecto._tokensPorInversor[cuentaInversor] += numeroTokens;

            // Añadimos el inversor a la lista de todos los inversores que han participado en el proyecto. (TODO: verificar primero si el inversor ha invertido previamente)
            proyecto.inversores.push(cuentaInversor);
            
            // En caso de llegar al tokensGoal, se debe cambiar el estado del proyecto a EN_PROGRESO
            if (numeroTokenInvertidos == tokensGoalProyecto) {
                proyecto._estadoProyecto = ProjectStatus.EN_PROGRESO;                
            }

            emit TokensInvertidosProyecto(cuentaInversor, cuentaProyecto, numeroTokens, true);
        } 
    	
    }

    /**
    *	El inversor abandona el proyecto antes de ejecutarse y se devuelven los tokens al proyecto
    *	Una vez que esta en ejecucion no se puede abanadonar.
            - Valida que el inversor y proyecto existen en el sistema (y pertenece al promotor).
            - Valida que el proyecto está en estado EN_FINANCIACION.
            - Actualizar tokens por inversor en este proyecto a 0.
            - Se ejecuta la transferencia de tokens del proyecto al inversor (los que hubiera invertido).
    */
    
    function abandonarProyecto(address cuentaPromotor, address cuentaProyecto) public 
        esProyectoDelPromotor(cuentaPromotor, cuentaProyecto)  
        esInversorEnProyectoDePromotor(cuentaPromotor, cuentaProyecto, _msgSender()) {

        address cuentaInversor = _msgSender();
        
        //Controlar el estado del proyecto, debe estar en EN_FINANCIACION
        bool esCorrecto; 
        ProjectStatus estadoProyecto;

        (estadoProyecto, esCorrecto) = esEstadoProyectoValido(cuentaProyecto, ProjectStatus.EN_FINANCIACION);
        
        if (!esCorrecto) {
            emit ProjectStatusIncorrecto(cuentaProyecto, estadoProyecto);
        }

        // Obtenemos el proyecto del promotor
        Proyecto storage proyecto =  promotoresInfo[cuentaPromotor]._proyectos[cuentaProyecto];
        uint256 numeroTokensProyectoInversor = proyecto._tokensPorInversor[cuentaInversor];

        approveAndTransferFrom(cuentaProyecto, cuentaInversor, numeroTokensProyectoInversor);
        

        proyecto._tokensPorInversor[cuentaInversor] = 0;
        //deleteInversor(cuentaInversor);
    }


    function approveAndTransferFrom(address from, address to, uint256 numeroTokens) private {
        
        bool approved = approve(from, to, numeroTokens);

        if (approved) {

            bool transferidos = transferFrom(from, to, numeroTokens);
        
            emit TokensTransferidos(from, to, numeroTokens, transferidos);

        } else {
            emit TokensNoAprobados(from, to, numeroTokens, approved);
        }
    } 

    modifier esCapacidadValida(uint256 capacidad) {
        require(capacidad <= totalSupply());
        _;
    }

}