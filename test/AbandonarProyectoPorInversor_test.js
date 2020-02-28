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

    await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto 90", 0, 0, tokensGoal, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
        }); 

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


    // Inversor invierte en proyecto              
    await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, cuentaProyecto, tokensInversor, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){

            assert.equal(receipt.logs[0].event, "Transfer"); 
            assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
    }); 

 


    //Se obtiene el total del promotor y proyecto
    const tokensProyecto = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
    console.log("tokensProyecto:"  + tokensProyecto);
    

    const tokensInversorAntesAbandono = await this.plataformaPromoInver.balanceOf(cuentaInversor);
    console.log("tokensInversorAntesAbandono:"  + tokensInversorAntesAbandono);

    //Conculta tokens del inversor
    const tokensPorInversor =
    await this.plataformaPromoInver.listarTokensPorProyectosPorInversor(cuentaProyecto, cuentaInversor, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
               
    }); 

    console.log("listarTokensPorProyectosPorInversor:"  + tokensPorInversor);

    //Se realiza transferencia de proyecto a inversor    
    await this.plataformaPromoInver.abandonarProyecto(cuentaPromotor, cuentaProyecto, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
        
        assert.equal(receipt.logs[0].event, "Approval");  
        assert.equal(receipt.logs[1].event, "Transfer");  
        assert.equal(receipt.logs[2].event, "Approval"); 
        assert.equal(receipt.logs[3].event, "TokensTransferidos"); 
                
    });


      const tokensProyecto2 = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
      console.log("tokensProyecto despues:"  + tokensProyecto2);
    
      const tokensInversor2 = await this.plataformaPromoInver.balanceOf(cuentaInversor);
      console.log("tokensInversor despues:"  + tokensInversor2);
      
      assert.equal(tokensInversor2, 200);
      assert.equal(tokensProyecto2, 0);

    });
    


});

