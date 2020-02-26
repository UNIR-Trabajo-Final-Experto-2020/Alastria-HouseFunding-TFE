const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('Promotores', function (accounts) {
        
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
    it('Inversor invierte en proyecto', async function () {
        
        console.log(accounts);

        const cuentaPromotor = accounts[0];
        const cuentaProyecto = accounts[1];
        const cuentaInversor = accounts[2];

        // Creamos promotor
       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        // Creamos proyecto
        await this.plataformaPromoInver.registrarProyecto(cuentaProyecto, "Proyecto 1", 0, 0, 200, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                console.log(JSON.stringify(receipt, null, 2));
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            });    
            
        // Creamos inversor        
       	await this.plataformaPromoInver.registrarInversor("Inversor 1", "B123888", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
            });  
            
        // Inversor invierte en proyecto              
        await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, cuentaProyecto, 100, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                console.log(JSON.stringify(receipt, null, 2));

                assert.equal(receipt.logs[0].event, "TokensInvertidosProyecto");                  
            }); 
          
        
    });

    
    
});

