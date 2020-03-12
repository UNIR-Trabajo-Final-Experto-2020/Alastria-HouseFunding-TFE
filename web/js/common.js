function mostrarMensaje(id, tipoMensaje, mensaje) {

	var className = getClassNameTipoMensaje(tipoMensaje);

	document.getElementById(id).className += className;
	document.getElementById(id).innerHTML  = mensaje;	
}

function mostrarMensajeGenerico(tipoMensaje, mensaje) {

	var className = getClassNameTipoMensaje(tipoMensaje);

	document.getElementById("mensajesDiv").style.display = 'block';
	document.getElementById("mensajesDiv").className = className;
	document.getElementById("mensajesDiv").innerHTML  = mensaje;	
}

function getClassNameTipoMensaje(tipoMensaje){

	var className;

	if (tipoMensaje == "SUCCESS") {
		className = "bg-success text-white container p-1 my-1 border text-center";
	} else if (tipoMensaje == "INFO") {
		className = "bg-primary text-white container p-1 my-1 border text-center";
	} else if (tipoMensaje == "WARNING") {
		className = "bg-warning text-white container p-1 my-1 border text-center";
	} else if (tipoMensaje == "ERROR") {
		className = "bg-danger text-white container p-1 my-1 border text-center";
	} else if (tipoMensaje == "OTHER") {		
		className = "bg-secondary text-white container p-1 my-1 border text-center";

	}

	return className;
}


function muestra_oculta(id1, id2){

	if (document.getElementById){ //se obtiene el id
		var el = document.getElementById(id1); //se define la variable "el" igual a nuestro div
		el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div

		el = document.getElementById(id2); //se define la variable "el" igual a nuestro div
		el.style.display = (el.style.display == 'none') ? 'block' : 'none'; //damos un atributo display:none que oculta el div
	}

	document.getElementById("mensajesDiv").style.display = 'none';
}

function cleanRegistrarPromotor(){

	document.getElementById("nbPromotor").value = "";
    document.getElementById("cifPromotor").value = "";
    document.getElementById("capacidadPromotor").value = "";
}

function cleanRegistrarProyecto(){

	document.getElementById("nbProyectoReg").value = "";
	document.getElementById("tokenGoalProyectoReg").value = "";
	document.getElementById("rentabilidadProyectoReg").value = "";
	document.getElementById("fechaIniFinancProyectoReg").value = "";
	document.getElementById("fechaFinFinancProyectoReg").value = "";
	document.getElementById("fechaIniEjeProyectoReg").value = "";
	document.getElementById("fechaFinEjeProyectoReg").value = "";
	
}

function cleanRegistrarInversor(){

	document.getElementById("nbInversor").value = "";
    document.getElementById("cifInversor").value = "";    
}

function cleanInvertirEnProyecto(){

	document.getElementById("invertirEnProyectoDiv").innerHTML = "";	
}

function cleanInversor(){
	document.getElementById("listaProyectosDelInversor").innerHTML = "";	
}

function cleanListaProyectosPromotor(){
	
	$('[id^=msgListProyectosPromotor]').empty();

}

function cleanAdministracionPlataforma(){
	
	document.getElementById("listadoAdm").innerHTML = "";	
}

// se utiliza en cargarPantallaPromotor
function plantillaProyectosDelPromotor(nbProyecto, 
	tokenGoalProyecto, rentabilidad, estadoProyecto, 
	fechaInicioFinanciacion, fechaFinFinanciacion,
	fechaIniEjecucion, fechaFinEjecucion, ctaPromotor, ctaProyecto) {

	let plantilla = `<tr>
		<td>${nbProyecto}</td>
		<td>${tokenGoalProyecto}</td>
		<td>${rentabilidad}</td>
		<td>${formateaNumeroAFecha(fechaInicioFinanciacion)}</td>
		<td>${formateaNumeroAFecha(fechaFinFinanciacion)}</td>
		<td>${formateaNumeroAFecha(fechaIniEjecucion)}</td>
		<td>${formateaNumeroAFecha(fechaFinEjecucion)}</td>
		<td>${estadoProyecto}</td>            
		<td><button type="button" onclick="finalizarProyecto('${ctaPromotor}', '${ctaProyecto}');">Finalizar</button></td> 
	  </tr>`;
	
	document.getElementById("listaProyectosPromotor").innerHTML += plantilla;
}

