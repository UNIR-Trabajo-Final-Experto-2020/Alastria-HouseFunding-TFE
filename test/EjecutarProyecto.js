const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {
    console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
  it('Finalizar Proyecto por Promotor', async function () {

    const tokensGoal = 200;
    const tokensInversor = 200;
    const cuentaPromotor = accounts[1];
    const cuentaProyecto = accounts[2];
    const cuentaInversor = accounts[3];
    const currentOwner = await this.plataformaPromoInver.currentOwner();

    // Registramos promotor 
   await this.plataformaPromoInver.registrarPromotor("Promotor 90", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
        });

    // Registramos proyecto
    // fechaInicioFinanciacion: 2020-06-01 --> 1590969600000 
    // fechaFinFinanciacion: 2020-07-01 --> 1593561600000
    // fechaInicioEjecucion: 2020-08-01 --> 1596240000000
    // fechaFinEjecucion: 2020-09-01 --> 1598918400000
    await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto 90", 1590969600000, 1593561600000, 1596240000000, 1598918400000, tokensGoal, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
        }); 

    //Se obtiene token del proyecto
    const tokensDespuesDeRegistrarProyecto = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
    console.log("tokensDespuesDeRegistrarProyecto:"  + tokensDespuesDeRegistrarProyecto); 
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
    console.log("tokensInversorAntesDeInvertir:"  + tokensInversorAntesDeInvertir);
    assert.equal(tokensInversorAntesDeInvertir, 200);  

    // Inversor invierte en proyecto numero de token igual a token goal (200)             
    await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, cuentaProyecto, 200, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            console.log(JSON.stringify(receipt, null, 2));
            assert.equal(receipt.logs[0].event, "Transfer");             
            assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
            assert.equal(receipt.logs[2].event, "Transfer"); 
    }); 

     // Consultamos proyecto para verificar que el proyecto está en estado EN_PROGRESO            
     const proyectoDespuesDeAlcanzarTokeGoal  = await this.plataformaPromoInver.consultarProyecto(cuentaProyecto, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 });     
     assert.equal(proyectoDespuesDeAlcanzarTokeGoal.estadoProyecto, 2);      
     //console.log(JSON.stringify(proyectoDespuesDeAlcanzarTokeGoal, null, 2));
       
    const tokensProoyectoDespuesDeEjecutar = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
    console.log("tokensProoyectoDespuesDeEjecutar:"  + tokensProoyectoDespuesDeEjecutar);
    assert.equal(tokensProoyectoDespuesDeEjecutar, 0);      

    const tokenPromotorDespuesDeEjecutar =  await this.plataformaPromoInver.balanceOf(cuentaPromotor);
    console.log("tokenPromotorDespuesDeEjecutar:"  + tokenPromotorDespuesDeEjecutar);
    assert.equal(tokenPromotorDespuesDeEjecutar, 200);      

    });
    


});

