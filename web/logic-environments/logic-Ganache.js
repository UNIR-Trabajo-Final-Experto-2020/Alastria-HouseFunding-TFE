//En caso de ganache

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

var instanciaPlataformaPromoInver;
var accounts;

async function start() {

	// Gett all the accounts
	accounts = await web3.eth.getAccounts();

	console.log("INIT ACCOUNTS\n" + accounts);

	//Cuentas
	cuentaPlataforma = accounts[0];
	//cuentaPromotor = accounts[1];
	//cuentaProyecto = accounts[2];
	//cuentaInversor1 = accounts[3];
	//cuentaInversor2 = accounts[4];

	

	//Recuperamos el contrato	
	const contratoPromoInver = "0xcA28Ce977c7A5c5F217Ff5592656C2464C646Ae9";
	instanciaPlataformaPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);

	//updateBalance();
}

start();

async function registrarPromotor(){

	var nombre = document.getElementById("nbPromotor").value;
    var cif = document.getElementById("cifPromotor").value;
    var capacidad = document.getElementById("capacidadPromotor").value;

	var cuentaPromotor = accounts[1];	

	await instanciaPlataformaPromoInver.methods.registrarPromotor(nombre, cif, capacidad)
		.send({from: cuentaPromotor, gas: 300000}, function(error, result){
			if(!error){
				
				console.log("Registro promotor ok");
			}
			else
				console.error(error);
			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.PromotorRegistrado) {
						mostrarSuccess("msgRegPromotor", "Promotor registrado correctamente");
						console.log("Evento registro promotor ok");
					}
				}
			});  
}


async function registrarInversor() {

	var nombre = document.getElementById("nbInversor").value;
	var cif = document.getElementById("cifInversor").value;
	
	var cuentaInversor = accounts[2];	
	
	await instanciaPlataformaPromoInver.methods.registrarInversor(nombre, cif)
		.send({from: cuentaInversor, gas: 300000}, function(error, result){
			if(!error){
				
				console.log("Registro inversor ok");
			}
			else
				console.error(error);
			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.InversorRegistrado) {
						mostrarSuccess("msgRegInversor", "Inversor registrado correctamente");
						console.log("Evento registro inversor ok");
					}
				}
			});  
}


  


 
