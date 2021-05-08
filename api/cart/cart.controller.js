const itemService = require('./cart.service')
const logger = require('../../services/logger.service')


module.exports = {
    getItems,
    getItem,
    deleteItem,
    updateItem,
    addItem
}


// GET LIST

async function getItems(req, res) {
    const items = await itemService.query(req.query)
    res.send(items)
}

//GET SINGLE

async function getItem(req, res) {
    const item = await itemService.getById(req.params.id)
    res.send(item)
}

//DELETE

async function deleteItem(req, res) {
    (req.params.id !== 'ALL')? await itemService.remove(req.params.id): await itemService.removeAll()
    res.end()
}

//UPDATE

async function updateItem(req, res) {
    const item = req.body;
    await itemService.update(item)
    res.send(item)
}

// ADD
async function addItem(req, res) {
    const item = req.body;
    await itemService.add(item)
    res.send(item);
}
