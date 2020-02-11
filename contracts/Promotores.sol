pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";

contract Promotores is Ownable {
    
    //Eventos
    event PromotorRegistrado(address _cuenta, string _nombre, string _cif, uint256 capacidad);
    event ProyectoRegistrado(address _cuenta, string _nombre, uint256 _fechaInicioFinanciacion, uint256 _fechaFinFinanciacion,
		uint256 _tokensGoal, uint256 _rentabilidad);

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

	function registrarPromotor(address _cuenta, string memory _nombre, string memory _cif, uint256 _capacidad) public {
        //Registra nuevo promotor
        promotoresInfo[_cuenta] = Promotor(_cuenta, _nombre, _cif, 0, _capacidad);
        promotores.push(_cuenta);

        //Evento promotor registrado
        emit PromotorRegistrado(_cuenta, _nombre, _cif, _capacidad);

    }

	function registrarProyecto(address _cuenta, string memory _nombre, uint256 _fechaInicioFinanciacion, uint256 _fechaFinFinanciacion,
		uint256 _tokensGoal, uint256 _rentabilidad) public {
        
        //Registra proyecto
       
        proyectos.push(_cuenta);

        //Se anade proyecto al promotor 
        //TODO Sustituir por _msgSender()
		Promotor storage promotor = promotoresInfo[msg.sender];

		promotor._proyectos[msg.sender] = Proyecto(_cuenta, _nombre, _fechaInicioFinanciacion, 
        _fechaFinFinanciacion, 0, 0, _tokensGoal, _rentabilidad, ProjectStatus.INICIADO, new address[](0));

        //Evento proyecto registrado
        emit ProyectoRegistrado(_cuenta, _nombre, _fechaInicioFinanciacion, _fechaFinFinanciacion, _tokensGoal, _rentabilidad);

    }

   function consultarPromotor(address _cuenta)  public view returns (string memory nombre, string memory cif)   {
        //TODO...
        return ("nombre", "cif");
    }

   function consultarProyecto(address _cuenta)  public view 
  		 returns (string memory _nombre, uint256 _fechaInicioFinanciacion, uint256 _fechaFinFinanciacion,
   				uint256 _fechaInicioEjecucion, uint256 _fechaFinEjecucion,
				uint256 _tokensGoal, uint256 _rentabilidad, ProjectStatus _estadoProyecto)   {
        //TODO...
        return ("nombre", 0,0,0,0,0,0,ProjectStatus.INICIADO);
    }

    function listarProyectos() public view returns (address [] memory _proyectos) {
    	return proyectos;
    }

    function listarPromotoress() public view returns (address [] memory _promotores) {
    	return promotores;
    }

    function listarInversoresProyecto(address _addressProyecto) public view returns (address [] memory _inversores) {
    	return promotoresInfo[msg.sender]._proyectos[_addressProyecto].inversores;
    }    
    
    function listarTokensPorProyectosPorInversor(address _addressProyecto, address _addressInversor) public view returns (uint256 tokensInversor) {
    	//TODO...
    	return 0;
    } 

	function deleteProyecto(address _addressProyecto) public {
		//TODO...
	}

	function promotorEjecutaProyecto(address _addressProyecto) public {
		//TODO...Cambiar estado...
	}

}