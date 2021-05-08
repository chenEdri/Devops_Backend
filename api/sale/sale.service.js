
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

async function query(filterBy = {}) {
    console.log('inside');
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('sales')
    console.log(collection);
    try {
        const sales = await collection.find().toArray();
        console.log(sales);
        return sales
    } catch (err) {
        console.log('ERROR: cannot find sales')
        throw err;
    }
}


async function getById(SaleId) {
    const collection = await dbService.getCollection('sales')
    try {
        const sale = await collection.findOne({ "_id": ObjectId(SaleId) })
        return sale
    } catch (err) {
        console.log(`ERROR: while finding sale ${SaleId}`)
        throw err;
    }
}


async function remove(SaleId) {
    const collection = await dbService.getCollection('sales')
    try {
        await collection.deleteOne({ "_id": ObjectId(SaleId) })
    } catch (err) {
        console.log(`ERROR: cannot remove sale ${SaleId}`)
        throw err;
    }
}


async function update(sale) {
    console.log('id-', sale._id);
    const collection = await dbService.getCollection('sales')
    sale._id = ObjectId(sale._id);
    try {
        const saleToUpdate = await collection.findOne({ "_id": ObjectId(sale._id) })
        sale = _updateValues(saleToUpdate, sale)
        await collection.replaceOne({ "_id": sale._id }, sale)
        return sale
    } catch (err) {
        console.log(`ERROR: cannot update sale ${sale._id}`)
        throw err;
    }
}

async function add(sale) {
    console.log('saletoadd-',sale);
    const collection = await dbService.getCollection('sales')
    sale._id = ObjectId(sale._id);
    sale.saleDates = [sale.saleDates]
    console.log('sale after date chnging-s',sale);
    try {
        await collection.insertOne(sale);
        return sale;
    } catch (err) {
        console.log(`ERROR: cannot insert sale`)
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

function _updateValues(saleToUpdate, sale) {
    let datesArr = [...saleToUpdate.saleDates, sale.saleDates];
    console.log('datesArr-', datesArr);
    return({
        _id:sale._id,
        name: sale.name,
        price: sale.price,
        sumOfSales: saleToUpdate.sumOfSales +1,
        totalMoney: (saleToUpdate.sumOfSales +1) * sale.price,
        saleDates : datesArr
    })
}
