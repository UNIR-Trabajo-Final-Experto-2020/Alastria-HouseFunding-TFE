const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

contract('Promotores', function (accounts) {
        
    beforeEach(async function () {
        this.plataformaPromoInver = await PlataformaPromoInver.new();        		
    });
    
    it('Inversor invierte en proyecto', async function () {
        
        //console.log(accounts);

        const currentOwner = await this.plataformaPromoInver.currentOwner();
        const cuentaPromotor = accounts[1];
        const idProyecto = web3.utils.keccak256(cuentaPromotor);
        const cuentaInversor = accounts[2];

        // Creamos promotor
       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        // Creamos proyecto
        await this.plataformaPromoInver.registrarProyecto(idProyecto, "Proyecto 1", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"),200, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            });    
            
        // Creamos inversor        
       	await this.plataformaPromoInver.registrarInversor("Inversor 1", "B123888", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
            });  
        
        // Emitimos tokens al inversor    
        await this.plataformaPromoInver.transferirTokensParaInversor(cuentaInversor, 150, { from: currentOwner, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            
            assert.equal(receipt.logs[0].event, "Transfer");  
            assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });   

        // Inversor invierte en proyecto              
        await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, idProyecto, 100, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                //console.log(JSON.stringify(receipt, null, 2));
                
                assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                                
            }); 
        
            

        // Consultamos los token invertidos en el proyecto
        result = await this.plataformaPromoInver.tokensInvertidosEnProyecto(idProyecto, { from: cuentaInversor, gasPrice: 1, gas: 3000000 });
        
        assert.equal(result.tokensInversor, 100);               
 		//console.log("tokensInvertidosEnProyecto:"  + result);
        
 		const tokensProyecto = await this.plataformaPromoInver.consultarTokensInvertidosEnProyecto(idProyecto);
 		//console.log("tokensProyecto:"  + tokensProyecto);
 		
 		const tokensInversor = await this.plataformaPromoInver.balanceOf(cuentaInversor);
		//console.log("tokensInversor:"  + tokensInversor);
           
        
    });

    it('Inversor invierte en 2 proyectos', async function () {
        
        //console.log(accounts);

        const currentOwner = await this.plataformaPromoInver.currentOwner();
        const cuentaPromotor = accounts[1];
        //const idProyecto = web3.utils.keccak256(cuentaPromotor);
        let idProyecto1 = web3.utils.sha3(web3.utils.randomHex(32));
        let idProyecto2 = web3.utils.sha3(web3.utils.randomHex(32));
        const cuentaInversor = accounts[2];

        // Creamos promotor
       await this.plataformaPromoInver.registrarPromotor("Promotor 1", "B123012", 10000, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "PromotorRegistrado");            
            });

        // Creamos proyecto 1 
        await this.plataformaPromoInver.registrarProyecto(idProyecto1, "Proyecto 1", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"),200, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            }); 
            
        // Creamos proyecto 2
        await this.plataformaPromoInver.registrarProyecto(idProyecto2, "Proyecto 2", Date.parse("2020-06-01"), Date.parse("2020-07-01"), Date.parse("2020-08-01"), Date.parse("2020-09-01"),200, 10, { from: cuentaPromotor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                
                assert.equal(receipt.logs[0].event, "ProyectoRegistrado");            
            });     
            
        // Creamos inversor        
       	await this.plataformaPromoInver.registrarInversor("Inversor 1", "B123888", { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){

                assert.equal(receipt.logs[0].event, "InversorRegistrado");            
            });  
        
        // Emitimos tokens al inversor    
        await this.plataformaPromoInver.transferirTokensParaInversor(cuentaInversor, 250, { from: currentOwner, gasPrice: 1, gas: 3000000 })
        .on('receipt', function(receipt){
            
            assert.equal(receipt.logs[0].event, "Transfer");  
            assert.equal(receipt.logs[1].event, "TokensEmitidos");          
        });   

        // Inversor invierte en proyecto 1              
        await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, idProyecto1, 100, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                //console.log(JSON.stringify(receipt, null, 2));
                
                assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                                
            }); 
        
            

        // Consultamos los token invertidos en el proyecto
        result = await this.plataformaPromoInver.tokensInvertidosEnProyecto(idProyecto1, { from: cuentaInversor, gasPrice: 1, gas: 3000000 });
        
        //console.log("tokensInvertidosEnProyecto:"  + result.ctaPromotor);
        assert.equal(result.tokensInversor, 100);               
 		        
 		const tokensProyecto1 = await this.plataformaPromoInver.consultarTokensInvertidosEnProyecto(idProyecto1);
 		//console.log("tokensProyecto:"  + tokensProyecto1);
 		
 		const tokensInversor1 = await this.plataformaPromoInver.balanceOf(cuentaInversor);
		//console.log("tokensInversor:"  + tokensInversor1);
           

        // Inversor invierte en proyecto 2              
        await this.plataformaPromoInver.invertirProyecto(cuentaPromotor, idProyecto2, 100, { from: cuentaInversor, gasPrice: 1, gas: 3000000 })
            .on('receipt', function(receipt){
                //console.log(JSON.stringify(receipt, null, 2));
                
                assert.equal(receipt.logs[0].event, "Transfer");  
                assert.equal(receipt.logs[1].event, "TokensInvertidosProyecto");                                
            }); 
        
            

        // Consultamos los token invertidos en el proyecto
        result = await this.plataformaPromoInver.tokensInvertidosEnProyecto(idProyecto2, { from: cuentaInversor, gasPrice: 1, gas: 3000000 });
        
        assert.equal(result.tokensInversor, 100);                        
         //console.log("tokensInvertidosEnProyecto2:"  + result.ctaPromotor);
        
 		const tokensProyecto2 = await this.plataformaPromoInver.consultarTokensInvertidosEnProyecto(idProyecto2);
 		//console.log("tokensProyecto2:"  + tokensProyecto2);
 		
 		const tokensInversor2 = await this.plataformaPromoInver.balanceOf(cuentaInversor);
		//console.log("tokensInversor2:"  + tokensInversor2);
    });
    
});

