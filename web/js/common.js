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

function cleanInvertirEnProyecto(){

	document.getElementById("invertirEnProyectoSpan").innerHTML = "";    
}

function cleanInversor(){
	document.getElementById("msgConsultaInversor").innerHTML = "";
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

function plantillaPromotoresParaInvertir(ctaPromotor, nbPromotor, proyectosPromotor) {

	var plantilla= ` 
		<div id="${ctaPromotor}" class="cuadro centrado">
			<div>Promotor : ${nbPromotor}</div>						
		</div>`;

	document.getElementById("invertirEnProyectoSpan").innerHTML += plantilla;	
}

function plantillaAddProyecto (ctaPromotor, ctaProyecto, nbProyecto) { 
	
	// Creamos div
	var newDiv = document.createElement("div"); 

	var newContent = document.createTextNode(nbProyecto);
	newDiv.appendChild(newContent); //añade texto al div creado. 

	// boton
	var newButton = document.createElement("button"); 
	var aType = document.createAttribute("type");
	aType.value = "button";
	newButton.setAttributeNode(aType);
	var onclickInput = document.createAttribute("onClick");
	onclickInput.value = `invertirProyecto("${ctaPromotor}", "${ctaProyecto}")`;
	newButton.setAttributeNode(onclickInput);	
	var textoButon = document.createTextNode("Invertir");
	newButton.appendChild(textoButon); //añade texto al boton.
	newDiv.appendChild(newButton);

	// caja texto	
	var newCajaTexto = document.createElement("input"); 
	var aId = document.createAttribute("id");
	aId.value = ctaProyecto;
	newCajaTexto.setAttributeNode(aId);
	var aType = document.createAttribute("type");
	aType.value = "text";
	newCajaTexto.setAttributeNode(aType);
	newDiv.appendChild(newCajaTexto);

	// añade el elemento creado y su contenido al DOM 
	//var currentDiv = document.getElementById(ctaPromotor); 
	//document.getElementById(ctaProyecto).appendChild(newInput)
	document.getElementById(ctaPromotor).appendChild(newDiv);

	//document.body.insertBefore(newDiv, currentDiv); 
  }

  function plantillaProyectosDelInversor(nbProyecto, tokenGoalProyecto, rentabilidad, estadoProyecto, fechaInicioFinanciacion, fechaFinFinanciacion, tokenInvertidos) {

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
			</br>
			Token invertidos: ${tokenInvertidos}
		</div>`;

	document.getElementById("msgConsultaInversor").innerHTML += plantilla;
	
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
