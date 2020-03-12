//En caso de ganache

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:22001"));

var instanciaPlataformaPromoInver;
var accounts, cuentaPlataforma, cuentaPromotor;
let contadorAccountsUtilizadas = 1;
var pps ='test';
let usuarios = new Array();

async function start() {

	// Gett all the accounts
	accounts = await web3.eth.getAccounts();
	
	await web3.eth.personal.unlockAccount(accounts[0], "Passw0rd");
	
	console.log("INIT ACCOUNTS\n" + accounts);

	//Cuentas
	cuentaPlataforma = accounts[0];	
	
	//Recuperamos el contrato	
	//const contratoPromoInver = "0x26e6AaEF5A797efAbECE53aAD27F4BAF8EE3C241";  //Juanjo
	const contratoPromoInver = "0x2Fc21bE2e095c3F13aD28964AE4ee5BeBDB5FD62";    //EJAL	

	instPlatPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);	
}


async function dameNuevaCuenta(){
	// En la testnet local de Alastria
    var address = await web3.eth.personal.newAccount(pss);
    await desbloqueaCuenta(address);
	return address;
}

async function desbloqueaCuenta(cuenta) {
	await web3.eth.personal.unlockAccount(cuenta, pss, 0);
}

async function bloqueaCuenta(cuenta) {
	await web3.eth.personal.lockAccount(cuenta, pss);
}

start();


// PANTALLA REGISTRAR NUEVO PROMOTOR

async function registrarPromotor(){

	var nombre = document.getElementById("nbPromotor").value;
    var cif = document.getElementById("cifPromotor").value;
    var capacidad = document.getElementById("capacidadPromotor").value;

	let ctaPromotorNueva = dameNuevaCuenta();

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
							usuarios.push(ctaPromotorNueva+document.getElementById("passPromotor").value);	
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
	let fechaIniFinan = formeteaFechaANumero(document.getElementById("fechaIniFinancProyectoReg").value);
	let fechaFinFinan = formeteaFechaANumero(document.getElementById("fechaFinFinancProyectoReg").value);
	let fechaIniEjec = formeteaFechaANumero(document.getElementById("fechaIniEjeProyectoReg").value);
	let fechaFinEjec = formeteaFechaANumero(document.getElementById("fechaFinEjeProyectoReg").value);

	let ctaPrmotor = localStorage.getItem("ctaPromotorLogado");
	
	//let idProyecto = web3.utils.keccak256(ctaPrmotor);
	let idProyecto = web3.utils.sha3(web3.utils.randomHex(32));
	await desbloqueaCuenta(ctaPrmotor);

	await instPlatPromoInver.methods
		.registrarProyecto(idProyecto, nombre, fechaIniFinan, fechaFinFinan, fechaIniEjec, fechaFinEjec, tokenGoal, rentabilidad)
		.send({from: ctaPrmotor, gas: 500000}, function(error, result){
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
	
	let cuentaInversorNueva = dameNuevaCuenta();
		
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
						usuarios.push(cuentaInversorNueva+document.getElementById("passInversor").value);
						cleanRegistrarInversor();
						mostrarMensajeGenerico("SUCCESS", "Inversor registrado correctamente, su Id:" + cuentaInversorNueva);
						console.log("Evento registro inversor ok");
					}
				}
			});  
	await bloqueaCuenta(cuentaInversorNueva);
}
// fin PANTALLA REGISTRAR NUEVO INVERSOR

async function loginAdministrador() {

	var cuenta = document.getElementById("loginAdministrador").value;
	if (cuentaPlataforma == cuenta) {
	  await desbloqueaCuenta(cuentaPlataforma);
	  muestra_oculta('accesosDiv', 'administradorDiv');
	  limpiarMensajes();
	  cargarPantallaAdmPlataforma();

	} else {
	  console.log("Cuenta administrador no valida");
	  mostrarMensaje("msgAccesoAdministrador", "ERROR", "Cuenta administrador no valida");
	}
}

// PANTALLA PROMOTOR
async function loginPromotor() {
	
	if(usuarios.indexOf(document.getElementById("loginPromotorT").value+document.getElementById("pssPromotor").value) === -1){		
		mostrarMensajeGenerico("ERROR", "Cuenta o pass promotor no valida");
		return false;
	}

	let ctaPromotor = document.getElementById("loginPromotorT").value;
	await desbloqueaCuenta(ctaPromotor);
	localStorage.setItem("ctaPromotorLogado", ctaPromotor);

	cargarPantallaPromotor();

	muestra_oculta('accesosDiv', 'promotorDiv');		
}

