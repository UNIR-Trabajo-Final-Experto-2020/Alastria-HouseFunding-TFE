//En caso de Alastria Local

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22001"));

var instanciaPlataformaPromoInver;
var accounts, cuentaPlataforma, cuentaPromotor;

async function start() {

	// Gett all the accounts
	accounts = await web3.eth.getAccounts();
	
	await web3.eth.personal.unlockAccount(accounts[0], "Passw0rd");

	console.log("INIT ACCOUNTS\n" + accounts);

	//Cuentas
	cuentaPlataforma = accounts[0];	

	//Indicar aqui la direccion del contrato tras su despliegue.
	const contratoPromoInver = "0x2AE4c2160d1CbaFF3F8B07B3A0Ca51243931a4eb";    

	instPlatPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);
	
}

async function dameNuevaCuenta(){
	// En la testnet local de Alastria
	pss = "test";
    var address = await web3.eth.personal.newAccount(pss);
    await desbloqueaCuenta(address);
	return address;
}

async function desbloqueaCuenta(cuenta) {
	pss = "test";
	await web3.eth.personal.unlockAccount(cuenta, pss, 0);
}

async function bloqueaCuenta(cuenta) {
	pss = "test";
	await web3.eth.personal.lockAccount(cuenta, pss);
}


start();


// PANTALLA REGISTRAR NUEVO PROMOTOR

async function registrarPromotor(){

	var nombre = document.getElementById("nbPromotor").value;
    var cif = document.getElementById("cifPromotor").value;
    var capacidad = document.getElementById("capacidadPromotor").value;

	let ctaPromotorNueva = await dameNuevaCuenta();

	try {
		await instPlatPromoInver.methods.registrarPromotor(nombre, cif, capacidad)
			.send({from: ctaPromotorNueva, gas: 300000}, function(error, result){
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
							mostrarMensajeGenerico("SUCCESS","Promotor registrado correctamente, su Id: " + ctaPromotorNueva);
							cleanRegistrarPromotor();
							console.log("Evento registro promotor ok");
						}
					}
				}); 

		await bloqueaCuenta(ctaPromotorNueva);

	} catch (err) {
		console.error("Error: " + err);		
		mostrarMensajeGenerico("ERROR", err);
	}			
}

async function registrarProyecto() {

	let nombre = document.getElementById("nbProyectoReg").value;
	let tokenGoal = document.getElementById("tokenGoalProyectoReg").value;
	let rentabilidad = document.getElementById("rentabilidadProyectoReg").value;
	let fechaIniFinan = document.getElementById("fechaIniFinancProyectoReg").value;
	let fechaFinFinan = document.getElementById("fechaFinFinancProyectoReg").value;
	//let fechaIniEjec = document.getElementById("fechaIniEjeProyectoReg").value;
	//let fechaFinEjec = document.getElementById("fechaFinEjeProyectoReg").value;

	let ctaPrmotor = localStorage.getItem("ctaPromotorLogado");
	let cuentaProyecto = await dameNuevaCuenta();
		
	await instPlatPromoInver.methods
		.registrarProyecto(cuentaProyecto, nombre, fechaIniFinan, fechaFinFinan, tokenGoal, rentabilidad)
		.send({from: ctaPrmotor, gas: 300000}, function(error, result){
				if(!error){
					
					console.log("Registro proyecto ok");
				} else {
					console.error(error);
					mostrarMensajeGenerico("ERROR", error);					
				}	
			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.ProyectoRegistrado) {
						mostrarMensajeGenerico("SUCCESS", "Proyecto registrado correctamente");	
						cleanRegistrarProyecto();					
						console.log("Evento registro proyecto ok");
					}
				}
			});  
}


// fin PANTALLA REGISTRAR NUEVO PROMOTOR


