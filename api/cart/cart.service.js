
const fs = require('fs')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    removeAll,
    update,
    add
}

async function query(filterBy = {}) {
    const collection = await dbService.getCollection('cart')
    try {
        const items = (Object.keys(filterBy).length !== 0)? await collection.find({"isToBuy": true}).toArray(): await collection.find({}).toArray();
        return items
    } catch (err) {
        console.log('ERROR: cannot find items')
        throw err;
    }
}


async function getById(ItemId) {
    const collection = await dbService.getCollection('cart')
    try {
        const item = await collection.findOne({ "_id": ObjectId(ItemId) })
        return item
    }catch (err) {
        console.log(`ERROR: while finding item ${ItemId}`)
        throw err;
    }
}


async function remove(ItemId) {
    const collection = await dbService.getCollection('cart')
    try {
        await collection.deleteOne({ "_id": ObjectId(ItemId) })
    } catch (err) {
        console.log(`ERROR: cannot remove item ${ItemId}`)
        throw err;
    }
}

async function removeAll(){
    const collection = await dbService.getCollection('cart')
    try {
        await collection.remove({})
    } catch (err) {
        console.log(`ERROR: cannot remove item ${ItemId}`)
        throw err;
    }
}


async function update(item) {
    console.log('update-', item);
    const collection = await dbService.getCollection('cart')
    item._id = ObjectId(item._id);
    item.updatedAt = Date.now();
    try {
        await collection.replaceOne({ "_id": item._id }, item )
        return item
    } catch (err) {
        console.log(`ERROR: cannot update item ${item._id}`)
        throw err;
    }
}

async function add(item) {
    const collection = await dbService.getCollection('cart')
    try {
        await collection.insertOne(item);
        return item;
    } catch (err) {
        console.log(`ERROR: cannot insert item`)
        throw err;
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {};
//     if(filterBy) criteria.isToBuy = {$regex: new RegExp(filterBy.isToBuy, 'i')}
//     // for (const key in filterBy) {
//     //     if (filterBy[key] !== 'null') {
//     //         criteria[key] = { $regex: new RegExp(filterBy[key], 'i') }
//     //     }
//     // }
//     return criteria;
// }