async function cargarPantallaPromotor(){

	//document.getElementById("msgListProyectosPromotor").innerHTML = "";
	document.getElementById("listaProyectosPromotor").innerHTML = "";
	//cleanListaProyectosPromotor();

	let ctaPromotor = localStorage.getItem("ctaPromotorLogado");

	await desbloqueaCuenta(ctaPromotor);
	// Consultamos los datos del promotor
	await instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000}, function(error, resultConsultarPromo){
		if(!error){
			console.log(resultConsultarPromo);	
			document.getElementById("nbPromotorPro").innerHTML = resultConsultarPromo.nombre;
			document.getElementById("cifPromotorPro").innerHTML = resultConsultarPromo.cif;
			document.getElementById("capacidadPromotorPro").innerHTML = resultConsultarPromo.capacidad;
					
			if (resultConsultarPromo.listadoProyectos.length > 0) {
				
				// Consultamos todos los proyectos de un prmotor
				for(let idProyecto of resultConsultarPromo.listadoProyectos){

					// consultamos proyecto
					 instPlatPromoInver.methods.consultarProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000}, function(error, result){
						if(!error){
							console.log(result);	
							
							plantillaProyectosDelPromotor(result.nombre, 
								result.tokensGoal,
								result.rentabilidad,
								traduceEstado(result.estadoProyecto),
								result.fechaInicioFinanciacion,
								result.fechaFinFinanciacion,
								result.fechaInicioEjecucion,
								result.fechaFinEjecucion,
								ctaPromotor,
								idProyecto);
				
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
async function loginInversor() {

	if(usuarios.indexOf(document.getElementById("logInversor").value+document.getElementById("pssInversor").value) === -1){	
		mostrarMensajeGenerico("ERROR", "Cuenta o pass inversor no valida");
		return false;
	}

	let ctaInversor = document.getElementById("logInversor").value;
	await desbloqueaCuenta(ctaInversor);

	localStorage.setItem("ctaInversorLogado", ctaInversor);

	cargarPantallaInversor();	

	muestra_oculta('accesosDiv', 'inversorDiv');		
}

async function cargarPantallaInversor(){

	let ctaInversor = localStorage.getItem("ctaInversorLogado");

	await desbloqueaCuenta(ctaInversor);
	// Consultamos dastos del inversor y ctas proyectos que ha invertido
	await instPlatPromoInver.methods.consultarInversor(ctaInversor).call( {from: ctaInversor, gas: 300000}, function(error, result){
		if(!error){
			console.log(result);	
			document.getElementById("nbInversorInv").innerHTML = result.nombre;
			document.getElementById("cifInversorInv").innerHTML = result.cif;

			// Consultamos datos proyectos
			if (result.proyectos.length > 0) {
				for(let idProyecto of result.proyectos){
					
					if(idProyecto != 0){
						 instPlatPromoInver.methods.tokensInvertidosEnProyecto(idProyecto).call( {from: ctaInversor, gas: 300000}, function(error, resultTokenInvertidosEnProy){
							if(!error){
								console.log(resultTokenInvertidosEnProy);	
								
								if(resultTokenInvertidosEnProy.tokensInversor != 0){
									// consultamos proyecto
									 instPlatPromoInver.methods.consultarProyecto(idProyecto).call( {from: resultTokenInvertidosEnProy.ctaPromotor, gas: 300000}, function(error, resultConsultarProy){
										if(!error){
											console.log(resultConsultarProy);	
											
											plantillaProyectosDelInversor(resultTokenInvertidosEnProy.ctaPromotor,
												idProyecto,
												ctaInversor,
												resultConsultarProy.nombre, 
												resultConsultarProy.tokensGoal, 
												resultConsultarProy.rentabilidad, 
												traduceEstado(resultConsultarProy.estadoProyecto),										 
												formateaNumeroAFecha(resultConsultarProy.fechaInicioFinanciacion), 
												formateaNumeroAFecha(resultConsultarProy.fechaFinFinanciacion), 
												formateaNumeroAFecha(resultConsultarProy.fechaInicioEjecucion), 
												formateaNumeroAFecha(resultConsultarProy.fechaFinEjecucion), 						
												resultTokenInvertidosEnProy.tokensInversor);				

								
										} else { 
											console.error(err);
											mostrarMensajeGenerico("ERROR", error);										
										}	
									});
								}	
				
							} else { 
								console.error(err);
								mostrarMensajeGenerico("ERROR", error);												
							}	
						});							
					}		
				}

			}
				
		} else {
			console.error(error);			
			mostrarMensajeGenerico("ERROR", error);			
		}
	});


}	

async function abandonarProyecto(ctaPromotor, idProyecto, ctaInversor){
	
	await desbloqueaCuenta(ctaInversor);
	
	await instPlatPromoInver.methods.abandonarProyecto(ctaPromotor, idProyecto)
		.send({from: ctaInversor, gas: 300000}, function(error, result){
			if(!error){
				
				console.log("Registro inversor ok");
			}else{
				console.error(error);
				mostrarMensajeGenerico("ERROR", error);
			}				

			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					//console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.InversorAbandonaProyecto) {
						
						mostrarMensajeGenerico("SUCCESS", "Inversor ha solicitado abandonar proyector");
						console.log("Evento abandonar inversion ok");
					}
					
				}
			});  
	await bloqueaCuenta(cuentaInversorNueva);
}
// fin PANTALLA INVERSOR




// PANTALLA INVERTIR EN PROYECTOS
// Carga todos los proyectos existentes en la plataforma
async function cargarPantallaInvertirEnProyectos(){

	// Consultar addres de promotores
	await desbloqueaCuenta(cuentaPlataforma);
	
	await desbloqueaCuenta(ctaPromotor);

	const listaDePromotores = await instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 300000});

	for (let ctaPromotor of listaDePromotores) {

		// Consultar datos de cada promotor		
		const promotor = await instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000});

		plantillaPromotoresParaInvertir(ctaPromotor,
			promotor.nombre,
			promotor.cif);

		for (let idProyecto of promotor.listadoProyectos) {		

			// Consultar datos de cada proyecto
			const proyecto = await instPlatPromoInver.methods.consultarProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000});

			const balanceProyecto = await instPlatPromoInver.methods.consultarTokensInvertidosEnProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000});

			plantillaAddProyecto(ctaPromotor, 
				idProyecto,
				proyecto.nombre,
				proyecto.tokensGoal,
				proyecto.rentabilidad,
				traduceEstado(proyecto.estadoProyecto), 
				proyecto.fechaInicioFinanciacion, 
				proyecto.fechaFinFinanciacion,
				proyecto.fechaInicioEjecucion,
				proyecto.fechaFinEjecucion,
				balanceProyecto);			

		}			
	}	
}	

