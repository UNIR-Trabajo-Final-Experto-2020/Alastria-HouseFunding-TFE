//En caso de ganache

var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

var instanciaPlataformaPromoInver;
var accounts, cuentaPlataforma, cuentaPromotor;
let contadorAccountsUtilizadas = 1;

async function start() {

	// Gett all the accounts
	accounts = await web3.eth.getAccounts();

	console.log("INIT ACCOUNTS\n" + accounts);

	//Cuentas
	cuentaPlataforma = accounts[0];	
	
	//Recuperamos el contrato	
	//const contratoPromoInver = "0x8E1592aA17adec5F69De4Ef666cbE50892568B4e";  //Juanjo
	const contratoPromoInver = "0x3118AD402cc7017E3E3DB123Cb1A6e8b4483b612";    //EJAL	

	instPlatPromoInver = new web3.eth.Contract(ABI_CPII, contratoPromoInver);	
}

function dameNuevaCuenta(){

	let nuevaCta = accounts[contadorAccountsUtilizadas]
	contadorAccountsUtilizadas ++;
	return nuevaCta;
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
							localStorage.setItem("accountPromotor", cuentaPromotor);
							mostrarMensajeGenerico("SUCCESS","Promotor registrado correctamente, su Id: " + ctaPromotorNueva);
							cleanRegistrarPromotor();
							console.log("Evento registro promotor ok");
						}
					}
				});  

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
	let idProyecto = web3.utils.sha3(ctaPrmotor);

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
						cleanRegistrarInversor();
						mostrarMensajeGenerico("SUCCESS", "Inversor registrado correctamente, su Id:" + cuentaInversorNueva);
						console.log("Evento registro inversor ok");
					}
				}
			});  
}
// fin PANTALLA REGISTRAR NUEVO INVERSOR



// PANTALLA PROMOTOR
function loginPromotor() {

	let ctaPromotor = document.getElementById("loginPromotorT").value;

	localStorage.setItem("ctaPromotorLogado", ctaPromotor);

	cargarPantallaPromotor();

	muestra_oculta('accesosDiv', 'promotorDiv');		
}

