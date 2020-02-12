pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";

contract Promotores is Ownable {
    
    //Eventos
    event PromotorRegistrado(address _cuenta, string _nombre, string _cif, uint256 capacidad);
    event ProyectoRegistrado(address _cuenta, string _nombre, uint256 _fechaInicioFinanciacion, uint256 _fechaFinFinanciacion,
		uint256 _tokensGoal, uint256 _rentabilidad);
    event ProyectoBorrado(address _cuentaProyecto);
    event ProyectoEnEjecucion(address _cuentaProyecto);
    

    struct Promotor {
      address _address;
      string _nombre;
      string _cif;
  	  uint256 _totalProyectos;
  	  // pensar formula : balanceOf * 100 - o de su saldo 
  	  //se resta el _tokensGoals por cada proyecto que abre y se suma cuando el proyecto se cierra
  	  uint256 _capacidad;
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
      address[] inversores;
	  mapping(address => uint256) _tokensPorInversor;
    }

    enum ProjectStatus { INICIADO, CANCELADO, EN_PROGRESO, FINALIZADO}

    mapping(address => Promotor) promotoresInfo;
    address[] promotores;

	  address[] proyectos;

	constructor() public {
		//Constructor...
	}

	function registrarPromotor(address cuentaPromotor, string memory nombre, string memory cif, uint256 capacidad) public onlyOwner {
        //Registra nuevo promotor
        promotoresInfo[cuentaPromotor] = Promotor(cuentaPromotor, nombre, cif, 0, capacidad);
        promotores.push(cuentaPromotor);

        //TODO Que capacidad le damos?

        //Evento promotor registrado
        emit PromotorRegistrado(cuentaPromotor, nombre, cif, capacidad);

    }

	function registrarProyecto(address cuentaProyecto, string memory nombre, uint256 fechaInicioFinanciacion, uint256 fechaFinFinanciacion,
		uint256 tokensGoal, uint256 rentabilidad) public onlyOwner {
        
        //Registra proyecto
       
        proyectos.push(cuentaProyecto);

        //Se anade proyecto al promotor 
		    Promotor storage promotor = promotoresInfo[_msgSender()];

		    promotor._proyectos[msg.sender] = Proyecto(cuentaProyecto, nombre, fechaInicioFinanciacion, 
          fechaFinFinanciacion, 0, 0, tokensGoal, rentabilidad, ProjectStatus.INICIADO, new address[](0));

        promotor._totalProyectos++;

        //Evento proyecto registrado
        emit ProyectoRegistrado(cuentaProyecto, nombre, fechaInicioFinanciacion, fechaFinFinanciacion, tokensGoal, rentabilidad);

    }

   

   function consultarPromotor(address cuentaPromotor)  public view returns (string memory nombre, string memory cif, uint256 capacidad)   {
        return (promotoresInfo[cuentaPromotor]._nombre, promotoresInfo[cuentaPromotor]._cif, promotoresInfo[cuentaPromotor]._capacidad);
    }

   function consultarProyecto(address cuentaProyecto)  public view 
  		 returns (string memory nombre, uint256 fechaInicioFinanciacion, uint256 fechaFinFinanciacion,
   				uint256 fechaInicioEjecucion, uint256 fechaFinEjecucion,
				uint256 tokensGoal, uint256 rentabilidad, ProjectStatus estadoProyecto)   {
        
        Promotor storage promotor = promotoresInfo[_msgSender()];
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

    function listarInversoresProyecto(address cuentaProyecto) public view returns (address [] memory _inversores) {
    	return promotoresInfo[msg.sender]._proyectos[cuentaProyecto].inversores;
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

	function promotorEjecutaProyecto(address cuentaProyecto, uint256 fechaInicioEjecucion,
      uint256 fechaFinEjecucion) public onlyOwner {
		 Promotor storage promotor = promotoresInfo[_msgSender()];
     Proyecto storage proyecto = promotor._proyectos[cuentaProyecto];
     proyecto._fechaInicioEjecucion = fechaInicioEjecucion;
     proyecto._fechaFinEjecucion = fechaFinEjecucion;
     proyecto._estadoProyecto = ProjectStatus.EN_PROGRESO;
     emit ProyectoEnEjecucion(cuentaProyecto);
	}

}