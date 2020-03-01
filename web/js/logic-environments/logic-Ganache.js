//En caso de ganache

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

var instanciaPlataformaPromoInver;
var accounts, cuentaPlataforma, cuentaPromotor;

async function start() {

	// Gett all the accounts
	accounts = await web3.eth.getAccounts();

	console.log("INIT ACCOUNTS\n" + accounts);

	//Cuentas
	cuentaPlataforma = accounts[0];	
	cuentaPromotor = accounts[1];

	//accounts[1] -> Promotor: 0x5b8BA5c293704BB759A00EBFD2C2b97A8A2DDa40  //EJAL
  //accounts[2] -> Inversor: 0x42A88Fb67F3b8DE7a438AB34d876b29f0d856A54  //EJAL

	//Recuperamos el contrato	
	const contratoPromoInver = "0x2AE4c2160d1CbaFF3F8B07B3A0Ca51243931a4eb";  //Juanjo
	//const contratoPromoInver = "0xE788275f8A83050766741500030a475A0eB94795";    //EJAL


	//const contratoPromoInver = "0x2AE4c2160d1CbaFF3F8B07B3A0Ca51243931a4eb";  //Juanjo?

	instPlatPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);
	
}

start();

async function registrarPromotor(){

	var nombre = document.getElementById("nbPromotor").value;
    var cif = document.getElementById("cifPromotor").value;
    var capacidad = document.getElementById("capacidadPromotor").value;

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

			if (proyestosPromotor.length > 0) {
				
				let proyectosPromo = "";
				for (let proyecto of proyestosPromotor) {

					consultarProyecto(proyecto);										
				}  	

				document.getElementById("msgListProyectosPromotor").innerHTML = proyectosPromo;

			} else {
								
				mostrarMensaje("msgListProyectosPromotor", "INFO", "No existen proyectos para este promotor");				
			}

		} else {
			console.error(error);
			mostrarMensaje("msgConsultaPromotor", "ERROR", error);
		}
	});

}

function consultarProyecto(ctaProyecto) {

	instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaProyecto, gas: 30000}, function(error, result){
		if(!error){
			console.log(result);	
			
			let proyectoResult = "Proyecto: " + result.nombre + ", " + 
			result.fechaInicioFinanciacion + ", " +
			result.fechaFinFinanciacion + ", " +			
			result.tokensGoal + ", " +
			result.rentabilidad + ", " +
			result.estadoProyecto + "</br></br>";
			
			document.getElementById("msgListProyectosPromotor").innerHTML += proyectoResult;

		} else { 
			console.error(err);
			mostrarMensaje("msgListProyectosPromotor", "ERROR", err);			
		}	
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
		.send({from: cuentaPromotor, gas: 300000}, function(error, result){
			if(!error){
				
				console.log("Registro proyecto ok");
			}
			else
				console.error(error);
				mostrarMensaje("msgRegProyecto", "ERROR", error);
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




  


 
