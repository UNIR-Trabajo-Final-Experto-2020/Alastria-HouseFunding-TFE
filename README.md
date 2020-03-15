# HouseFunding: Financiación de proyectos inmobiliarios

Aplicación descentralizada para la financiación de proyectos immobiliarios utilizando tecnología Blockchain.

Inicialización y funcionamiento básico:

1 - Se despliega PlataformaPromoInver con la accounts[0]
	- Se transfiere 1000000000 VAT a la dirección PlataformaPromoInver

2 - PlataformaPromoInver crea el primer promotor accounts[1] con capacidad de totalSupply/10 (maximo 10 promotores)

3 - El promotor accounst[1] crea el primer proyecto (P1) inmobiliario accounts[2] 

4 - El promotor accounst[1] crea el segundo proyecto (P2) inmobiliario accounts[3]

5 - Un inversor I1 accounts[4] se registra en la plataforma 

	5.1 - El inversor I1 compra tokens a PlataformaPromoInver: balanceOf del inversor se incrementa y se resta del totalSupply (Exchange). Método tranferirTokensParaInversor.
	5.2 - El inversor I1 invierte 1000 VAT en P1 (invertirProyecto).
	5.3 - El inversor I1 invierto 5000 VAT en P2 (invertirProyecto).
	5.4 - LLega el último inversor de un proyecto y alcance el tokensGoal

6 - El promotor ejecuta el proyecto (EN_EJECUCION)

7 - El promotor transfiere tokens de plataforma a su cuenta para pagar intereses.

8 - El promotor finaliza el proyecto: se transfieren tokens con intereses a inversores.

## Requisitos previos 

Instalación de Ganache para el entorno local.

https://www.trufflesuite.com/ganache

A continuación es necesario crear un nuevo Workspace y seleccionar el truffle-config.js que ya tiene configurado el entorno ganache local.

## Despliegue del proyecto Ganache local

truffle migrate --reset --all --network ganache

## Despliegue del proyecto Alastria local

truffle migrate --reset --all --network alastriaLocal

## Despliegue del proyecto en Alastria (nodo Unir)

truffle migrate --reset --all --network alastriaTelsius

## Ejecucion de test

truffle test

## Regeneración de ABI
Si se modifica la interfaz de los SmartContract es necesario generar el ABI con este comando:

truffle-export-abi -d ./build/contracts/ -o ./build/abi.json -v

y copiar el contenido del abi.json al fichero plataformaInverABI.js

- Instalación de truffle-export-abi:

https://github.com/maxme/truffle-export-abi

## Configuración del address del contrato PlataformaPromoInver.sol desplegado:

Se debe establecer el address en la variable contratoPromoInver de la función start del fichero:

- logic-Ganache.js: Si se desea probar con un testnet local con Ganache.
- logic-Local-Alastria.js: Si se desea probar con un nodo local de Alastria.
- logic-Alastria.js: Si se desea probar en la red Telsius de Alastria (necesario estar dentro de la red de Alastria).


## Configuración de entorno: config.js

El entorno sobre el que se desee arrancar la DAPP se configura en el fichero config.js. Dejar solamente la línea del entorno que se desee utilizar:

importarJs('GANACHE', ganache_ENVIRONMENT);

//importarJs('LOCAL_ALASTRIA', local_Alastria_ENVIRONMENT);

//importarJs('ALASTRIA', alastria_ENVIRONMENT);

## Configuración del address del SC: PlataformaPromoInver

Una vez desplegado el SC mediante truffle, copiar el address donde se ha desplegado el SC y dependiendo del entorno modificarlo de la siguiente forma:

- Ganache: abrir ficher logic-Ganache.js y establecer el address en la funcion start, en la variable contratoPromoInver.

- Alastria Local: abrir ficher logic-Local-Alastria.js y establecer el address en la funcion start, en la variable contratoPromoInver.

- Alastria (Telsius): abrir ficher logic-Alastria.js y establecer el address en la funcion start, en la variable contratoPromoInver.

## Iniciar aplicación web

Para iniciar la aplicación web es necesario un servidor web. Se puede utilizar por ejemplo un servidor web de python desde línea de comandos (nos situamos en la carpeta /web):

python -m SimpleHTTPServer 8000

A continuación desde un explorador accedemos a la siguietne ul:

http://localhost:8000/index.html





