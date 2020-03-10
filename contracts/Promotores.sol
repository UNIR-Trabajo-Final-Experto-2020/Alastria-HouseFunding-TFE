pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";

contract Promotores is Ownable {
    
    //Eventos
    event ProyectoRegistrado(address _cuentaPromotor, bytes32 _idProyecto, string _nombre, uint256 _fechaInicioFinanciacion, uint256 _fechaFinFinanciacion,
		uint256 _tokensGoal, uint256 _rentabilidad);
    event ProyectoBorrado(bytes32 _idProyecto);
    event ProyectoEnEjecucion(bytes32 _idProyecto);
    event ProyectoFinalizado(bytes32 _idProyecto);
    event ProyectoEjecutado(bytes32 _idProyecto);
    event ProjectStatusIncorrecto(bytes32 _idProyecto, ProjectStatus _estadoProyecto);
    event ProyectoGoalNoAlcanzado(address _cuentaPromotor, bytes32 _idProyecto);

    struct Promotor {
      address _address;
      string _nombre;
      string _cif;
  	  uint256 _totalProyectos;
  	  uint256 _capacidad;
      bool _existe;
      bytes32[] proyectos;
  	  mapping(bytes32 => Proyecto) _proyectos;
    }

    struct Proyecto {
      address _cuentaPromotor;
      bytes32 _idProyecto;
      string _nombre;
      uint256 _fechaInicioFinanciacion;
      uint256 _fechaFinFinanciacion;
      uint256 _fechaInicioEjecucion;
      uint256 _fechaFinEjecucion;
      uint256 _tokensGoal;
      uint256 _rentabilidad;
      ProjectStatus _estadoProyecto;
      uint256 _tokensInvertidos;
      bool _existe;      
      address[] inversores;
	    mapping(address => uint256) _tokensPorInversor;      
    }

    enum ProjectStatus {EN_FINANCIACION, CANCELADO, EN_PROGRESO, FINALIZADO}

    mapping(address => Promotor) promotoresInfo;
    address[] private promotores;

	  bytes32[] private proyectos;

  	constructor() public {
  	}

  /**
  *   Registra nuevo promotor
  */
  function registrarPromotor(address cuentaPromotor, string memory nombre, string memory cif, uint256 capacidad) internal {
        
        promotoresInfo[cuentaPromotor] = Promotor(cuentaPromotor, nombre, cif, 0, capacidad, true, new bytes32[](0));
        promotores.push(cuentaPromotor);

  }

	function registrarProyecto(
        bytes32 idProyecto,
        string memory nombre, 
        uint256 fechaInicioFinanciacion, 
        uint256 fechaFinFinanciacion,
        uint256 fechaInicioEjecucion, 
        uint256 fechaFinEjecucion, 
		    uint256 tokensGoal, 
        uint256 rentabilidad) public esPromotorValido (_msgSender()) {

            
        require (fechaFinFinanciacion > fechaInicioFinanciacion, "Fecha fin financiacion deber ser mayor a la fecha inicio financiacion");
        require (fechaInicioEjecucion > fechaFinFinanciacion, "Fecha inicio ejecución deber ser mayor a la fecha fin financiacion");            
        require (fechaFinEjecucion > fechaInicioEjecucion, "Fecha fin ejecucion deber ser mayor a la fecha inicio ejecucion");            
        
        address cuentaPromotor = _msgSender();

        //Registra proyecto
        proyectos.push(idProyecto);

        //Se anade proyecto al promotor         
        Promotor storage promotor = promotoresInfo[msg.sender];

        require(tokensGoal < promotor._capacidad, "TokensGoal del proyecto es superior a la capacidad del promotor");

        promotor._proyectos[idProyecto] = Proyecto(
                                                        cuentaPromotor,
                                                        idProyecto, 
                                                        nombre, 
                                                        fechaInicioFinanciacion, 
                                                        fechaFinFinanciacion, 
                                                        fechaInicioEjecucion, 
                                                        fechaFinEjecucion, 
                                                        tokensGoal, 
                                                        rentabilidad, 
                                                        ProjectStatus.EN_FINANCIACION, 
                                                        0,
                                                        true, 
                                                        new address[](0));

        promotor._totalProyectos++;

        promotor.proyectos.push(idProyecto);

        //Evento proyecto registrado
        emit ProyectoRegistrado(cuentaPromotor, idProyecto, nombre, fechaInicioFinanciacion, fechaFinFinanciacion, tokensGoal, rentabilidad);

    }

   

    function consultarPromotor(address cuentaPromotor)  public view 
        returns (
            string memory nombre, 
            string memory cif, 
            uint256 capacidad,
            bytes32[] memory listadoProyectos
        )   
    {

        return (promotoresInfo[cuentaPromotor]._nombre, 
            promotoresInfo[cuentaPromotor]._cif, 
            promotoresInfo[cuentaPromotor]._capacidad,
            promotoresInfo[cuentaPromotor].proyectos
            );
    }

   function consultarProyecto(bytes32 idProyecto)  public view 
  		 returns ( 
            string memory nombre,
            uint256 fechaInicioFinanciacion, 
            uint256 fechaFinFinanciacion,
   			    uint256 fechaInicioEjecucion, 
            uint256 fechaFinEjecucion,
			      uint256 tokensGoal, 
            uint256 rentabilidad, 
            ProjectStatus estadoProyecto
            )   {
        
        address cuentaPromotor = _msgSender();
        Promotor storage promotor = promotoresInfo[cuentaPromotor];
        Proyecto storage proyecto = promotor._proyectos[idProyecto];

        return (proyecto._nombre, proyecto._fechaInicioFinanciacion,proyecto._fechaFinFinanciacion,
          proyecto._fechaInicioEjecucion, proyecto._fechaFinEjecucion,
          proyecto._tokensGoal, proyecto._rentabilidad, proyecto._estadoProyecto);
    }


   function consultarTokensInvertidosEnProyecto(bytes32 idProyecto)  public view 
       returns ( 
            uint256 tokensInvertidos
            )   {
        
        address cuentaPromotor = _msgSender();
        Promotor storage promotor = promotoresInfo[cuentaPromotor];
        Proyecto storage proyecto = promotor._proyectos[idProyecto];

        return (proyecto._tokensInvertidos);
    }


    function listarProyectos() public view returns (bytes32[] memory _proyectos) {
    	return proyectos;
    }

    function listarPromotoress() public view returns (address[] memory _promotores) {
    	return promotores;
    }

    function listarInversoresProyecto(address cuentaPromotor, bytes32 idProyecto) public view returns (address[] memory _inversores) {
    	return promotoresInfo[cuentaPromotor]._proyectos[idProyecto].inversores;
    }    
    
    function listarTokensPorProyectosPorInversor(bytes32 idProyecto, address cuentaInversor) public view returns (uint256 tokensInversor) {
    	
    	return promotoresInfo[_msgSender()]._proyectos[idProyecto]._tokensPorInversor[cuentaInversor];
    } 

	function deleteProyecto(bytes32 idProyecto) public onlyOwner {
	    delete promotoresInfo[msg.sender]._proyectos[idProyecto];
        
        for (uint i = 0; i< proyectos.length; i++) {
            if (proyectos[i] == idProyecto) {
              delete proyectos[i];
              emit ProyectoBorrado(idProyecto);
            }
        }
       
	}

  function finalizarProyecto(address cuentaPromotor, bytes32 idProyecto) internal {
     Promotor storage promotor = promotoresInfo[cuentaPromotor];
     Proyecto storage proyecto = promotor._proyectos[idProyecto];

     if (proyecto._estadoProyecto != ProjectStatus.EN_PROGRESO) {
        emit ProjectStatusIncorrecto(idProyecto, proyecto._estadoProyecto);
     }

     proyecto._estadoProyecto = ProjectStatus.FINALIZADO;
     emit ProyectoFinalizado(idProyecto);
  }



  function esEstadoProyectoValido(bytes32 idProyecto, ProjectStatus _status) public view  returns (ProjectStatus _estadoProyecto, bool _esValido) {
    string memory nombre;
    uint256 fechaInicioFinanciacion;
    uint256 fechaFinFinanciacion;
    uint256 fechaInicioEjecucion; 
    uint256 fechaFinEjecucion;
    uint256 tokensGoal;
    uint256 rentabilidad; 
    ProjectStatus estadoProyecto;

    (nombre, fechaInicioFinanciacion, fechaFinFinanciacion, fechaInicioEjecucion, 
      fechaFinEjecucion, tokensGoal, rentabilidad, estadoProyecto) = consultarProyecto(idProyecto);

    return (estadoProyecto, (estadoProyecto == _status));
    
  }

    // Para ejecutar el proyecto solo se tiene que cumplir que el tokenGoal del proyecto sea igual a los
    // token que tiene ese proyecto en el balance. 
    function ejecutarProyecto(bytes32 idProyecto) public 
                 esProyectoDelPromotor(_msgSender(), idProyecto) {
        
        address cuentaPromotor = _msgSender();

        Promotor storage promotor = promotoresInfo[cuentaPromotor];
        Proyecto storage proyecto = promotor._proyectos[idProyecto];

        if (proyecto._tokensInvertidos < proyecto._tokensGoal) {
            emit ProyectoGoalNoAlcanzado(cuentaPromotor, idProyecto);
            return;
        } 

        proyecto._estadoProyecto = ProjectStatus.EN_PROGRESO;          

        emit ProyectoEjecutado(idProyecto);
        
    }


    /**
  * Comprueba que el promotor tiene tokens necesarios para repartir beneficios del proyecto
  * especificado entre los inversores
  */
  function esBalancePromotorValido(address cuentaPromotor, bytes32 idProyecto, uint256 balanceOfPromotor) internal view returns (bool) {  
    Promotor storage promotor = promotoresInfo[cuentaPromotor];
    Proyecto storage proyecto = promotor._proyectos[idProyecto];

    uint256 rentabilidadNetaProyecto = (proyecto._rentabilidad * proyecto._tokensGoal) / 100;

    return (balanceOfPromotor >= (proyecto._tokensGoal + rentabilidadNetaProyecto));

  }

    modifier esPromotorValido(address _cuenta){
        if(promotoresInfo[_cuenta]._existe){
            _;
        }
    }    


    modifier esProyectoDelPromotor(address cuentaPromotor, bytes32 idProyecto) {
      if (promotoresInfo[cuentaPromotor]._proyectos[idProyecto]._existe) {
          _;
      }
    } 

    modifier hayInversoresEnProyecto(address cuentaPromotor, bytes32 idProyecto) {
      if (promotoresInfo[cuentaPromotor]._proyectos[idProyecto].inversores.length > 0) {
          _;
      }
    } 

    modifier estaProyectoEnFinanciacion(address cuentaPromotor, bytes32 idProyecto) {
      if (promotoresInfo[cuentaPromotor]._proyectos[idProyecto]._estadoProyecto == ProjectStatus.EN_FINANCIACION) {
          _;
      }
    } 

    modifier esInversorEnProyectoDePromotor(address cuentaPromotor, bytes32 idProyecto, address cuentaInversor) {
      if (promotoresInfo[cuentaPromotor]._proyectos[idProyecto]._tokensPorInversor[cuentaInversor] > 0) {
          _;
      }
    }


}