pragma solidity ^0.5.0;

import "./OpenZeppelin/Ownable.sol";

contract Inversores is Ownable {

	//Eventos
	event InversorRegistrado(address cuentaInversor, string nombre, string cif);
    event InversorBorrado(address cuentaInversor);

    struct Inversor {
      address _address;
      string _nombre;
      string _cif;
      bool _existe;
  	  address[] _proyectos;
    }

    mapping(address => Inversor) inversoresInfo;
    address[] inversores;

    //DUDA
    //tokensPorInversor: uint32
	
	constructor() public {
		//Constructor...
	}


	function registrarInversor(address cuentaInversor, string memory nombre, string memory cif) public onlyOwner {

        //Registra nuevo inversor
        inversoresInfo[cuentaInversor] = Inversor(cuentaInversor, nombre, cif, true, new address[](0));
        inversores.push(cuentaInversor);

        //Evento inversor registrado
        emit InversorRegistrado(cuentaInversor, nombre, cif);

    }

   function consultarInversor(address cuentaInversor)  public view returns (string memory nombre, string memory cif)   {
        return (inversoresInfo[cuentaInversor]._nombre, inversoresInfo[cuentaInversor]._cif);
    }

    function listarProyectosInversor(address cuentaInversor) public view returns (address [] memory proyectos) {
    	return inversoresInfo[cuentaInversor]._proyectos;
    }   

	function deleteInversor(address cuentaInversor) public onlyOwner {
	    delete inversoresInfo[cuentaInversor];
        
        for (uint i = 0; i< inversores.length; i++) {
            if (inversores[i] == cuentaInversor) {
              delete inversores[i];
              emit InversorBorrado(cuentaInversor);
            }
        }
       
	}

    modifier esInversorValido(address _cuenta){
        if(inversoresInfo[_cuenta]._existe){
            _;
        }
    }

}