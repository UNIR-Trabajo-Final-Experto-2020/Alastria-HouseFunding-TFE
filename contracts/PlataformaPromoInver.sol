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
*		balanceOf de un promotor es la cantidad de tokens disponibles para pagar intereses. 
*                 Comienza en 0, aumenta al tener que pagar intereses
*       
*     Un proyecto guarda la cantidad de tokens invertidos, pero la cantidad de token invertidos
*     por los inversores se realiza en la direccion del promotor que se guarda en Proyecto.
*/
contract PlataformaPromoInver is Promotores, Inversores, Token {
    
    //Eventos
    event TokensEmitidos(address _from, address _to, uint256 _numeroTokens, bool _comprados);
    event TokensTransferidos(address _from, address _to, uint256 _numeroTokens, bool _transferidos);
    event TokenPtesCompletarProyecto(uint256 _numeroToken);

	event TokensInvertidosProyecto(address _cuentaInversor, bytes32 _idProyecto, uint256 _numeroTokens, bool _invertidos); 
    event PromotorRegistrado(address _cuenta, string _nombre, string _cif, uint256 capacidad);
    event TokensGoalProyectoNoAlcanzado(bytes32 _idProyecto, uint256 _balanceOfProyecto, uint256 _tokensGoal);
    event BalanceOfPromotorNoSuficiente(address _cuentaPromotor, bytes32 _idProyecto);
    event ProyectoFinalizadoConTransferencias(address _cuentaPromotor, bytes32 _idProyecto);
    event InversorAbandonaProyecto(address indexed cuentaInversor, address indexed cuentaPromotor, bytes32 indexed idProyecto, uint256 numeroTokensProyectoInversor);
    event TokensDevueltosInversor(address _cuentaPromotor, address _cuentaInversor, uint256 _numeroTokens);

    constructor() public {
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
    function finalizarProyecto(bytes32 idProyecto) public 
        esProyectoDelPromotor(_msgSender(), idProyecto) 
        hayInversoresEnProyecto(_msgSender(), idProyecto)
      { 
    
        //Se valida que el promotor tiene tokens suficientes para repartirlo con los inversores
        address cuentaPromotor = _msgSender();
        uint256 balanceOfPromotor = balanceOf(cuentaPromotor);

        if (!esBalancePromotorValido(cuentaPromotor, idProyecto, balanceOfPromotor)) {
            emit BalanceOfPromotorNoSuficiente(cuentaPromotor, idProyecto);
            return;
        }

        //Cambiar estado a ProjectStatus.FINALIZADO
        super.finalizarProyecto(cuentaPromotor, idProyecto);

        //Transferencia de inversion mas ganancias a inversores
        transferToInversores(cuentaPromotor, idProyecto);

        emit ProyectoFinalizadoConTransferencias(cuentaPromotor, idProyecto);
    }

    function transferToInversores(address cuentaPromotor, bytes32 idProyecto) private { 
    
        //Consultar proyecto        
        string memory nombre;
        uint256 fechaInicioFinanciacion;
        uint256 fechaFinFinanciacion;
        uint256 fechaInicioEjecucion; 
        uint256 fechaFinEjecucion;
        uint256 tokensGoal;
        uint256 rentabilidad; 
        ProjectStatus estadoProyecto;

        (nombre, fechaInicioFinanciacion, fechaFinFinanciacion, fechaInicioEjecucion, fechaFinEjecucion, tokensGoal, rentabilidad, estadoProyecto) = consultarProyecto(idProyecto);

        //Transferencia de intereses de tokens de promotor a inversores
        address[] memory cuentaInversores = listarInversoresProyecto(cuentaPromotor, idProyecto);

        for (uint256 i = 0; i < cuentaInversores.length; i++) {

            address cuentaInversor = cuentaInversores[i];
            uint256 tokensInversor = listarTokensPorProyectosPorInversor(idProyecto, cuentaInversor);
            uint256 valorInversionConInteres = tokensInversor + ((tokensInversor * rentabilidad) / 100);

            transfer(cuentaInversores[i], valorInversionConInteres);
        }

    }

    /**
    *	El promotor cancela el proyecto y devuelve los tokens a los inversores
    **/
    function cancelarProyecto(bytes32 idProyecto) public view esProyectoDelPromotor(_msgSender(), idProyecto)  { 
		//TODO Cambiar estado a ProjectStatus.FINALIZADO
		//Transferencia de tokens de proyecto a inversores
		//Borramos proyecto o solo se transfieren los tokens y se deja en estado FINALIZADO
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
    *	El inversor compra tokens a plataforma (se transfieren simplemente ya que no hay ningun exchange)
    *   Se puede utilizar tambien para que el promotor compre tokens a la plataforma?
    **/
    function emitirTokens(address cuentaDestino, uint256 numeroTokens) internal onlyOwner { 
    	//Se transfiere el numero de tokens que desee de la plataforma (owner) a cuentaDestino
        bool comprados = transfer(cuentaDestino, numeroTokens);
    	emit TokensEmitidos(_msgSender(), cuentaDestino, numeroTokens, comprados);
    }

    /**
    *	El inversor invierte tokens en un proyecto concreto
    **/    
    function invertirProyecto(address cuentaPromotor, bytes32 idProyecto, uint256 numeroTokens) public 
        esPromotorValido(cuentaPromotor) 
        esProyectoDelPromotor(cuentaPromotor, idProyecto) 
        estaProyectoEnFinanciacion(cuentaPromotor, idProyecto)
        esInversorValido(_msgSender())         
    { 
    	bool invertidos = false;

        // Obtenemos cuenta inversor
        address cuentaInversor = _msgSender();

        // Obtenemos el proyecto del promotor
        Proyecto storage proyecto =  promotoresInfo[cuentaPromotor]._proyectos[idProyecto];
        uint256 tokensGoalProyecto = proyecto._tokensGoal;
        
        // Validar que el número de token invertidos hasta el momento + el numeroTokens a invertir no supera tokensGoal.                
        uint256 numeroTokenInvertidos = proyecto._tokensInvertidos;

        if (numeroTokenInvertidos + numeroTokens > tokensGoalProyecto) {

            emit TokenPtesCompletarProyecto(tokensGoalProyecto - numeroTokenInvertidos);
        } else {

            // Se transfieren numeroTokens de cuentaInversor a idProyecto: (descomentar transferFrom y emitir evento).
            invertidos = transfer(cuentaPromotor, numeroTokens);               
        }

        if (invertidos) {

            // Añadimos al inversor el proyecto en el que ha invertido, si es la primera vez que inverte                                  
            if(inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[idProyecto]._tokensInvertidos == 0) {               
                inversoresInfo[cuentaInversor]._proyectos.push(idProyecto);

                // Añadimos el inversor a la lista de todos los inversores que han participado en el proyecto. (TODO: verificar primero si el inversor ha invertido previamente)
                proyecto.inversores.push(cuentaInversor);

                // Contabilizamos los tokens que un inversor invierte en cada proyecto
                inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[idProyecto] = TokensInvertidos(cuentaPromotor, numeroTokens);
            } else {
                // Contabilizamos los tokens que un inversor invierte en cada proyecto
                inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[idProyecto]._tokensInvertidos += numeroTokens;
            }
            
            // Actualizamos el número de token que un inversor tiene en un proyecto             
            proyecto._tokensPorInversor[cuentaInversor] += numeroTokens;
            proyecto._tokensInvertidos += numeroTokens;

            emit TokensInvertidosProyecto(cuentaInversor, idProyecto, numeroTokens, true);           
        } 
    	
    }

    /**
    * El inversor abandona el proyecto antes de ejecutarse y se devuelven los tokens al proyecto
    * Una vez que esta en ejecucion no se puede abanadonar.
            - Valida que el inversor y proyecto existen en el sistema (y pertenece al promotor).
            - Valida que el proyecto está en estado EN_FINANCIACION.
            - Actualizar tokens por inversor en este proyecto a 0.
            - NO se ejecuta la transferencia de tokens del proyecto al inversor (los que hubiera invertido).
            - Se emite evento
    */
    
    function abandonarProyecto(address cuentaPromotor, bytes32 idProyecto) public 
        esProyectoDelPromotor(cuentaPromotor, idProyecto)  
        esInversorEnProyectoDePromotor(cuentaPromotor, idProyecto, _msgSender()) {

        address cuentaInversor = _msgSender();
        
        //Controlar el estado del proyecto, debe estar en EN_FINANCIACION
        bool esCorrecto; 
        ProjectStatus estadoProyecto;

        (estadoProyecto, esCorrecto) = esEstadoProyectoValido(idProyecto, ProjectStatus.EN_FINANCIACION);
        
        if (!esCorrecto) {
            emit ProjectStatusIncorrecto(idProyecto, estadoProyecto);
        }

        // Obtenemos el proyecto del promotor
        Proyecto storage proyecto =  promotoresInfo[cuentaPromotor]._proyectos[idProyecto];
        uint256 numeroTokensProyectoInversor = proyecto._tokensPorInversor[cuentaInversor];

        emit InversorAbandonaProyecto(cuentaInversor, cuentaPromotor, idProyecto, numeroTokensProyectoInversor);
    }

   /**
    * El promotor devuelve tokens invertidos al inversor
    **/
    function devolverTokensInversor(address cuentaInversor, 
                                    bytes32 idProyecto,
                                    uint256 numeroTokens) public esPromotorValido(_msgSender()) {  

        address cuentaPromotor = _msgSender();

        //Se actualizan el valor de los tokens invertidos
        Proyecto storage proyecto =  promotoresInfo[cuentaPromotor]._proyectos[idProyecto];
        proyecto._tokensPorInversor[cuentaInversor] -= numeroTokens;
        proyecto._tokensInvertidos -= numeroTokens;
        
        //Se eliminan estructuras del inversor en proyecto
        proyecto._tokensPorInversor[cuentaInversor] = 0;
        deleteProyectoInversor(idProyecto, cuentaInversor);        
        delete inversoresInfo[cuentaInversor]._tokensInvertidoPorInversor[idProyecto]; 

        
        //Transferencia de tokens a inversor
        transfer(cuentaInversor, numeroTokens);

        emit TokensDevueltosInversor(cuentaPromotor, cuentaInversor, numeroTokens);
    }

    modifier esCapacidadValida(uint256 capacidad) {
        require(capacidad <= totalSupply());
        _;
    }
}