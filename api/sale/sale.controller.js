const saleService = require('./sale.service')
const logger = require('../../services/logger.service')


module.exports = {
    getSales,
    getSale,
    deleteSale,
    updateSale,
    addSale
}


// GET LIST

async function getSales(req, res) {
    const sales = await saleService.query(req.query)
    res.send(sales)
}

//GET SINGLE

async function getSale(req, res) {
    const sale = await saleService.getById(req.params.id)
    res.send(sale)
}

//DELETE

async function deleteSale(req, res) {
    await saleService.remove(req.params.id)
    res.end()
}

//UPDATE

async function updateSale(req, res) {
    const sale = req.body;
    await saleService.update(sale)
    res.send(sale)
}

// ADD
async function addSale(req, res) {
    const sale = req.body;
    await saleService.add(sale)
    res.send(sale);
}
