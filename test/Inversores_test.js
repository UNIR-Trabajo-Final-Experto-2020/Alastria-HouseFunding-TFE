const Inversores = artifacts.require("Inversores");

contract('Inversores', function (accounts) {
    console.log(accounts);
    
    beforeEach(async function () {
        this.inversores = await Inversores.new();
    });
    
    it('Test 1', async function () {
		
        console.log("Test 1");        
    });
    
    
});

