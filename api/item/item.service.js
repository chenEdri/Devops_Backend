
const fs = require('fs')
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy={}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('item')
    try {
        const items = await collection.find(criteria).toArray();
        console.log(collection);
        return items
    } catch (err) {
        console.log('ERROR: cannot find items')
        throw err;
    }
}


async function getById(ItemId) {
    const collection = await dbService.getCollection('item')
    try {
        const item = await collection.findOne({ "_id": ObjectId(ItemId) })
        return item
    }catch (err) {
        console.log(`ERROR: while finding item ${ItemId}`)
        throw err;
    }
}


async function remove(ItemId) {
    const collection = await dbService.getCollection('item')
    try {
        await collection.deleteOne({ "_id": ObjectId(ItemId) })
    } catch (err) {
        console.log(`ERROR: cannot remove item ${ItemId}`)
        throw err;
    }
}


async function update(item) {
    const collection = await dbService.getCollection('item')
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
    const collection = await dbService.getCollection('item')
    try {
        await collection.insertOne(item);
        return item;
    } catch (err) {
        console.log(`ERROR: cannot insert item`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    for (const key in filterBy) {
        console.log(filterBy[key]);
        if (filterBy[key] !== 'null') {
            criteria[key] = { $regex: new RegExp(filterBy[key], 'i') }
        }
    }
    return criteria;
}

