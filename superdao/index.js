const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config();

/**
 * Express server
 */
const app = express()
app.use(express.json());
const port = 3000;

/**
 * Moralis server start in app
 */
const Moralis = require('moralis/node');
const serverUrl = process.env.MORALIS_SERVER_URL;
const appId = process.env.MORALIS_APP_ID;
const masterKey = process.env.MORALIS_MASTER_KEY;

/**
 * Test API Method:
 * http://localhost:3000/subscribe-on-address?address={address}
 */
app.get('/subscribe-on-address', async (req, res) => {
    const address = req.query.address;

    if (!address || !/0x[a-fA-F0-9]{40}/.test(address)) {
        res.json({ error: 'invalid address parameter'});
        throw new Error('Invalid address parameter');
    }

    const result = await Moralis.Cloud.run("watchEthAddress", { address }, { useMasterKey: true });

    res.json(result);
});

app.listen(port, async () => {
    await Moralis.start({ serverUrl, appId, masterKey });
    console.log(`Example app listening on port ${port}`)
});