// PANTALLA REGISTRAR NUEVO INVERSOR
async function registrarInversor() {

	var nombre = document.getElementById("nbInversor").value;
	var cif = document.getElementById("cifInversor").value;
	
	let cuentaInversorNueva = await dameNuevaCuenta();
		
	await instPlatPromoInver.methods.registrarInversor(nombre, cif)
		.send({from: cuentaInversorNueva, gas: 300000}, function(error, result){
			if(!error){
				
				console.log("Registro inversor ok");
			}else{
				console.error(error);
				mostrarMensajeGenerico("ERROR", error);
			}				

			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.InversorRegistrado) {
						cleanRegistrarInversor();
						mostrarMensajeGenerico("SUCCESS", "Inversor registrado correctamente, su Id:" + cuentaInversorNueva);
						console.log("Evento registro inversor ok");
					}
				}
			});  
	await bloqueaCuenta(cuentaInversorNueva);
}
// fin PANTALLA REGISTRAR NUEVO INVERSOR



// PANTALLA PROMOTOR
async function loginPromotor() {

	let ctaPromotor = document.getElementById("loginPromotorT").value;
	await desbloqueaCuenta(ctaPromotor);

	localStorage.setItem("ctaPromotorLogado", ctaPromotor);

	cargarPantallaPromotor();

	muestra_oculta('accesosDiv', 'promotorDiv');		
}

function cargarPantallaPromotor(){

	document.getElementById("msgListProyectosPromotor").innerHTML = "";

	let ctaPromotor = localStorage.getItem("ctaPromotorLogado");

	// Consultamos los datos del promotor
	instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 30000}, function(error, resultConsultarPromo){
		if(!error){
			console.log(resultConsultarPromo);	
			document.getElementById("nbPromotorPro").innerHTML = resultConsultarPromo.nombre;
			document.getElementById("cifPromotorPro").innerHTML = resultConsultarPromo.cif;
			document.getElementById("capacidadPromotorPro").innerHTML = resultConsultarPromo.capacidad;
					
			if (resultConsultarPromo.listadoProyectos.length > 0) {
				
				// Consultamos todos los proyectos de un prmotor
				for(let ctaProyecto of resultConsultarPromo.listadoProyectos){

					// consultamos proyecto
					instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaPromotor, gas: 30000}, function(error, result){
						if(!error){
							console.log(result);	
							
							plantillaProyectosDelPromotor(result.nombre, 
								result.tokensGoal,
								result.rentabilidad,
								result.estadoProyecto,
								result.fechaInicioFinanciacion,
								result.fechaFinFinanciacion);
				
						} else { 
							console.error(err);
							mostrarMensajeGenerico("ERROR", error);		
						}	
					});


				}
			}

		} else {
			console.error(error);
			mostrarMensajeGenerico("ERROR", error);			
		}
	});

}

// FIN PANTALLA PROMOTOR



// PANTALLA INVERSOR
function loginInversor() {

	let ctaInversor = document.getElementById("logInversor").value;
	desbloqueaCuenta(ctaInversor);

	localStorage.setItem("ctaInversorLogado", ctaInversor);

	cargarPantallaInversor();	

	muestra_oculta('accesosDiv', 'inversorDiv');		
}

