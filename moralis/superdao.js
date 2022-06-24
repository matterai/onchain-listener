Moralis.Cloud.define("subscribe-on-address", async (request) => {
    const logger = Moralis.Cloud.getLogger();
    const config = await Moralis.Config.get({ useMasterKey: true });
    const secretKey = config.get('secretKey');
    const rqSecretKey = request.params.secretKey;

    if (rqSecretKey !== secretKey) {
        throw "Unauthorized request: secret key required";
    }

    const rqAddress = request.params.address;
    if (!rqAddress || !/0x[a-fA-F0-9]{40}/.test(rqAddress)) {
        throw "Bad request: invalid address parameter";
    }

    const result = await Moralis.Cloud.run("watchEthAddress", 
        { address: rqAddress }, 
        { useMasterKey: true }
    );
    
    logger.info(result);

    return {
        address: rqAddress
    };
});
  