function cargarPantallaPromotor(){

	//document.getElementById("msgListProyectosPromotor").innerHTML = "";
	document.getElementById("listaProyectosPromotor").innerHTML = "";
	//cleanListaProyectosPromotor();

	let ctaPromotor = localStorage.getItem("ctaPromotorLogado");

	// Consultamos los datos del promotor
	instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000}, function(error, resultConsultarPromo){
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
function loginInversor() {

	let ctaInversor = document.getElementById("logInversor").value;

	localStorage.setItem("ctaInversorLogado", ctaInversor);

	cargarPantallaInversor();	

	muestra_oculta('accesosDiv', 'inversorDiv');		
}

function cargarPantallaInversor(){

	let ctaInversor = localStorage.getItem("ctaInversorLogado");

	// Consultamos dastos del inversor y ctas proyectos que ha invertido
	instPlatPromoInver.methods.consultarInversor(ctaInversor).call( {from: ctaInversor, gas: 300000}, function(error, result){
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

function abandonarProyecto(ctaPromotor, idProyecto, ctaInversor){

	instPlatPromoInver.methods.abandonarProyecto(ctaPromotor, idProyecto)
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
}
// fin PANTALLA INVERSOR




// PANTALLA INVERTIR EN PROYECTOS
// Carga todos los proyectos existentes en la plataforma
function cargarPantallaInvertirEnProyectos(){

	// Consultar addres de promotores
	instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 300000}, function(error, resultListarPromo){
		if(!error){
			
			console.log(resultListarPromo);	
			let promotores = resultListarPromo;			

			for (let ctaPromotor of promotores) {
			
				// Consultar datos de cada promotor
				instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000}, function(error, resultConsultarPromo){
					if(!error){
						console.log(resultConsultarPromo);	
						
						plantillaPromotoresParaInvertir(resultConsultarPromo.nombre, resultConsultarPromo.cif);
						
						for (let idProyecto of resultConsultarPromo.listadoProyectos) {							

							// Consultar datos de cada proyecto
							instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaPromotor, gas: 300000}, function(error, result){
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

function invertirProyecto(cuentaPromotor, idProyecto){

	let ctaInversor = localStorage.getItem("ctaInversorLogado");

	let numeroTokens = document.getElementById(cuentaProyecto).value;

	instPlatPromoInver.methods.invertirProyecto(cuentaPromotor, idProyecto, numeroTokens)
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
						document.getElementById(idProyecto).value = "";						
						mostrarMensajeGenerico("SUCCESS", "Token invertidos en proyecto");
						console.log("Evento TokensInvertidosProyecto ok");
					}
				}
			});  
}


// FIN PANTALLA INVERTIR EN PROYECTOS

async function finalizarProyecto(cuentaPromotor, idProyecto) {

	try {
		instPlatPromoInver.methods.finalizarProyecto(idProyecto)
			.send({from: cuentaPromotor, gas: 3000000}, function(error, result){
				if(!error){
					
					console.log("Proyecto finalizado OK");
				}else{
					console.error(error);
					mostrarMensaje("msgProyectoPromotorAction_"+cuentaProyecto, "ERROR", "Proyecto no finalizado: debe estar en estado EN_CURSO y haber alcanzado la financiación (goal).");

				}				

				}).on('receipt', function(receipt){
					
					if (receipt.events) {

						if (receipt.events.ProyectoFinalizadoConTransferencias) {
							mostrarMensaje("msgProyectoPromotorAction_"+idProyecto, "SUCCESS", "Proyecto finalizado y tokens transferidos a inversores.");
							console.log("Evento ProyectoFinalizadoConTransferencias ok");
						} else if (receipt.events.BalanceOfPromotorNoSuficiente) {
							mostrarMensaje("msgProyectoPromotorAction_"+idProyecto, "ERROR", "Proyecto NO finalizado. Promotor necesita tokens para pagar intereses a inversores.");
						} else {
							mostrarMensaje("msgProyectoPromotorAction_"+idProyecto, "ERROR", "Proyecto NO finalizado, error...");
						}
					}
				});   
		} catch (err) {
            console.error("Error: " + err);
            mostrarMensaje("msgProyectoPromotorAction_"+idProyecto, "ERROR", "Proyecto NO finalizado, error: " + err);
        }          
}

// PANTALLA ADMINISTRACION DE LA PLATAFORMA

function cargarPantallaAdmPlataforma(){

	// Consultar addres de promotores
	instPlatPromoInver.methods.listarPromotoress().call( {from: cuentaPlataforma, gas: 300000}, function(error, resultListarPromo){
		if(!error){
			
			console.log(resultListarPromo);	
			let promotores = resultListarPromo;			

			for (let ctaPromotor of promotores) {
			
				// Consultar datos de cada promotor
				instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 300000}, function(error, resultConsultarPromo){
					if(!error){
						console.log(resultConsultarPromo);	
						
						plantillaPromotorProyectoInversorAdmin(resultConsultarPromo.nombre,
							resultConsultarPromo.cif,
							resultConsultarPromo.capacidad,
							100);
	
						//plantillaPromotoresParaInvertir(resultConsultarPromo.nombre, resultConsultarPromo.cif);
						
						for (let idProyecto of resultConsultarPromo.listadoProyectos) {							

							// Consultar datos de cada proyecto
							instPlatPromoInver.methods.consultarProyecto(idProyecto).call( {from: ctaPromotor, gas: 300000}, function(error, result){
								if(!error){
									console.log(result);	
									
									// Consultar inversores de cada proyecto
									instPlatPromoInver.methods.listarInversoresProyecto(ctaPromotor, idProyecto).call( {from: ctaPromotor, gas: 300000}, function(error, resultInversoresPorProy){
										if(!error){
											console.log(result);	
											
											for (let ctaInversor of resultInversoresPorProy._inversores) {
											
												// Consultar inversores de cada proyecto
												instPlatPromoInver.methods.listarTokensPorProyectosPorInversor(idProyecto, ctaInversor).call( {from: ctaPromotor, gas: 300000}, function(error, resultTokenInversor){
													if(!error){
														console.log(result);	
														
														
														/*
														plantillaAddProyecto(ctaPromotor, 
															ctaProyecto,
															result.nombre,
															result.tokensGoal,
															result.rentabilidad,
															traduceEstado(result.estadoProyecto), 
															result.fechaInicioFinanciacion, 
															result.fechaFinFinanciacion,
															result.fechaInicioEjecucion,
															result.fechaFinEjecucion);											
																*/
													} else { 
														console.error(err);
														mostrarMensajeGenerico("ERROR", err);			
													}	
												});											
											}
											
										} else { 
											console.error(err);
											mostrarMensajeGenerico("ERROR", err);			
										}	
									});
																		
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



  


 
