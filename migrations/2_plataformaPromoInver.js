const PlataformaPromoInver = artifacts.require("PlataformaPromoInver");

module.exports = function(deployer) {
  deployer.deploy(PlataformaPromoInver, {gas: 10000000});
};