async function cargarPantallaInvertirEnProyectos1(){
	await desbloqueaCuenta(cuentaPlataforma);
	
	await desbloqueaCuenta(ctaPromotor);
	// Consultar addres de promotores
	await instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 300000}, function(error, resultListarPromo){
		if(!error){
			
			console.log(resultListarPromo);	
			let promotores = resultListarPromo;			

			for (let ctaPromotor of promotores) {
			
				// Consultar datos de cada promotor
				 instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000}, function(error, resultConsultarPromo){
					if(!error){
						console.log(resultConsultarPromo);	
						
						plantillaPromotoresParaInvertir(ctaPromotor, resultConsultarPromo.nombre, resultConsultarPromo.cif);
						
						for (let idProyecto of resultConsultarPromo.listadoProyectos) {							

							// Consultar datos de cada proyecto
							 instPlatPromoInver.methods.consultarProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000}, function(error, result){
								if(!error){
									console.log(result);	
									
									plantillaAddProyecto(ctaPromotor, 
										idProyecto,
										result.nombre,
										result.tokensGoal,
										result.rentabilidad,
										traduceEstado(result.estadoProyecto), 
										result.fechaInicioFinanciacion, 
										result.fechaFinFinanciacion,
										result.fechaInicioEjecucion,
										result.fechaFinEjecucion);											

								} else { 
									console.error(err);
									mostrarMensajeGenerico("ERROR", err);			
								}	
							});
						}						
			
					} else {
						console.error(error);
						mostrarMensajeGenerico("ERROR", error);
					}
				});			
			}


		} else { 
			console.error(err);
			mostrarMensajeGenerico("ERROR", err);			
		}	
	});

}

