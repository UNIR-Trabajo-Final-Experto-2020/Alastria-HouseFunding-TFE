



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
	instanciaPlataformaPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);

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


function registrarProyecto(){

	var nombre = document.getElementById("nbPromotor").value;
    var cif = document.getElementById("cifPromotor").value;
    var capacidad = document.getElementById("capacidadPromotor").value;

	var cuentaPromotor = accounts[1];	

	instanciaPlataformaPromoInver.methods.registrarPromotor(cuentaPromotor, nombre, cif, capacidad).call({from: cuentaPromotor, gas: 30000}, function(error, result){
		if(!error){
			
			document.getElementById('totalSupply').innerHTML = result;
		}
		else
			console.error(error);
	  	});	


}


  // Acciones de la empresa ----------------------------------------------------

  
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



 
