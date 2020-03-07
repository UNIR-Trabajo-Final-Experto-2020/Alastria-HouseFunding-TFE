const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {
    console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
  it('Abandonar Proyecto por Inversor', async function () {

    const tokensGoal = 1000;
    const tokensInversor = 200;
    const cuentaPromotor = accounts[1];
    const cuentaProyecto = accounts[2];
    const cuentaInversor = accounts[3];
    const currentOwner = await this.plataformaPromoInver.currentOwner();

   await this.plataformaPromoInver.registrarPromotor("Promotor 90", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
        });

    await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto 90", 0, 0, 0, 0, tokensGoal, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
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

    // Inversor invierte en proyecto              
    await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, cuentaProyecto, 150, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "Transfer"); 
            assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
    }); 
    
    // Tiene proyecto despues de invertir
    const proyectosPorInversorAntesDeAbandonar = await this.plataformaPromoInver.listarProyectosInversor(cuentaInversor);
    console.log("proyectosPorInversorAntesDeAbandonar: " + proyectosPorInversorAntesDeAbandonar);   
    assert.notEqual(proyectosPorInversorAntesDeAbandonar[0], 0); 

    // token que le quedan al inversor en su cuenta despues de invertir
    const tokensInversorDespuesDeInvertir = await this.plataformaPromoInver.balanceOf(cuentaInversor);
    console.log("tokensInversorDespuesDeInvertir:"  + tokensInversorDespuesDeInvertir);
    assert.equal(tokensInversorDespuesDeInvertir, 50); 

    //Token proyecto despues de que un inversor haga una inversión
    const tokensProyectoDespuesDeInvertir = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
    console.log("tokensProyectoDespuesDeInvertir:"  + tokensProyectoDespuesDeInvertir);  
    assert.equal(tokensProyectoDespuesDeInvertir, 150); 

    //Conculta tokens del inversor
    const tokensPorInversor =
        await this.plataformaPromoInver.listarTokensPorProyectosPorInversor(cuentaProyecto, cuentaInversor, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
        }); 

    console.log("listarTokensPorProyectosPorInversor:"  + tokensPorInversor);
    assert.equal(tokensPorInversor, 150); 

    //Se realiza transferencia de proyecto a inversor    
    await this.plataformaPromoInver.abandonarProyecto(cuentaPromotor, cuentaProyecto, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
        
        assert.equal(receipt.logs[0].event, "Approval");  
        assert.equal(receipt.logs[1].event, "Transfer");  
        assert.equal(receipt.logs[2].event, "Approval"); 
        assert.equal(receipt.logs[3].event, "TokensTransferidos"); 
                
    });

    const tokensProyectoDespuesDeAbandonarInversor = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
    console.log("tokensProyectoDespuesDeAbandonarInversor: "  + tokensProyectoDespuesDeAbandonarInversor);
    assert.equal(tokensProyectoDespuesDeAbandonarInversor, 0); 
    
    const tokensInversorDespuesDeAbandonar = await this.plataformaPromoInver.balanceOf(cuentaInversor);
    console.log("tokensInversorDespuesDeAbandonar: "  + tokensInversorDespuesDeAbandonar);
    assert.equal(tokensProyectoDespuesDeAbandonarInversor, 0); 
       
    const proyectosPorInversorDespuesDeAbandonar = await this.plataformaPromoInver.listarProyectosInversor(cuentaInversor);
    console.log("proyectosPorInversorDespuesDeAbandonar: " + proyectosPorInversorDespuesDeAbandonar);   
    assert.equal(proyectosPorInversorDespuesDeAbandonar[0], 0);  

    });
    


});

