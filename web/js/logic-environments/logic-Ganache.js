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
	//cuentaPromotor = accounts[1];

	//accounts[1] -> Promotor: 0x5b8BA5c293704BB759A00EBFD2C2b97A8A2DDa40  //EJAL
 	//accounts[2] -> Inversor: 0x42A88Fb67F3b8DE7a438AB34d876b29f0d856A54  //EJAL

	//Recuperamos el contrato	
	//const contratoPromoInver = "0x2AE4c2160d1CbaFF3F8B07B3A0Ca51243931a4eb";  //Juanjo
	const contratoPromoInver = "0x78c19164660899116f119d2FBf32307F5b3E7def";    //EJAL

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
	let fechaIniFinan = document.getElementById("fechaIniFiancProyectoReg").value;
	let fechaFinFinan = document.getElementById("fechaFinFiancProyectoReg").value;
	//let fechaIniEjec = document.getElementById("fechaIniEjeProyectoReg").value;
	//let fechaFinEjec = document.getElementById("fechaFinEjeProyectoReg").value;

	let ctaPrmotor = localStorage.getItem("ctaPromotorLogado");
	let cuentaProyecto = dameNuevaCuenta();
		
	await instPlatPromoInver.methods
		.registrarProyecto(cuentaProyecto, nombre, fechaIniFinan, fechaFinFinan, tokenGoal, rentabilidad)
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

	document.getElementById("msgListProyectosPromotor").innerHTML = "";

	let ctaPromotor = localStorage.getItem("ctaPromotorLogado");

	// Consultamos los datos del promotor
	instPlatPromoInver.methods.consultarPromotor(ctaPromotor).call( {from: ctaPromotor, gas: 30000}, function(error, resultConsultarPromo){
		if(!error){
			console.log(resultConsultarPromo);	
			document.getElementById("nbPromotorPro").innerHTML = resultConsultarPromo.nombre;
			document.getElementById("cifPromotorPro").innerHTML = resultConsultarPromo.cif;
			document.getElementById("capacidadPromotorPro").innerHTML = resultConsultarPromo.capacidad;
					
			if (resultConsultarPromo.proyectos.length > 0) {
				
				// Consultamos todos los proyectos de un prmotor
				for(let ctaProyecto of resultConsultarPromo.proyectos){

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

					
					
					instPlatPromoInver.methods.tokensInvertidosEnProyecto(ctaProyecto).call( {from: ctaInversor, gas: 30000}, function(error, resultTokenInvertidosEnProy){
						if(!error){
							console.log(resultTokenInvertidosEnProy);	
							
							// consultamos proyecto
							instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: resultTokenInvertidosEnProy.ctaPromotor, gas: 30000}, function(error, resultConsultarProy){
								if(!error){
									console.log(resultConsultarProy);	
									
									plantillaProyectosDelInversor(resultConsultarProy.nombre, 
										resultConsultarProy.tokensGoal, 
										resultConsultarProy.rentabilidad, 
										traduceEstado(resultConsultarProy.estadoProyecto),										 
										resultConsultarProy.fechaInicioFinanciacion, 
										resultConsultarProy.fechaFinFinanciacion, 
										resultTokenInvertidosEnProy.tokensInversor);				

						
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
						for (let ctaProyecto of resultConsultarPromo.proyectos) {

							

							// Consultar datos de cada proyecto
							instPlatPromoInver.methods.consultarProyecto(ctaProyecto).call( {from: ctaPromotor, gas: 30000}, function(error, result){
								if(!error){
									console.log(result);	
									
									plantillaAddProyecto(ctaPromotor, ctaProyecto,result.nombre);
									//plantillaPromotoresParaInvertir(nbPromotor, plantillaProyectos)
									//plantillaProyectos += plantillaProyectosParaInvertir(result.nombre);
									//let tabla = tablaProyecto(tablaPromo, result.nombre, result.tokensGoal, result.rentabilidad, result.fechaInicioFinanciacion, result.fechaFinFinanciacion);
									//document.getElementById("invertirEnProyectoSpan").innerHTML += tabla;
						
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

function invertirProyecto(cuentaPromotor, cuentaProyecto){

	let ctaInversor = localStorage.getItem("ctaInversorLogado");

	let numeroTokens = document.getElementById(cuentaProyecto).value;

	instPlatPromoInver.methods.invertirProyecto(cuentaPromotor, cuentaProyecto, numeroTokens)
		.send({from: ctaInversor, gas: 300000}, function(error, result){
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
						document.getElementById(cuentaProyecto).value = "";						
						mostrarMensajeGenerico("SUCCESS", "Token invertidos en proyecto");
						console.log("Evento TokensInvertidosProyecto ok");
					}
				}
			});  
}

/*
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

}*/
// finPANTALLA INVERTIR EN PROYECTOS






  


 
