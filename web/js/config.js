//Configuracion entornos
let ENVIRONMENT = 'ALASTRIA';

let ganache_ENVIRONMENT = 
	[
	"common.js", 
	"plataformaInverABI.js", 
	"logic-environments/logic-Ganache.js?v=" + Date.now(),
	"housefunding.js"
	];

let local_Alastria_ENVIRONMENT = 
	[
	"common.js", 
	"plataformaInverABI.js", 
	"logic-environments/logic-Local-Alastria.js?v=" + Date.now(),
	"housefunding.js"
	];

let alastria_ENVIRONMENT = 
	[
	"common.js", 
	"plataformaInverABI.js",
	"logic-environments/logic-Alastria.js?v=" + Date.now(),
	"housefunding.js"
	];

function importarJs(envType, environmentJs) {
	
	var parentScript = document.getElementById('configJs');
	parentScript = parentScript.src;
	parentScript = parentScript.split('/');
	parentScript.pop();
	parentScript = parentScript.join();
	parentScript = parentScript.replace(/,/gi, '/');
 
	for (let pathJs of environmentJs) {

		console.log(pathJs);
		var script = document.createElement('script');		
		script.src = parentScript + "/" +pathJs;
		document.body.appendChild(script);		
	}  	

	ENVIRONMENT = envType;
}


function importarWeb3() {
	
	var script = document.createElement('script');		
	script.src = "https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.35/dist/web3.min.js"
	document.body.appendChild(script);			   
}


importarJs('GANACHE', ganache_ENVIRONMENT);
//importarJs('LOCAL_ALASTRIA', local_Alastria_ENVIRONMENT);
//importarJs('ALASTRIA', alastria_ENVIRONMENT);

