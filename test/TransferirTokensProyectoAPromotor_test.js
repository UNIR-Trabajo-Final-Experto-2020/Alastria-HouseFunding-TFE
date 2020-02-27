const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {

    console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    

	it('Transferir tokens de proyecto a promotor', async function () {

		const tokensGoal = 200;
		const tokensInversor = 200;
        const cuentaPromotor = accounts[1];
        const cuentaProyecto = accounts[2];
        const cuentaInversor = accounts[3];
		const currentOwner = await this.plataformaPromoInver.currentOwner();

       await this.plataformaPromoInver.registrarPromotor("Promotor 10", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto 10", 0, 0, tokensGoal, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            }); 

       	await this.plataformaPromoInver.registrarInversor("Inversor-100", "B123855", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
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

                //console.log(JSON.stringify(receipt, null, 2));

                assert.equal(receipt.logs[0].event, "Transfer"); 
                assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
        }); 

        //Promotor ejecuta proyecto: promotorEjecutaProyecto
        //Fecha inicio la actual y fecha fin en un anyo
        let currentDate = new Date();
		let fechaInicioEjecucion = Math.trunc(currentDate.getTime()/1000);

		currentDate.setDate(currentDate.getDate() + 365);
		let fechaFinEjecucion = Math.trunc(currentDate.getTime()/1000);

		console.log("Fecha inicio ejecucion: " + new Date(fechaInicioEjecucion*1000));
		console.log("Fecha fin ejecucion: " + new Date(fechaFinEjecucion*1000));

        await this.plataformaPromoInver.promotorEjecutaProyecto(cuentaProyecto, fechaInicioEjecucion, fechaFinEjecucion, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "ProyectoEnEjecucion"); 
        }); 


 		//Se obtiene el total del promotor y proyecto
 		const tokensProyecto = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
 		console.log("tokensProyecto:"  + tokensProyecto);
 		
 		const tokensPromotor = await this.plataformaPromoInver.balanceOf(cuentaPromotor);
		console.log("tokensPromotor:"  + tokensPromotor);

	    //Se obtiene el total supply antes de hacer transferencia
	    const totalSupply = await this.plataformaPromoInver.totalSupply();

		//Se realiza transferencia de tokens a promotor	    
	    await this.plataformaPromoInver.transferirTokensProyectoAPromotor(cuentaProyecto, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
				
				assert.equal(receipt.logs[0].event, "Approval");  
				assert.equal(receipt.logs[1].event, "Transfer");  
                assert.equal(receipt.logs[2].event, "Approval"); 
                assert.equal(receipt.logs[3].event, "TokensTransferidos");          
        });
		

		const tokensProyecto2 = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
 		console.log("tokensProyecto despues:"  + tokensProyecto2);
 		
 		const tokensPromotor2 = await this.plataformaPromoInver.balanceOf(cuentaPromotor);
		console.log("tokensPromotor despues:"  + tokensPromotor2);
        
        assert.equal(tokensPromotor2, 200);
		assert.equal(tokensProyecto2, 0);

    });

});