//se utiliza en cargarPantallaInvertirEnProyectos
function plantillaPromotoresParaInvertir(ctaPromotor, nbPromotorPro,
	cifPromotorPro) {

	var plantilla= `
	<br>	
	<div class="row"><p><button type="button" onclick="muestra_oculta('inversorDiv', 'invertirEnProyectoDiv');cleanInvertirEnProyecto();cargarPantallaInversor();">Volver</button></p></div> 	
	<div class="row"><h3>PROMOTOR</h3></div> 
	<div class="row">
	  <div class="col-sm-1"><label> Nombre: </label></div>
	  <div class="col-sm-11"><span id="nbPromotorPro">${nbPromotorPro}</span></div>            	
	</div>                 
	<div class="row">
		<div class="col-sm-1"><label> CIF: </label></div>
		<div class="col-sm-11"><span id="cifPromotorPro">${cifPromotorPro}</span></div>            	
	</div> 	
	<br>
	<div id="listaProyectosParaInvertir${ctaPromotor}"></div>`;
	
	document.getElementById("invertirEnProyectoDiv").innerHTML += plantilla;	
}

// se utiliza en cargarPantallaInvertirEnProyectos
function plantillaAddProyecto (
	ctaPromotor, 
	idProyecto, 
	nbProyecto,
	tokenGoalProyecto,
	rentabilidad,
	estadoProyecto, 
	fechaInicioFinanciacion, 
	fechaFinFinanciacion,
	fechaIniEjecucion, 
	fechaFinEjecucion,
	balance) { 


		let plantilla = `		
		<div class="row">
			<table class="table">             
				<thead>
				<tr>
					<th>PROYECTO:</th>	
					<th>Nombre</th>
					<th>TokenGoal</th>
					<th>Rentab.</th>
					<th>Inicio Financ.</th>
					<th>Fin Financ.</th>
					<th>Inicio Ejec.</th>
					<th>Fin Ejec.</th>                          
					<th>Estado</th>
					<th>Balance</th>
					<th></th>
					<th></th>
				</tr>
				</thead>
				<tbody> 
					<tr>
						<td></td>
						<td>${nbProyecto}</td>
						<td>${tokenGoalProyecto}</td>
						<td>${rentabilidad}</td>
						<td>${formateaNumeroAFecha(fechaInicioFinanciacion)}</td>
						<td>${formateaNumeroAFecha(fechaFinFinanciacion)}</td>
						<td>${formateaNumeroAFecha(fechaIniEjecucion)}</td>
						<td>${formateaNumeroAFecha(fechaFinEjecucion)}</td>
						<td>${estadoProyecto}</td>
						<td>${balance}</td> 
						<td><button type="button" onclick="invertirProyecto('${ctaPromotor}', '${idProyecto}');">Invertir</button></td> 
						<td><input type="text" id="tokensAInvertir${idProyecto}" size="5"/></td>            	
					</tr>				                
				</tbody>
			</table>   
		</div>`;

	document.getElementById("listaProyectosParaInvertir"+ctaPromotor).innerHTML += plantilla;
	
}

// se utiliza en cargarPantallaInversor
function plantillaProyectosDelInversor(ctaPromotor, 
	ctaProyecto, 
	ctaInversor,
	nbProyecto, 
	tokenGoalProyecto, 
	rentabilidad, 
	estadoProyecto, 
	fechaInicioFinanciacion, 
	fechaFinFinanciacion,
	fechaIniEjecucion,
	fechaFinEjecucion,
	tokenInvertidos) {

	let plantilla = `<tr>
		<td>${nbProyecto}</td>
		<td>${tokenGoalProyecto}</td>
		<td>${rentabilidad}</td>
		<td>${tokenInvertidos}</td>   
		<td>${formateaNumeroAFecha(fechaInicioFinanciacion)}</td>
		<td>${formateaNumeroAFecha(fechaFinFinanciacion)}</td>
		<td>${formateaNumeroAFecha(fechaIniEjecucion)}</td>
		<td>${formateaNumeroAFecha(fechaFinEjecucion)}</td>
		<td>${estadoProyecto}</td>		         
		<td><button type="button" onclick="abandonarProyecto('${ctaPromotor}', '${ctaProyecto}', '${ctaInversor}');">Abandonar</button></td> 
		</tr>`;

	document.getElementById("listaProyectosDelInversor").innerHTML += plantilla;
	
}

