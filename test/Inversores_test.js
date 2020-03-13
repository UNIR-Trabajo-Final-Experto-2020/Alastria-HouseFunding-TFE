const Inversores = artifacts.require("Inversores");

contract('Inversores', function (accounts) {
    //console.log(accounts);
    
    beforeEach(async function () {
        this.inversores = await Inversores.new();
    });
    
    it('Registar Inversor valido', async function () {
		
        //console.log(accounts[0]);

        const cuentaInversor = accounts[0];

       	await this.inversores.registrarInversor("Inversor 1", "B123888", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
            });

    });
    
    it('Registar Inversor sin nombre', async function () {
		
        //console.log(accounts[1]);

        const cuentaInversor = accounts[1];

        try {
       		await this.inversores.registrarInversor("", "B123839", { from: cuentaInversor, gasPrice: 1, gas: 3000000 });
       	} catch (error) {
			//console.log("Error inversores: " + error.message);
  			return;
       	}
		assert.fail('Inversores: Expected throw not received');
    });
    
});

