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
	document.getElementById("fechaIniFiancProyectoReg").value = "";
	document.getElementById("fechaFinFiancProyectoReg").value = "";
	//document.getElementById("fechaIniEjeProyectoReg").value = "";
	//document.getElementById("fechaFinEjeProyectoReg").value = "";
	
}

function cleanRegistrarInversor(){

	document.getElementById("nbInversor").value = "";
    document.getElementById("cifInversor").value = "";    
}


function plantillaProyectosDelPromotor(nbProyecto, tokenGoalProyecto, rentabilidad, estadoProyecto, fechaInicioFinanciacion, fechaFinFinanciacion) {

	var plantilla= ` 
		<div class="cuadro centrado">
			Proyecto
			</br></br>
			Nombre: ${nbProyecto}
			</br>
			TokenGoal: ${tokenGoalProyecto}
			</br>
			Rentabilidad: ${rentabilidad}
			</br>
			EstadoProyecto: ${estadoProyecto}
			</br>
			Fecha Inicio Financiación: ${fechaInicioFinanciacion}
			</br>
			Fecha Fin Financiación: ${fechaFinFinanciacion}
		</div>`;

	document.getElementById("msgListProyectosPromotor").innerHTML += plantilla;
	
}
	

 
