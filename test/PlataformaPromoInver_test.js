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

	    //Se obtiene el total supply antes de hacer transfrencia
	    const totalSupply = await this.plataformaPromoInver.totalSupply();

		//Se realiza transferencia de tokens a inversor
	    await this.plataformaPromoInver.tranferirTokensParaInversor(cuentaInversor, tokensInversor, { from: currentOwner, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
				
				assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });


        assert.equal(await this.plataformaPromoInver.balanceOf(cuentaInversor), tokensInversor);
		assert.equal(await this.plataformaPromoInver.balanceOf(currentOwner), totalSupply - tokensInversor);

    });


});

