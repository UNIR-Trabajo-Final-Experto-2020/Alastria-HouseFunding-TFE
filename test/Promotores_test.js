const Promotores = artifacts.require("Promotores");

contract('Promotores', function (accounts) {
    console.log(accounts);
    
    beforeEach(async function () {
        this.promotores = await Promotores.new();
    });
    
    it('Test 1', async function () {
		
        console.log("Test 1");        
    });
    
    
});

