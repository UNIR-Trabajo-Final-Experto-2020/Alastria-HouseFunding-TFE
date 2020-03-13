const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('Promotores', function (accounts) {
    //console.log(accounts);
    
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();
    });
    
    it('Registrar un proyecto', async function () {
        
        //console.log(accounts[0]);

        const cuentaPromotor = accounts[0];
        const idProyecto = web3.utils.keccak256(cuentaPromotor);

       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        await this.plataformaPromoInver.registrarProyecto(idProyecto, "Proyecto 1", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"), 200, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            });            
    });

    it('Registrar un proyecto con tokenGoal superior a capacidad promotor', async function () {
        
        //console.log(accounts[0]);

        const cuentaPromotor = accounts[0];
        const idProyecto = web3.utils.keccak256(cuentaPromotor);

       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        try {
            await this.plataformaPromoInver.registrarProyecto(idProyecto, "Proyecto 1", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"), 20000, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
                .on('receipt', function(receipt){
                    
                    assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
                });   
        } catch (error) {
            //console.log("Error proyecto: " + error.message);
            return;
        }

        assert.fail('Proyectos: Expected throw not received');
          
    });

    it('Registrar promotor registrar proyecto al promotor y consultar promotor con su proyecto', async function () {
        
        //console.log(accounts[0]);

        const cuentaPromotor = accounts[0];
        const idProyecto = web3.utils.keccak256(cuentaPromotor);

       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

       
        await this.plataformaPromoInver.registrarProyecto(idProyecto, "Proyecto 1", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"), 100, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                //console.log(JSON.stringify(receipt, null, 2));
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            });   
       
        result = await this.plataformaPromoInver.consultarPromotor(cuentaPromotor, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 });     
                
        //console.log(JSON.stringify(result, null, 2));
        assert.equal(result.nombre, "Promotor 1"); 
        assert.equal(result.cif, "B123012"); 
        assert.equal(result.listadoProyectos[0], idProyecto); 
                  
    });
    
    
});

