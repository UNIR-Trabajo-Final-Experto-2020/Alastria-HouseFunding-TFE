function mostrarMensaje(id, tipoMensaje, mensaje) {

	var className;

	if (tipoMensaje == "SUCCESS") {
		className = "label success";
	} else if (tipoMensaje == "INFO") {
		className = "label info";
	} else if (tipoMensaje == "WARNING") {
		className = "label warning";
	} else if (tipoMensaje == "ERROR") {
		className = "label err";
	} else if (tipoMensaje == "OTHER") {		
		className = "label other";

	}

	document.getElementById(id).className = className;
	document.getElementById(id).innerHTML  = mensaje;	
}

function mostrarMensajeGenerico(tipoMensaje, mensaje) {

	var className;

	if (tipoMensaje == "SUCCESS") {
		className = "label success";
	} else if (tipoMensaje == "INFO") {
		className = "label info";
	} else if (tipoMensaje == "WARNING") {
		className = "label warning";
	} else if (tipoMensaje == "ERROR") {
		className = "label err";
	} else if (tipoMensaje == "OTHER") {		
		className = "label other";

	}

	document.getElementById("mensajesDiv").style.display = 'block';
	document.getElementById("mensajesDiv").className = className;
	document.getElementById("mensajesDiv").innerHTML  = mensaje;	
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
	//document.getElementById("listaInversoresPorProyectoAdmin").innerHTML = "";
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
function plantillaPromotoresParaInvertir(nbPromotor, cif) {

	var plantilla= `<br>      
		<div class="row"><p><button type="button" onclick="muestra_oculta('inversorDiv', 'invertirEnProyectoDiv');cleanInvertirEnProyecto();cargarPantallaInversor();">Volver</button></p></div> 	
		<br>
		<div class="row"><h3>PROMOTOR</h3></div> 
		<div class="row">
		<div class="col-sm-1"><label> Nombre: </label></div>
		<div class="col-sm-11"><span id="nbPromotorPro">${nbPromotor}</span></div>            	
		</div>                 
		<div class="row">
			<div class="col-sm-1"><label> CIF: </label></div>
			<div class="col-sm-11"><span id="cifPromotorPro">${cif}</span></div>            	
		</div>                                               
		<br>
		<div class="row"><h5>PROYECTOS</h5></div>
		<div class="row">
		<table class="table">             
			<thead>
			<tr>
				<th>Nombre</th>
				<th>TokenGoal</th>
				<th>Rentabil.</th>
				<th>Inicio Financiación</th>
				<th>Fin Financiación</th>
				<th>Inicio Ejecución</th>
				<th>Fin Ejecución</th>
				<th>Estado</th>
				<th></th>
				<th></th>
			</tr>
			</thead>
			<tbody id="listaProyectosPromotorParaInvertir">                 
			</tbody>
		</table>   
		</div>`;	

	document.getElementById("invertirEnProyectoDiv").innerHTML += plantilla;	
}

// se utiliza en cargarPantallaInvertirEnProyectos
function plantillaAddProyecto (
	ctaPromotor, 
	ctaProyecto, 
	nbProyecto,
	tokenGoalProyecto,
	rentabilidad,
	estadoProyecto, 
	fechaInicioFinanciacion, 
	fechaFinFinanciacion,
	fechaIniEjecucion, 
	fechaFinEjecucion) { 

	let plantilla = `<tr>
		<td>${nbProyecto}</td>
		<td>${tokenGoalProyecto}</td>
		<td>${rentabilidad}</td>
		<td>${formateaNumeroAFecha(fechaInicioFinanciacion)}</td>
		<td>${formateaNumeroAFecha(fechaFinFinanciacion)}</td>
		<td>${formateaNumeroAFecha(fechaIniEjecucion)}</td>
		<td>${formateaNumeroAFecha(fechaFinEjecucion)}</td>
		<td>${estadoProyecto}</td>            
		<td><button type="button" onclick="invertirProyecto('${ctaPromotor}', '${ctaProyecto}');">Invertir</button></td> 
		<td><input type="text" id="tokensAInvertir" size="5"/></td> 
	</tr>`;

	document.getElementById("listaProyectosPromotorParaInvertir").innerHTML += plantilla;
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
		<td><button type="button" onclick="abandonarProyecto('${ctaPromotor}', '${ctaProyecto}', '${ctaInversor}');cleanInversor();">Abandonar</button></td> 
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
		<div class="col-sm-2"><label> <button id="rowGetTokensId">Obtener tokens</button></label></div>
		<div class="col-sm-10"></div>            	
	</div>       
	<br>
	<div class="row"><h5>PROYECTO</h5></div>
	<div class="row">
	  <table class="table">             
		<thead>
		  <tr>
			<th>Nombre</th>
			<th>TokenGoal</th>
			<th>Rentabilidad</th>
			<th>Inicio Financiación</th>
			<th>Fin Financiación</th>
			<th>Inicio Ejecución</th>
			<th>Fin Ejecución</th>                          
			<th>Estado</th>
			<th>Balance</th>
		  </tr>
		</thead>
		<tbody id="listaProyectosAdmin">                 
		</tbody>
	  </table>   
	</div>    
	<br>
	<div class="row"><h6>INVERSORES</h6></div>
	<div class="row">
	  <table class="table">             
		<thead>
		  <tr>
			<th>Nombre</th>
			<th>Cif</th>             
			<th>Balance</th>
		  </tr>
		</thead>
		<tbody id="listaInversoresPorProyectoAdmin">                 
		</tbody>
	  </table>   
	</div>`;

	document.getElementById("listadoAdm").innerHTML += plantilla;

}

function listaProyectosAdmin(nbProyecto,
	tokenGoal,
	rentabilidad,
	inicioFinanciacion,
	finFinanciacion,
	inicioEjecucion,
	finEjecucion,
	estado,
	balance) {

	let plantilla = `<tr>
		<td>${nbProyecto}</td>
		<td>${tokenGoal}</td>
		<td>${rentabilidad}</td>
		<td>${formateaNumeroAFecha(inicioFinanciacion)}</td>
		<td>${formateaNumeroAFecha(finFinanciacion)}</td>
		<td>${formateaNumeroAFecha(inicioEjecucion)}</td>
		<td>${formateaNumeroAFecha(finEjecucion)}</td>
		<td>${traduceEstado(estado)}</td>
		<td>${balance}</td>            	
		</tr>`;

	document.getElementById("listaProyectosAdmin").innerHTML += plantilla;
}

function listaInversoresPorProyectoAdmin(nbInversor,
	cifInversor,
	balance) {

		let plantilla = `<tr>
		<td>${nbInversor}</td>
		<td>${cifInversor}</td>
		<td>${balance}</td>		          	
		</tr>`;

	document.getElementById("listaInversoresPorProyectoAdmin").innerHTML += plantilla;
}
