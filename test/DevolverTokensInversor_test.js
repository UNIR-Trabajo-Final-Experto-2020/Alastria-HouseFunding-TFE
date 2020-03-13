const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {
    //console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
  it('Devolver tokens del promotor al Inversor', async function () {

    const tokensGoal = 1000;
    const tokensInversor = 200;
    const cuentaPromotor = accounts[1];
    const idProyecto = web3.utils.keccak256(cuentaPromotor);
    const cuentaInversor = accounts[2];

    const currentOwner = await this.plataformaPromoInver.currentOwner();

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

    // Inversor invierte en proyecto              
    await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, idProyecto, 150, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "Transfer"); 
            assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
    }); 
    
   
     //Se ejecuta la transferencia de tokens a Inversoer
    await this.plataformaPromoInver.devolverTokensInversor(cuentaInversor, idProyecto, 150, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
        
                assert.equal(receipt.logs[0].event, "ProyectoInversorBorrado");  
                assert.equal(receipt.logs[1].event, "Transfer");  
                assert.equal(receipt.logs[2].event, "TokensDevueltosInversor");  
                
    });
   

   
    const tokensProyectoDespuesDeAbandonarInversor = await this.plataformaPromoInver.consultarTokensInvertidosEnProyecto(idProyecto);
    //console.log("tokensProyectoDespuesDeAbandonarInversor: "  + tokensProyectoDespuesDeAbandonarInversor);
    assert.equal(tokensProyectoDespuesDeAbandonarInversor, 0); 
    
    const tokensInversorDespuesDeAbandonar = await this.plataformaPromoInver.balanceOf(cuentaInversor);
    //console.log("tokensInversorDespuesDeAbandonar: "  + tokensInversorDespuesDeAbandonar);
    assert.equal(tokensProyectoDespuesDeAbandonarInversor, 0); 
       
    const proyectosPorInversorDespuesDeAbandonar = await this.plataformaPromoInver.listarProyectosInversor(cuentaInversor);
    //console.log("proyectosPorInversorDespuesDeAbandonar: " + proyectosPorInversorDespuesDeAbandonar);   
    assert.equal(proyectosPorInversorDespuesDeAbandonar[0], 0);  

    });
    


});

