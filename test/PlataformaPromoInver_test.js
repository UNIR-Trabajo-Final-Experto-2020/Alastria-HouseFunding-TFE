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
		
        console.log(accounts[0]);

        const cuentaPromotor = accounts[0];
        try{
       		await this.plataformaPromoInver.registrarPromotor("Promotor 32", "B123019", 1000000001, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 });
  		} catch (error ) {
  			console.log("Error: " + error.message);
  			return;
  		}
     	assert.fail('Expected throw not received');

    });

});

