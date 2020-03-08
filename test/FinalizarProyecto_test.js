const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {

    console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    

	it('Finalizar Proyecto', async function () {

		const tokensGoal = 100;
		const rentabilidad = 10; 
        const tokensInversor1 = 40;
        const tokensInversor2 = 60;

        const cuentaPromotor = accounts[1];
        const cuentaProyecto = accounts[2];
        const cuentaInversor1 = accounts[3];
        const cuentaInversor2 = accounts[4];

		const currentOwner = await this.plataformaPromoInver.currentOwner();

        //--------Registro de Promotor y Proyecto----------
       await this.plataformaPromoInver.registrarPromotor("Promotor-A", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto-A", 0, 0, 0, 0, tokensGoal, rentabilidad, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            }); 

        //--------Inversor 1----------
       	await this.plataformaPromoInver.registrarInversor("Inversor-1", "B00001", { from: cuentaInversor1, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
            });

		//Se realiza transferencia de tokens a inversor
	    await this.plataformaPromoInver.transferirTokensParaInversor(cuentaInversor1, tokensInversor1, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
				
				assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });


        // Inversor invierte en proyecto              
        await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, cuentaProyecto, tokensInversor1, { from: cuentaInversor1, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "Transfer"); 
                assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
        }); 

        //--------Inversor 2---------
        await this.plataformaPromoInver.registrarInversor("Inversor-2", "B00001", { from: cuentaInversor2, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
            });

        //Se realiza transferencia de tokens a inversor
        await this.plataformaPromoInver.transferirTokensParaInversor(cuentaInversor2, tokensInversor2, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
                assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });


        // Inversor invierte en proyecto              
        await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, cuentaProyecto, tokensInversor2, { from: cuentaInversor2, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "Transfer");             
                assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                
                assert.equal(receipt.logs[2].event, "Transfer");            
        }); 

        //Promotor ejecuta proyecto: promotorEjecutaProyecto
        //Fecha inicio la actual y fecha fin en un anyo        

		let tokensProyecto2 = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
 		console.log("tokensProyecto despues:"  + tokensProyecto2);
 		assert.equal(tokensProyecto2, 0);

 		let tokensPromotor2 = await this.plataformaPromoInver.balanceOf(cuentaPromotor);
		console.log("tokensPromotor despues:"  + tokensPromotor2);
        assert.equal(tokensPromotor2, tokensGoal);

        //Transferimos tokens necesearios a promotor para repartir ganancias
        //Se realiza transferencia de tokens a promotor
        let tokensPromotorIntereses = (tokensGoal * rentabilidad) / 100;
        await this.plataformaPromoInver.transferirTokensParaPromotor(cuentaPromotor, tokensPromotorIntereses, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
                assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensEmitidos");    
                console.log("Se transfieren " + tokensPromotorIntereses + " tokens para intereses a promotor");      
        });        
		

        //Se invoca a FinalizarProyecto
        await this.plataformaPromoInver.finalizarProyecto(cuentaProyecto, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "ProyectoFinalizado");  
                assert.equal(receipt.logs[1].event, "Transfer");  
                assert.equal(receipt.logs[2].event, "Transfer");  
                assert.equal(receipt.logs[3].event, "ProyectoFinalizadoConTransferencias"); 
                console.log("Transferencias realizadas a inversores");         
        }); 
        
        let tokensPromotorFinalizado = await this.plataformaPromoInver.balanceOf(cuentaPromotor);
        assert.equal(0, tokensPromotorFinalizado);

        let tokensInversor1Fin = await this.plataformaPromoInver.balanceOf(cuentaInversor1);
        assert.equal(tokensInversor1 + ((tokensInversor1 * rentabilidad)/100) ,tokensInversor1Fin);

        let tokensInversor2Fin = await this.plataformaPromoInver.balanceOf(cuentaInversor2);
        assert.equal(tokensInversor2 + ((tokensInversor2 * rentabilidad)/100) ,tokensInversor2Fin);

    });

});

