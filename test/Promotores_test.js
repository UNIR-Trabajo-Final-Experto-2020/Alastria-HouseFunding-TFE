const Promotores = artifacts.require("Promotores");

contract('Promotores', function (accounts) {
    console.log(accounts);
    
    beforeEach(async function () {
        this.promotores = await Promotores.new();
    });
    
    it('Registrar un proyecto', async function () {
        
        console.log(accounts[0]);

        const cuentaPromotor = accounts[0];
        const cuentaProyecto = accounts[1];

       await this.promotores.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        await this.promotores.registrarProyecto(cuentaProyecto, "Proyecto 1", 0, 0, 200, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            });            
    });
    
    
});

