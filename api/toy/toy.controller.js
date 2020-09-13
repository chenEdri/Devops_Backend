const toyService = require('./toy.service')
const logger = require('../../services/logger.service')


module.exports = {
    getToys,
    getToy,
    deleteToy,
    updateToy,
    addToy
}


// GET LIST

async function getToys(req, res) {
    const toys = await toyService.query(req.query)
    // logger.debug(toys);
    res.send(toys)
}

//GET SINGLE

async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id)
    res.send(toy)
}

//DELETE

async function deleteToy(req, res) {
    await toyService.remove(req.params.id)
    res.end()
}

//UPDATE

async function updateToy(req, res) {
    console.log('inside');
    const toy = req.body;
    await toyService.update(toy)
    res.send(toy)
}

// ADD
async function addToy(req, res) {
    const toy = req.body;
    console.log('toy-',toy);
    await toyService.add(toy)
    res.send(toy);
}

// async function add(toy) {
//     const collection = await dbService.getCollection('toy')
//     try {
//         await collection.insertOne(toy);
//         return toy;
//     } catch (err) {
//         console.log(`ERROR: cannot insert toy`)
//         throw err;
//     }
// }