function cargarPantallaInversor(){

	let ctaInversor = localStorage.getItem("ctaInversorLogado");

	// Consultamos dastos del inversor y ctas proyectos que ha invertido
	instPlatPromoInver.methods.consultarInversor(ctaInversor).call( {from: ctaInversor, gas: 30000}, function(error, result){
		if(!error){
			console.log(result);	
			document.getElementById("nbInversorInv").innerHTML = result.nombre;
			document.getElementById("cifInversorInv").innerHTML = result.cif;

			// Consultamos datos proyectos
			if (result.proyectos.length > 0) {
				for(let ctaProyecto of result.proyectos){

					// consultamos proyecto
					instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaProyecto, gas: 30000}, function(error, result){
						if(!error){
							console.log(result);	
							
							let proyectoResult = "Proyecto: " + result.nombre + ", " + 
							result.fechaInicioFinanciacion + ", " +
							result.fechaFinFinanciacion + ", " +			
							result.tokensGoal + ", " +
							result.rentabilidad + ", " +
							result.estadoProyecto + "</br></br>";
														

							instPlatPromoInver.methods.listarTokensPorProyectosPorInversor(ctaProyecto, ctaInversor).call( {from: cuentaPromotor, gas: 30000}, function(error, result){
								if(!error){
									console.log(result);	
									
									proyectoResult = "TokenPorProyecto: " + result + "<\br>";  
									document.getElementById("msgConsultaInversor").innerHTML += proyectoResult;
								} else { 
									console.error(err);
									mostrarMensajeGenerico("ERROR", error);												
								}	
							});							

				
						} else { 
							console.error(err);
							mostrarMensajeGenerico("ERROR", error);										
						}	
					});


				}

			}
				
		} else {
			console.error(error);			
			mostrarMensajeGenerico("ERROR", error);			
		}
	});


}	
// fin PANTALLA INVERSOR




// PANTALLA INVERTIR EN PROYECTOS
// Carga todos los proyectos existentes en la plataforma
function cargarPantallaInvertirEnProyectos(){

	// Consultar addres de promotores
	instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 30000}, function(error, resultListarPromo){
		if(!error){
			
			console.log(resultListarPromo);	
			let promotores = resultListarPromo;			

			for (let ctaPromotor of promotores) {
			
				// Consultar datos de cada promotor
				instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 30000}, function(error, resultConsultarPromo){
					if(!error){
						console.log(resultConsultarPromo);	

						//let datosPromotor = {};
						//datosPromotor.nombre = resultConsultarPromo.nombre;
						plantillaPromotoresParaInvertir(ctaPromotor, resultConsultarPromo.nombre);
						let plantillaProyectos = "";	
						for (let ctaProyecto of resultConsultarPromo.listadoProyectos) {

							

							// Consultar datos de cada proyecto
							instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaPromotor, gas: 30000}, function(error, result){
								if(!error){
									console.log(result);	
									
									addProyecto(ctaPromotor, ctaProyecto,result.nombre);									
						
								} else { 
									console.error(err);
									mostrarMensaje("msgListProyectosPromotor", "ERROR", err);			
								}	
							});
						}						
			
					} else {
						console.error(error);
						mostrarMensaje("msgConsultaPromotor", "ERROR", error);
					}
				});			
			}


		} else { 
			console.error(err);
			mostrarMensaje("msgListProyectosPromotor", "ERROR", err);			
		}	
	});

}

// BORRAR
function tablaProyecto(tablaPromotor, nbPromotor, tokenGoal, rentabilidad, fechaIniFinan, fechaFinFinan){
	
	tablaPromotor+="<tr><td>Proyecto</td></tr>";
	tablaPromotor+="<tr><td>Nombre:"+ nbPromotor +"</td></tr>";
	tablaPromotor+="<tr><td>TokenGoal:"+ tokenGoal +"</td></tr>";
	tablaPromotor+="<tr><td>Rentabilidad:"+ rentabilidad +"</td></tr>";
	tablaPromotor+="<tr><td>Fecha Inicio Financiación:"+ fechaIniFinan +"</td></tr>";
	tablaPromotor+="<tr><td>Fecha Fin Financiación:"+ fechaFinFinan +"</td></tr>";
	tablaPromotor+="<tr><td><button type='button' onclick='invertir()'>Invertir</button><input type='text' id='invertir"+ nbPromotor +"'/></td></tr>";
    tablaPromotor+="</table>";

	return tablaPromotor;

}

function tablaPromotor(nbProyecto, cif){

    let tabla = "<table border='1'>";    
	tabla+="<tr><td>Promotor</td></tr>";
	tabla+="<tr><td>"+ nbProyecto +"</td></tr>";

	return tabla;

}
// finPANTALLA INVERTIR EN PROYECTOS






  


 
