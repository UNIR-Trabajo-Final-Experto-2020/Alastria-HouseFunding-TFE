pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";

contract Promotores is Ownable {
    
    //Eventos
    event ProyectoRegistrado(address _cuenta, string _nombre, uint256 _fechaInicioFinanciacion, uint256 _fechaFinFinanciacion,
		uint256 _tokensGoal, uint256 _rentabilidad);
    event ProyectoBorrado(address _cuentaProyecto);
    event ProyectoEnEjecucion(address _cuentaProyecto);
    event ProyectoFinalizado(address _cuentaProyecto);
    event ProjectStatusIncorrecto(address _cuentaProyecto, ProjectStatus _estadoProyecto);

    struct Promotor {
      address _address;
      string _nombre;
      string _cif;
  	  uint256 _totalProyectos;
  	  // pensar formula : balanceOf * 100 - o de su saldo 
  	  //se resta el _tokensGoals por cada proyecto que abre y se suma cuando el proyecto se cierra
  	  uint256 _capacidad;
      bool _existe;
      address[] proyectos;
  	  mapping(address => Proyecto) _proyectos;
    }

    struct Proyecto {
      address _address;
      string _nombre;
      //Se puede utilizar https://github.com/pipermerriam/ethereum-datetime/blob/master/contracts/DateTime.sol
      uint256 _fechaInicioFinanciacion;
      uint256 _fechaFinFinanciacion;
      uint256 _fechaInicioEjecucion;
      uint256 _fechaFinEjecucion;
      uint256 _tokensGoal;
      uint256 _rentabilidad;
      ProjectStatus _estadoProyecto;
      bool _existe;      
      address[] inversores;
	    mapping(address => uint256) _tokensPorInversor;      
    }

    enum ProjectStatus {EN_FINANCIACION, CANCELADO, EN_PROGRESO, FINALIZADO}

    mapping(address => Promotor) promotoresInfo;
    address[] private promotores;

	  address[] private proyectos;

	constructor() public {
		//Constructor...
	}

  function registrarPromotor(address cuentaPromotor, string memory nombre, string memory cif, uint256 capacidad) internal {
        //Registra nuevo promotor
        promotoresInfo[cuentaPromotor] = Promotor(cuentaPromotor, nombre, cif, 0, capacidad, true, new address[](0));
        promotores.push(cuentaPromotor);

  }

	function registrarProyecto(
        address cuentaProyecto, 
        string memory nombre, 
        uint256 fechaInicioFinanciacion, 
        uint256 fechaFinFinanciacion,
        uint256 fechaInicioEjecucion, 
        uint256 fechaFinEjecucion, 
		uint256 tokensGoal, 
        uint256 rentabilidad) public {

            
        require (fechaFinFinanciacion > fechaInicioFinanciacion, "Fecha fin financiacion deber ser mayor a la fecha inicio financiacion");
        require (fechaInicioEjecucion > fechaFinFinanciacion, "Fecha inicio ejecución deber ser mayor a la fecha fin financiacion");            
        require (fechaFinEjecucion > fechaInicioEjecucion, "Fecha fin ejecucion deber ser mayor a la fecha inicio ejecucion");            
        
        //Registra proyecto
        proyectos.push(cuentaProyecto);

        //Se anade proyecto al promotor         
        Promotor storage promotor = promotoresInfo[msg.sender];

        require(tokensGoal < promotor._capacidad, "TokensGoal del proyecto es superior a la capacidad del promotor");

        promotor._proyectos[cuentaProyecto] = Proyecto(cuentaProyecto, 
                                                        nombre, 
                                                        fechaInicioFinanciacion, 
                                                        fechaFinFinanciacion, 
                                                        fechaInicioEjecucion, 
                                                        fechaFinEjecucion, 
                                                        tokensGoal, 
                                                        rentabilidad, 
                                                        ProjectStatus.EN_FINANCIACION, 
                                                        true, 
                                                        new address[](0));

        promotor._totalProyectos++;

        promotor.proyectos.push(cuentaProyecto);

        //Evento proyecto registrado
        emit ProyectoRegistrado(cuentaProyecto, nombre, fechaInicioFinanciacion, fechaFinFinanciacion, tokensGoal, rentabilidad);

    }

   

    function consultarPromotor(address cuentaPromotor)  public view 
        returns (
            string memory nombre, 
            string memory cif, 
            uint256 capacidad,
            address[] memory proyectos
        )   
    {

        return (promotoresInfo[cuentaPromotor]._nombre, 
            promotoresInfo[cuentaPromotor]._cif, 
            promotoresInfo[cuentaPromotor]._capacidad,
            promotoresInfo[cuentaPromotor].proyectos
            );
    }

   function consultarProyecto(address cuentaProyecto)  public view 
  		 returns (string memory nombre, 
            uint256 fechaInicioFinanciacion, 
            uint256 fechaFinFinanciacion,
   			    uint256 fechaInicioEjecucion, 
            uint256 fechaFinEjecucion,
			      uint256 tokensGoal, uint256 rentabilidad, ProjectStatus estadoProyecto
            )   {
        
        address cuentaPromotor = _msgSender();
        Promotor storage promotor = promotoresInfo[cuentaPromotor];
        Proyecto storage proyecto = promotor._proyectos[cuentaProyecto];

        return (proyecto._nombre, proyecto._fechaInicioFinanciacion,proyecto._fechaFinFinanciacion,
          proyecto._fechaInicioEjecucion, proyecto._fechaFinEjecucion,
          proyecto._tokensGoal, proyecto._rentabilidad, proyecto._estadoProyecto);
    }

    function listarProyectos() public view returns (address [] memory _proyectos) {
    	return proyectos;
    }

    function listarPromotoress() public view returns (address [] memory _promotores) {
    	return promotores;
    }

    function listarInversoresProyecto(address cuentaPromotor, address cuentaProyecto) public view returns (address [] memory _inversores) {
    	return promotoresInfo[cuentaPromotor]._proyectos[cuentaProyecto].inversores;
    }    
    
    function listarTokensPorProyectosPorInversor(address cuentaProyecto, address cuentaInversor) public view returns (uint256 tokensInversor) {
    	
    	return promotoresInfo[_msgSender()]._proyectos[cuentaProyecto]._tokensPorInversor[cuentaInversor];
    } 

	function deleteProyecto(address cuentaProyecto) public onlyOwner {
	    delete promotoresInfo[msg.sender]._proyectos[cuentaProyecto];
        
        for (uint i = 0; i< proyectos.length; i++) {
            if (proyectos[i] == cuentaProyecto) {
              delete proyectos[i];
              emit ProyectoBorrado(cuentaProyecto);
            }
        }
       
	}

  function finalizarProyecto(address cuentaPromotor, address cuentaProyecto) internal {
     Promotor storage promotor = promotoresInfo[cuentaPromotor];
     Proyecto storage proyecto = promotor._proyectos[cuentaProyecto];

     if (proyecto._estadoProyecto != ProjectStatus.EN_PROGRESO) {
        emit ProjectStatusIncorrecto(cuentaProyecto, proyecto._estadoProyecto);
     }

     proyecto._estadoProyecto = ProjectStatus.FINALIZADO;
     emit ProyectoFinalizado(cuentaProyecto);
  }



  function esEstadoProyectoValido(address cuentaProyecto, ProjectStatus _status) public view  returns (ProjectStatus _estadoProyecto, bool _esValido) {
    string memory nombre;
    uint256 fechaInicioFinanciacion;
    uint256 fechaFinFinanciacion;
    uint256 fechaInicioEjecucion; 
    uint256 fechaFinEjecucion;
    uint256 tokensGoal;
    uint256 rentabilidad; 
    ProjectStatus estadoProyecto;
    

    (nombre, fechaInicioFinanciacion, fechaFinFinanciacion, fechaInicioEjecucion, 
      fechaFinEjecucion, tokensGoal, rentabilidad, estadoProyecto) = consultarProyecto(cuentaProyecto);

    return (estadoProyecto, (estadoProyecto == _status));
    
  }

    modifier esPromotorValido(address _cuenta){
        if(promotoresInfo[_cuenta]._existe){
            _;
        }
    }    

    modifier esProyectoValido(address _cuenta) {
        for (uint i = 0; i< proyectos.length; i++) {
            if (proyectos[i] == _cuenta) {
              _;
            }
        }
    }

    modifier esProyectoDelPromotor(address cuentaPromotor, address cuentaProyecto) {
      if (promotoresInfo[cuentaPromotor]._proyectos[cuentaProyecto]._existe) {
          _;
      }
    } 

    modifier estaProyectoEnFinanciacion(address cuentaPromotor, address cuentaProyecto) {
      if (promotoresInfo[cuentaPromotor]._proyectos[cuentaProyecto]._estadoProyecto == ProjectStatus.EN_FINANCIACION) {
          _;
      }
    } 

    modifier esInversorEnProyectoDePromotor(address cuentaPromotor, address cuentaProyecto, address cuentaInversor) {
      if (promotoresInfo[cuentaPromotor]._proyectos[cuentaProyecto]._tokensPorInversor[cuentaInversor] > 0) {
          _;
      }
    }

  /**
  * Comprueba que el promotor tiene tokens necesarios para repartir beneficios del proyecto
  * especificado entre los inversores
  */
  function esBalancePromotorValido(address cuentaPromotor, address cuentaProyecto, uint256 balanceOfPromotor) internal view returns (bool) {  
    Promotor storage promotor = promotoresInfo[cuentaPromotor];
    Proyecto storage proyecto = promotor._proyectos[cuentaProyecto];

    uint256 rentabilidadNetaProyecto = (proyecto._rentabilidad * proyecto._tokensGoal) / 100;

    return (balanceOfPromotor >= (proyecto._tokensGoal + rentabilidadNetaProyecto));

  }
}