async function invertirProyecto(cuentaPromotor, idProyecto){

	let ctaInversor = localStorage.getItem("ctaInversorLogado");

	let numeroTokens = document.getElementById("tokensAInvertir"+idProyecto).value;

	await desbloqueaCuenta(ctaInversor);
	await instPlatPromoInver.methods.invertirProyecto(cuentaPromotor, idProyecto, numeroTokens)
		.send({from: ctaInversor, gas: 3000000}, function(error, result){
			if(!error){
				
				console.log("Inversión en proyecto ok");
			}else{
				console.error(error);
				mostrarMensajeGenerico("ERROR", error);
			}				

			}).on('receipt', function(receipt){
				
				if (receipt.events) {
					console.log(JSON.stringify(receipt.events, null, 2));

					if (receipt.events.TokensInvertidosProyecto) {						
						document.getElementById("tokensAInvertir"+idProyecto).value	= "";				
						mostrarMensajeGenerico("SUCCESS", "Token invertidos en proyecto");
						console.log("Evento TokensInvertidosProyecto ok");
					}
				}
			});  
	await bloqueaCuenta(ctaInversor);
}


// FIN PANTALLA INVERTIR EN PROYECTOS

async function finalizarProyecto(cuentaPromotor, idProyecto) {

	try {
		await desbloqueaCuenta(cuentaPromotor);
		await instPlatPromoInver.methods.finalizarProyecto(idProyecto)
			.send({from: cuentaPromotor, gas: 3000000}, function(error, result){
				if(!error){
					
					console.log("Proyecto finalizado OK");
				}else{
					console.error(error);
					mostrarMensaje("msgProyectoPromotorAction_"+idProyecto, "ERROR", "Proyecto no finalizado: debe estar en estado EN_CURSO y haber alcanzado la financiación (goal).");

				}				

				}).on('receipt', function(receipt){
					
					if (receipt.events) {

						if (receipt.events.ProyectoFinalizadoConTransferencias) {
							mostrarMensajeGenerico("SUCCESS","Proyecto finalizado y tokens transferidos a inversores.");
							console.log("Evento ProyectoFinalizadoConTransferencias ok");
						} else if (receipt.events.BalanceOfPromotorNoSuficiente) {
							mostrarMensajeGenerico("ERROR", "Proyecto NO finalizado. Promotor necesita tokens para pagar intereses a inversores.");
						} else {
							mostrarMensajeGenerico("ERROR", "Proyecto NO finalizado. Asegurese de que el proyecto esta en progreso y se ha alcanzado el Goal.");
						}
					}
				});   
		await bloqueaCuenta(cuentaPromotor);
		} catch (err) {
            console.error("Error: " + err);
            mostrarMensaje("msgProyectoPromotorAction_"+idProyecto, "ERROR", "Proyecto NO finalizado, error: " + err);
        }          
}

// PANTALLA ADMINISTRACION DE LA PLATAFORMA
async function cargarPantallaAdmPlataforma(){
	await desbloqueaCuenta(cuentaPlataforma);
	
	await desbloqueaCuenta(ctaPromotor);
	
	const listaDePromotores = await instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 300000});

	for (let ctaPromotor of listaDePromotores) {

		const promotor = await instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000});

		const balancePromotor = await instPlatPromoInver.methods.balanceOf(ctaPromotor).call( {from: cuentaPlataforma, gas: 50000});

		plantillaPromotorProyectoInversorAdmin(ctaPromotor,promotor.nombre,
			promotor.cif,
			promotor.capacidad,
			balancePromotor);

		for (let idProyecto of promotor.listadoProyectos) {		

			// Consultar datos de cada proyecto
			const proyecto = await instPlatPromoInver.methods.consultarProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000});

			const balanceProyecto = await instPlatPromoInver.methods.consultarTokensInvertidosEnProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000});

			listaProyectosAdmin(ctaPromotor, 
				idProyecto,
				proyecto.nombre,
				proyecto.tokensGoal,
				proyecto.rentabilidad,
				proyecto.fechaInicioFinanciacion,
				proyecto.fechaFinFinanciacion,
				proyecto.fechaInicioEjecucion,
				proyecto.fechaFinEjecucion,
				proyecto.estadoProyecto,
				balanceProyecto);

			// Consultar inversores de cada proyecto
			const inversoresDelProyecto = await instPlatPromoInver.methods.listarInversoresProyecto(ctaPromotor, idProyecto).call( {from: ctaPromotor, gas: 300000});

			for (let ctaInversor of inversoresDelProyecto) {

				const inversor = await instPlatPromoInver.methods.consultarInversor(ctaInversor).call( {from: ctaInversor, gas: 300000});				

				const tokensPorProyectosPorInversor = await instPlatPromoInver.methods.listarTokensPorProyectosPorInversor(idProyecto, ctaInversor).call( {from: ctaPromotor, gas: 300000});

				listaInversoresPorProyectoAdmin(idProyecto,
					inversor.nombre,
					inversor.cif,
					tokensPorProyectosPorInversor); 

			}	

		}	
		
	}
}	



 
