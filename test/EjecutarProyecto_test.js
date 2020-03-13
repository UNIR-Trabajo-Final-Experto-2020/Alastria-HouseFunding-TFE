const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {
    //console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
  it('Ejecutar Proyecto por Promotor', async function () {

    const tokensGoal = 200;
    const tokensInversor = 200;
    const cuentaPromotor = accounts[1];
    const idProyecto = web3.utils.keccak256(cuentaPromotor);
    const cuentaInversor = accounts[2];
    const currentOwner = await this.plataformaPromoInver.currentOwner();

    // Registramos promotor 
   await this.plataformaPromoInver.registrarPromotor("Promotor 90", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
        });

    
    await this.plataformaPromoInver.registrarProyecto(idProyecto, "Proyecto 90", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"), tokensGoal, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
        }); 

    //Se obtiene token del proyecto
    const tokensDespuesDeRegistrarProyecto = await this.plataformaPromoInver.consultarTokensInvertidosEnProyecto(idProyecto);
    //console.log("tokensDespuesDeRegistrarProyecto:"  + tokensDespuesDeRegistrarProyecto); 
    assert.equal(tokensDespuesDeRegistrarProyecto, 0);        

    await this.plataformaPromoInver.registrarInversor("Inversor-90", "B123855", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "InversorRegistrado");            
        });

    //Se realiza transferencia de tokens a inversor
    await this.plataformaPromoInver.transferirTokensParaInversor(cuentaInversor, tokensInversor, { from: currentOwner, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
        
            assert.equal(receipt.logs[0].event, "Transfer");  
            assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });

    const tokensInversorAntesDeInvertir = await this.plataformaPromoInver.balanceOf(cuentaInversor);
    //console.log("tokensInversorAntesDeInvertir:"  + tokensInversorAntesDeInvertir);
    assert.equal(tokensInversorAntesDeInvertir, 200);  

    // Inversor invierte en proyecto numero de token igual a token goal (200)             
    await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, idProyecto, 200, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            //console.log(JSON.stringify(receipt, null, 2));
            assert.equal(receipt.logs[0].event, "Transfer");             
            assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
    }); 

    // Promotor ejecuta proyecto         
    await this.plataformaPromoInver.ejecutarProyecto(idProyecto, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            //console.log(JSON.stringify(receipt, null, 2));
            assert.equal(receipt.logs[0].event, "ProyectoEjecutado");             
    }); 

     // Consultamos proyecto para verificar que el proyecto está en estado EN_PROGRESO            
     const proyectoDespuesDeAlcanzarTokeGoal  = await this.plataformaPromoInver.consultarProyecto(idProyecto, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 });     
     assert.equal(proyectoDespuesDeAlcanzarTokeGoal.estadoProyecto, 2);      
       
    const tokensProoyectoDespuesDeEjecutar = await this.plataformaPromoInver.consultarTokensInvertidosEnProyecto(idProyecto);
    //console.log("tokensProoyectoDespuesDeEjecutar:"  + tokensProoyectoDespuesDeEjecutar);
    assert.equal(tokensProoyectoDespuesDeEjecutar, 0);      

    const tokenPromotorDespuesDeEjecutar =  await this.plataformaPromoInver.balanceOf(cuentaPromotor);
    //console.log("tokenPromotorDespuesDeEjecutar:"  + tokenPromotorDespuesDeEjecutar);
    assert.equal(tokenPromotorDespuesDeEjecutar, 200);      

    });
    


});

