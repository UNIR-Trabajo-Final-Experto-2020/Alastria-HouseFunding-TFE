//En caso de ganache

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

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
	const contratoPromoInver = "0x2AE4c2160d1CbaFF3F8B07B3A0Ca51243931a4eb";
	instPlatPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);
	
}

start();

async function registrarPromotor(){

	var nombre = document.getElementById("nbPromotor").value;
    var cif = document.getElementById("cifPromotor").value;
    var capacidad = document.getElementById("capacidadPromotor").value;

	cuentaPromotor = accounts[1];

	try {
		await instPlatPromoInver.methods.registrarPromotor(nombre, cif, capacidad)
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
							localStorage.setItem("accountPromotor", cuentaPromotor);
							mostrarMensaje("msgRegPromotor", "SUCCESS","Promotor registrado correctamente");
							console.log("Evento registro promotor ok");
						}
					}
				});  

	} catch (err) {
		console.error("Error: " + err);		
		mostrarMensaje("msgRegPromotor", "ERROR", err);
	}			
}


async function registrarInversor() {

	var nombre = document.getElementById("nbInversor").value;
	var cif = document.getElementById("cifInversor").value;
	
	var cuentaInversor = accounts[2];	
	
	await instPlatPromoInver.methods.registrarInversor(nombre, cif)
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
						mostrarMensaje("msgRegInversor", "SUCCESS", "Inversor registrado correctamente");
						console.log("Evento registro inversor ok");
					}
				}
			});  
}

function consultarPromotor(){

	var ctaPromotor = localStorage.getItem("accountPromotor");

	instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 30000}, function(error, result){
		if(!error){
			console.log(result);	
			document.getElementById("nbPromotorPro").innerHTML = result.nombre;
			document.getElementById("cifPromotorPro").innerHTML = result.cif;
			document.getElementById("capacidadPromotorPro").innerHTML = result.capacidad;
			
			let proyestosPromotor = result.proyectos;

			for (let proyecto of proyestosPromotor) {

				console.log(pathJs);
				var script = document.createElement('script');		
				script.src = parentScript + "/" +pathJs;
				document.body.appendChild(script);		
			}  	

		} else 
			console.error(error);
			mostrarMensaje("msgConsultaPromotor", "ERROR", error);
	 	});

}

function consultarProyecto(ctaProyecto) {

	instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaPromotor, gas: 30000}, function(error, result){
		if(!error){
			console.log(result);	
				

		} else 
			console.error(err);			
	 	});
}

function loginPromotor() {

	muestra_oculta('accesosDiv', 'promotorDiv');
	consultarPromotor();
	
}

async function registrarProyecto() {

	let nombre = document.getElementById("nbProyectoReg").value;
	let tokenGoal = document.getElementById("tokenGoalProyectoReg").value;
	let rentabilidad = document.getElementById("rentabilidadProyectoReg").value;
	let fechaIniFinan = document.getElementById("fechaIniFiancProyectoReg").value;
	let fechaFinFinan = document.getElementById("fechaFinFiancProyectoReg").value;
	let fechaIniEjec = document.getElementById("fechaIniEjeProyectoReg").value;
	let fechaFinEjec = document.getElementById("fechaFinEjeProyectoReg").value;

	var cuentaProyecto = accounts[3];	
	
	await instPlatPromoInver.methods
		.registrarProyecto(cuentaProyecto, nombre, fechaIniFinan, fechaFinFinan, tokenGoal, rentabilidad)
		.send({from: cuentaProyecto, gas: 300000}, function(error, result){
			if(!error){
				
				console.log("Registro proyecto ok");
			}
			else
				console.error(error);
			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.ProyectoRegistrado) {
						mostrarMensaje("msgRegProyecto", "SUCCESS", "Proyecto registrado correctamente");
						console.log("Evento registro proyecto ok");
					}
				}
			});  
}




  


 
