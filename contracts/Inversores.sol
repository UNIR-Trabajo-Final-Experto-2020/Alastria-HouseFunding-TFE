pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";

contract Inversores is Ownable {

	//Eventos
	event InversorRegistrado(address cuentaInversor, string nombre, string cif);
  event InversorBorrado(address cuentaInversor);
  event ProyectoInversorBorrado(bytes32 idProyecto, address cuentaInversor);

    struct Inversor {
      address _address;
      string _nombre;
      string _cif;
      bool _existe;
  	  bytes32[] _proyectos;
      mapping(bytes32 => TokensInvertidos) _tokensInvertidoPorInversor;                  
    }

    struct TokensInvertidos {
      address _ctaPromotor;      
      uint256 _tokensInvertidos;
    }

    mapping(address => Inversor) inversoresInfo;
    address[] inversores;
    
    mapping(address => TokensInvertidos) tokensInvertidoPorInversor;    

	
	constructor() public {
	}


	function registrarInversor(string memory nombre, string memory cif) public throwIfIsEmptyString(nombre, cif) {

        //Registra nuevo inversor
        address cuentaInversor =  _msgSender();
        inversoresInfo[cuentaInversor] = Inversor(cuentaInversor, nombre, cif, true, new bytes32[](0));
        inversores.push(cuentaInversor);

        //Evento inversor registrado
        emit InversorRegistrado(cuentaInversor, nombre, cif);

    }

   function consultarInversor(address cuentaInversor)  public view returns (string memory nombre, string memory cif, bytes32[] memory proyectos)   {
        return (inversoresInfo[cuentaInversor]._nombre, inversoresInfo[cuentaInversor]._cif, inversoresInfo[cuentaInversor]._proyectos);
    }

    
    function listarProyectosInversor(address cuentaInversor) public view returns (bytes32[] memory proyectos) {
    	return inversoresInfo[cuentaInversor]._proyectos;
    }  

    function tokensInvertidosEnProyecto(bytes32 idProyecto) public view 
        returns (address ctaPromotor,           
            uint256 tokensInversor) {
                
        TokensInvertidos storage tokensInvertidos = inversoresInfo[_msgSender()]._tokensInvertidoPorInversor[idProyecto];                 

        return (tokensInvertidos._ctaPromotor, tokensInvertidos._tokensInvertidos);
    }


	function deleteInversor(address cuentaInversor) internal  {
	    delete inversoresInfo[cuentaInversor];
        
        for (uint i = 0; i< inversores.length; i++) {
            if (inversores[i] == cuentaInversor) {
              delete inversores[i];
              emit InversorBorrado(cuentaInversor);
              return;
            }
        }
       
	}

	function deleteProyectoInversor(bytes32 idProyecto, address cuentaInversor) internal  {

        bytes32[] memory proyectos = inversoresInfo[cuentaInversor]._proyectos;
	             
        for (uint i = 0; i< proyectos.length; i++) {
            if (proyectos[i] == idProyecto) {  
              delete inversoresInfo[cuentaInversor]._proyectos[i];         
              emit ProyectoInversorBorrado(idProyecto, cuentaInversor);
              return;
            }
        }
       
	}    

    modifier esInversorValido(address _cuenta){
        if(inversoresInfo[_cuenta]._existe){
            _;
        }
    }

    modifier throwIfIsEmptyString(string memory _nombre, string memory _cif) {
       require(bytes(_nombre).length > 0 && bytes(_cif).length > 0);
       _;
    }


}