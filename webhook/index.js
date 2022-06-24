const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(express.json());
const port = 3000

app.post('/', (req, res) => {
    const o = req.body.object;
    const rv = {
        block_numer: o.block_number,
        hash: o.hash,
        from: o.from_address,
        to: o.to_address,
        value: o.value
    }

    console.log(rv);
    console.log('------------------------------------');
    res.json(rv);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
