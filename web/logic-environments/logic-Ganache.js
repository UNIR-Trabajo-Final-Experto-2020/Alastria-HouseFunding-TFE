

//Se recuperan los contratos con su dirección

const ABI_PlataformaPromoInver = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaInversor",
				"type": "address"
			},
			{
				"name": "cuentaProyecto",
				"type": "address"
			}
		],
		"name": "abandonarProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			}
		],
		"name": "cancelarProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaInversor",
				"type": "address"
			}
		],
		"name": "deleteInversor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			}
		],
		"name": "deleteProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaInversor",
				"type": "address"
			},
			{
				"name": "numeroTokens",
				"type": "uint256"
			}
		],
		"name": "emitirTokensParaInversor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaPromotor",
				"type": "address"
			},
			{
				"name": "numeroTokens",
				"type": "uint256"
			}
		],
		"name": "emitirTokensParaPromotor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			}
		],
		"name": "finalizarProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			},
			{
				"name": "numeroTokens",
				"type": "uint256"
			}
		],
		"name": "invertirProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			},
			{
				"name": "fechaInicioEjecucion",
				"type": "uint256"
			},
			{
				"name": "fechaFinEjecucion",
				"type": "uint256"
			}
		],
		"name": "promotorEjecutaProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaInversor",
				"type": "address"
			},
			{
				"name": "nombre",
				"type": "string"
			},
			{
				"name": "cif",
				"type": "string"
			}
		],
		"name": "registrarInversor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaPromotor",
				"type": "address"
			},
			{
				"name": "nombre",
				"type": "string"
			},
			{
				"name": "cif",
				"type": "string"
			},
			{
				"name": "capacidad",
				"type": "uint256"
			}
		],
		"name": "registrarPromotor",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			},
			{
				"name": "nombre",
				"type": "string"
			},
			{
				"name": "fechaInicioFinanciacion",
				"type": "uint256"
			},
			{
				"name": "fechaFinFinanciacion",
				"type": "uint256"
			},
			{
				"name": "tokensGoal",
				"type": "uint256"
			},
			{
				"name": "rentabilidad",
				"type": "uint256"
			}
		],
		"name": "registrarProyecto",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "from",
				"type": "address"
			},
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_numeroTokens",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_comprados",
				"type": "bool"
			}
		],
		"name": "TokensEmitidos",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_cuentaInversor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_cuentaProyecto",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_numeroTokens",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_invertidos",
				"type": "bool"
			}
		],
		"name": "TokensInvertidosProyecto",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "cuentaInversor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "nombre",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "cif",
				"type": "string"
			}
		],
		"name": "InversorRegistrado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "cuentaInversor",
				"type": "address"
			}
		],
		"name": "InversorBorrado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_cuenta",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_nombre",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_cif",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "capacidad",
				"type": "uint256"
			}
		],
		"name": "PromotorRegistrado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_cuenta",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_nombre",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_fechaInicioFinanciacion",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_fechaFinFinanciacion",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_tokensGoal",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_rentabilidad",
				"type": "uint256"
			}
		],
		"name": "ProyectoRegistrado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_cuentaProyecto",
				"type": "address"
			}
		],
		"name": "ProyectoBorrado",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_cuentaProyecto",
				"type": "address"
			}
		],
		"name": "ProyectoEnEjecucion",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cuentaInversor",
				"type": "address"
			}
		],
		"name": "consultarInversor",
		"outputs": [
			{
				"name": "nombre",
				"type": "string"
			},
			{
				"name": "cif",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cuentaPromotor",
				"type": "address"
			}
		],
		"name": "consultarPromotor",
		"outputs": [
			{
				"name": "nombre",
				"type": "string"
			},
			{
				"name": "cif",
				"type": "string"
			},
			{
				"name": "capacidad",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			}
		],
		"name": "consultarProyecto",
		"outputs": [
			{
				"name": "nombre",
				"type": "string"
			},
			{
				"name": "fechaInicioFinanciacion",
				"type": "uint256"
			},
			{
				"name": "fechaFinFinanciacion",
				"type": "uint256"
			},
			{
				"name": "fechaInicioEjecucion",
				"type": "uint256"
			},
			{
				"name": "fechaFinEjecucion",
				"type": "uint256"
			},
			{
				"name": "tokensGoal",
				"type": "uint256"
			},
			{
				"name": "rentabilidad",
				"type": "uint256"
			},
			{
				"name": "estadoProyecto",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "currentOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			}
		],
		"name": "listarInversoresProyecto",
		"outputs": [
			{
				"name": "_inversores",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listarPromotoress",
		"outputs": [
			{
				"name": "_promotores",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "listarProyectos",
		"outputs": [
			{
				"name": "_proyectos",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cuentaInversor",
				"type": "address"
			}
		],
		"name": "listarProyectosInversor",
		"outputs": [
			{
				"name": "proyectos",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "cuentaProyecto",
				"type": "address"
			},
			{
				"name": "cuentaInversor",
				"type": "address"
			}
		],
		"name": "listarTokensPorProyectosPorInversor",
		"outputs": [
			{
				"name": "tokensInversor",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];



	

/* Por unificar durante todo el proyecto, para pruebas se ha realizado:
accounts[0] es la cuenta de la plataforma
accounts[0] es la cuenta del promotor
accounts[1] es la cuenta de un proyecto
accounts[2] es el inversor 1
accounts[3] es el inversor 2
*/

//Se instancia el objeto web3 y se inicializa el array accounts

//En caso de ganache

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

var accounts = [
	web3.eth.accounts[0],
	web3.eth.accounts[1],
	web3.eth.accounts[2],
	web3.eth.accounts[3],
	web3.eth.accounts[4]
];

var contratoPromoInver = "0x2AE4c2160d1CbaFF3F8B07B3A0Ca51243931a4eb";

var instanciaPlataformaPromoInver;

async function start() {
	// Gett all the accounts
	const accounts = await web3.eth.getAccounts();

	console.log("INIT ACCOUNTS\n" + accounts);

	//Cuentas
	cuentaPlataforma = accounts[0];
	//cuentaPromotor = accounts[1];
	//cuentaProyecto = accounts[2];
	//cuentaInversor1 = accounts[3];
	//cuentaInversor2 = accounts[4];

	

	//Recuperamos el contrato
	
	instanciaPlataformaPromoInver = new web3.eth.Contract(ABI_PlataformaPromoInver, contratoPromoInver);

	updateBalance();
}

start();

function updateBalance () {

	instanciaPlataformaPromoInver.methods.totalSupply().call({from: cuentaPlataforma, gas: 30000}, function(error, result){
		if(!error){
			
			document.getElementById('totalSupply').innerHTML = result;
		}
		else
			console.error(error);
	  	});

	instanciaPlataformaPromoInver.methods.balanceOf(cuentaPlataforma).call({from: cuentaPlataforma, gas: 30000}, function(error, result){
		if(!error){
			
			document.getElementById('balanceOf').innerHTML = result;
		}
		else
			console.error(error);
		});	   
}





  // Acciones de la empresa ----------------------------------------------------

  // Simular el login de una empresa
  function registrarPromotor(){

	var cuentaPromotor = document.getElementById("cuentaPromotor").value;
	var nombrePromotor = document.getElementById("nombrePromotor").value;
	var cifPromotor = document.getElementById("cifPromotor").value;
	var capacidadPromotor = document.getElementById("capacidadPromotor").value;
	

    
  	try{
    	
      var exist = plataforma.existeEmpresa.call(address, {from: accounts[0], gas:30000});
      if(exist.valueOf()){
        localStorage.setItem("accountEmpresa", address);
        localStorage.setItem("accountEmpresa", address);
        location.replace("empresa.html");
      }else{
        window.alert("No existe una empresa con esa cuenta en el sistema. Por favor, registrate");
      }
  	}catch(error) {
  		alert("¡Contraseña incorrecta!");
  	}
  }

 
