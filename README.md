# Alastria-HouseFunding-TFE
Aplicación descentralizada para la financiación de proyectos utilizando tecnología Blockchain.

Inicialización:

1 - Se despliega PlataformaPromoInver con la accounts[0]
	- Se transfiere 1000000000 VAT a la dirección PlataformaPromoInver

2 - PlataformaPromoInver crea el primer promotor accounts[1] con capacidad de totalSupply/10 (maximo 10 promotores)

3 - El promotor accounst[1] crea el primer proyecto (P1) inmobiliario accounts[2] 

4 - El promotor accounst[1] crea el segundo proyecto (P2) inmobiliario accounts[3]

5 - Un inversor I1 accounts[4] se registra en la plataforma 

	5.1 - El inversor I1 compra tokens a PlataformaPromoInver: balanceOf del inversor se incrementa y se resta del totalSupply (Exchange). Método tranferirTokensParaInversor.
	5.2 - El inversor I1 invierte 1000 VAT en P1 (invertirProyecto).
	5.3 - El inversor I1 invierto 5000 VAT en P2 (invertirProyecto).
	5.4 - LLega el último inversor de un proyecto y alcance el tokensGoal (proyecto EN_PROGRESO).

6 - El promotor transfiere tokens del proyecto a su cuenta.

7 - El promotor transfiere tokens de plataforma a su cuenta para pagar intereses.

8 - Finalizar proyecto.

# Despliegue del proyecto en local

truffle migrate --reset --all --network ganache

# Ejecucion de test

truffle test

	  



