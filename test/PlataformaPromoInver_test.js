const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('PlataformaPromoInver', function (accounts) {
    console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
    it('Registar Promotor valido', async function () {
		
        console.log(accounts[0]);

        const cuentaPromotor = accounts[0];

       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

    });
    
    it('Registar Promotor capacidad invalida', async function () {
		
        console.log(accounts[1]);

        const cuentaPromotor = accounts[1];
        try{
       		await this.plataformaPromoInver.registrarPromotor("Promotor 32", "B123019", 1000000001, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 });
  		} catch (error ) {
  			console.log("Error: " + error.message);
  			return;
  		}
     	assert.fail('Expected throw not received');

    });
    

   it('Transferir tokens a inversor', async function () {
		        
   		//Es el accounts[0]
		const currentOwner = await this.plataformaPromoInver.currentOwner();
		console.log("currentOwner: " + currentOwner);

        const cuentaInversor = accounts[2];
		console.log("Cuenta inversor:"  + cuentaInversor);

		const tokensInversor = 10000;
		//Se crea inversor
       	await this.plataformaPromoInver.registrarInversor("Cooperativa Inversores 2020", "B123456", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
        });

	    //Se obtiene el total supply antes de hacer transferencia
	    const totalSupply = await this.plataformaPromoInver.totalSupply();

		//Se realiza transferencia de tokens a inversor
	    await this.plataformaPromoInver.transferirTokensParaInversor(cuentaInversor, tokensInversor, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
				
				assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });


        assert.equal(await this.plataformaPromoInver.balanceOf(cuentaInversor), tokensInversor);
		assert.equal(await this.plataformaPromoInver.balanceOf(currentOwner), totalSupply - tokensInversor);

    });


   
	it('Transferir tokens a promotor (intereses)', async function () {
		        
   		//Es el accounts[0]
		const currentOwner = await this.plataformaPromoInver.currentOwner();
		console.log("currentOwner: " + currentOwner);

        const cuentaPromotor = accounts[1];
		console.log("Cuenta promotor:"  + cuentaPromotor);

		const tokensPromotor = 500000;

		//Se crea promotor
       	await this.plataformaPromoInver.registrarPromotor("Promotores 2020", "B778899", 1000000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
        });

	    //Se obtiene el total supply antes de hacer transferencia
	    const totalSupply = await this.plataformaPromoInver.totalSupply();

		//Se realiza transferencia de tokens a promotor
	    await this.plataformaPromoInver.transferirTokensParaPromotor(cuentaPromotor, tokensPromotor, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
				
				assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });


        assert.equal(await this.plataformaPromoInver.balanceOf(cuentaPromotor), tokensPromotor);
		assert.equal(await this.plataformaPromoInver.balanceOf(currentOwner), totalSupply - tokensPromotor);

    });


    

	it('Transferir tokens de proyecto a promotor', async function () {

		const tokensGoal = 200;
        const cuentaPromotor = accounts[1];
        const cuentaProyecto = accounts[2];
		const currentOwner = await this.plataformaPromoInver.currentOwner();

       await this.plataformaPromoInver.registrarPromotor("Promotor 10", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto 10", 0, 0, tokensGoal, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            }); 

        //TODO Invertir en proyecto: lo simulamos con un transfer
         await this.plataformaPromoInver.transfer(cuentaProyecto, tokensGoal, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "Transfer");            
            });  

        //TODO Promotor ejecuta proyecto: promotorEjecutaProyecto
 		
 		//Se obtiene el total del promotor y proyecot
 		const tokensProyecto = await this.plataformaPromoInver.balanceOf(cuentaProyecto);
 		console.log("tokensProyecto:"  + tokensProyecto);
 		
 		const tokensPromotor = await this.plataformaPromoInver.balanceOf(cuentaPromotor);
		console.log("tokensPromotor:"  + tokensPromotor);

	    //Se obtiene el total supply antes de hacer transferencia
	    const totalSupply = await this.plataformaPromoInver.totalSupply();

	    //const approved = await this.plataformaPromoInver.aprobarTokensProyectoAPromotor(cuentaProyecto);
	    //console.log("approved:"  + approved);


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

