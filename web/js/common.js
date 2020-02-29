alert("hola");
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


 
