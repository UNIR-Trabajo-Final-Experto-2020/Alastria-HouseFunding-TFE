const Token = artifacts.require("Token");

contract('Token', function (accounts) {
    //console.log(accounts);
    
    beforeEach(async function () {
        this.token = await Token.new();
    });
    
    it('Incializa totalSupply', async function () {
		
        //console.log(this.token.totalSupply());
        const totalSupply = await this.token.totalSupply();        
        assert.equal(totalSupply, "1000000000");
    });
    
    
});