function traduceEstado(id){	
	
	if(id == 0){
		return "EN_FINANCIACION";
	}else if(id == 1) {
		return "CANCELADO";
	}else if(id == 2) {
		return "EN_PROGRESO";
	}else if(id == 3) {
		return "FINALIZADO";
	}else{
		return "";
	}
}

// recibe una fecha en formato dd/mm/yyyy
function formeteaFechaANumero(fecha){

	return Date.parse(fecha);
}

function formateaNumeroAFecha(num){
	if (num == 0) {
		return "-";
	}
	return new Date(Number.parseInt(num)).toLocaleDateString();	
}

function plantillaPromotorProyectoInversorAdmin(
	ctaPromotor,
	nbPromotorPro,
	cifPromotorPro,
	capacidadPromotorPro,
	balancePromotorPro){

	var plantilla= `
	<br>	
	<div class="row"><h3>PROMOTOR</h3></div> 
	<div class="row">
	  <div class="col-sm-1"><label> Nombre: </label></div>
	  <div class="col-sm-11"><span id="nbPromotorPro">${nbPromotorPro}</span></div>            	
	</div>                 
	<div class="row">
		<div class="col-sm-1"><label> CIF: </label></div>
		<div class="col-sm-11"><span id="cifPromotorPro">${cifPromotorPro}</span></div>            	
	</div> 
	<div class="row">
		<div class="col-sm-1"><label> Capcidad: </label></div>
		<div class="col-sm-11"><span id="capacidadPromotorPro">${capacidadPromotorPro}</span></div>            	
	</div> 
	 <div class="row">
		<div class="col-sm-1"><label> Balance: </label></div>
		<div class="col-sm-11"><span id="balancePromotorPro">${balancePromotorPro}</span></div> 		
	</div>  
	<div class="row">
		<div class="col-sm-2"><label> <button onclick="tranferirTokenPromotor('${ctaPromotor}');">Transferir tokens</button></label></div>
		<div class="col-sm-10"> <p id="mensajeSpanTT${ctaPromotor}"></p></div>            	
	</div>       
	<br>
	<div id="listaProyectosInversoresAdmin${ctaPromotor}"></div>`;
	

	document.getElementById("listadoAdm").innerHTML += plantilla;

}

function listaProyectosAdmin(ctaPromotor,
	idProyecto,
	nbProyecto,
	tokenGoal,
	rentabilidad,
	inicioFinanciacion,
	finFinanciacion,
	inicioEjecucion,
	finEjecucion,
	estado,
	balance) {

	let plantilla = `		
		<div class="row">
			<table class="table">             
				<thead>
				<tr>
					<th>PROYECTO:</th>	
					<th>Nombre</th>
					<th>TokenGoal</th>
					<th>Rentab.</th>
					<th>Inicio Financ.</th>
					<th>Fin Financ.</th>
					<th>Inicio Ejec.</th>
					<th>Fin Ejec.</th>                          
					<th>Estado</th>
					<th>Balance</th>
				</tr>
				</thead>
				<tbody> 
					<tr>
						<td></td>
						<td>${nbProyecto}</td>
						<td>${tokenGoal}</td>
						<td>${rentabilidad}</td>
						<td>${formateaNumeroAFecha(inicioFinanciacion)}</td>
						<td>${formateaNumeroAFecha(finFinanciacion)}</td>
						<td>${formateaNumeroAFecha(inicioEjecucion)}</td>
						<td>${formateaNumeroAFecha(finEjecucion)}</td>
						<td>${traduceEstado(estado)}</td>
						<td>${balance}</td>            	
					</tr>				                
				</tbody>
			</table>   
		</div>		
		<div class="row">
			<table class="table">             
				<thead>
				<tr>
					<th></th>
					<th>INVERSORES:</th>
					<th>Nombre</th>
					<th>Cif</th>             
					<th>Balance</th>
				</tr>
				</thead>
				<tbody id="listaInversoresAdmin${idProyecto}">  					             
				</tbody>
			</table>   
		</div>`;

	document.getElementById("listaProyectosInversoresAdmin"+ctaPromotor).innerHTML += plantilla;
}

function listaInversoresPorProyectoAdmin(idProyecto,
	nbInversor,
	cifInversor,
	balance) {

		let plantilla = `
			<tr>
				<td></td>
				<td></td>
				<td>${nbInversor}</td>
				<td>${cifInversor}</td>
				<td>${balance}</td>		          	
			</tr>`;

	document.getElementById("listaInversoresAdmin"+idProyecto).innerHTML += plantilla;
}
