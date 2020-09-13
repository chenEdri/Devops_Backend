
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
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('toy')
    try {
        const toys = await collection.find(criteria).toArray();
        toys.forEach(toy => delete toy.password);
        return toys
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}


async function getById(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        const toy = await collection.findOne({ "_id": ObjectId(toyId) })
        return toy
    }catch (err) {
        console.log(`ERROR: while finding toy ${toyId}`)
        throw err;
    }
}


async function remove(toyId) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.deleteOne({ "_id": ObjectId(toyId) })
    } catch (err) {
        console.log(`ERROR: cannot remove toy ${toyId}`)
        throw err;
    }
}


async function update(toy) {
    const collection = await dbService.getCollection('toy')
    toy._id = ObjectId(toy._id);
    toy.updatedAt = Date.now();
    try {
        await collection.replaceOne({ "_id": toy._id }, toy )
        return toy
    } catch (err) {
        console.log(`ERROR: cannot update toy ${toy._id}`)
        throw err;
    }
}


// async function update(toy) {
//     console.log('toy-', toy);
//     const collection = await dbService.getCollection('toy')
//     try {
//         await collection.replaceOne({ "_id": ObjectId(toy._id)},  toy )
//         return toy
//     } catch (err) {
//         console.log(`ERROR: cannot update toy ${toy._id}`)
//         throw err;
//     }
// }

async function add(toy) {
    const collection = await dbService.getCollection('toy')
    try {
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot insert toy`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    console.log('filterBy cretr-',filterBy);
    const criteria = {};
    if (filterBy.name) criteria.name = {$regex:new RegExp(filterBy.name,'i')}
    if (filterBy.minPrice) criteria.price = { $gte: +filterBy.minPrice }
    if (filterBy.maxPrice)  criteria.price = { $lt: +filterBy.maxPrice }
    if (filterBy.category !== undefined && filterBy.category !=='' && filterBy.category !== 'all') criteria.category = filterBy.category
    if (filterBy.inStock !== undefined && filterBy.inStock!=='' && filterBy.inStock !== 'all') {
        (filterBy.inStock === 'yes') ? filterBy.inStock = true : filterBy.inStock = false;
        criteria.inStock = filterBy.inStock;
    }
    return criteria;
}





        //  OPTION FROM CLASS : function query(params) {
        //     // Check if param object is empty
        //     if (!Object.keys(params).length) return Promise.resolve(items)
        //     var itemsToReturn = items;
        //     var nameRegex = new RegExp(`${params.filterBy || ''}`, 'i');
        //     var typeRegex = new RegExp(`${params.filterType || ''}`, 'i');
        //     itemsToReturn = items.filter(item => nameRegex.test(item.name) && typeRegex.test(item.type))
        //     if (params.sortBy) {
        //         itemsToReturn = sort(itemsToReturn, params.sortBy)
        //     }
        //     return Promise.resolve(itemsToReturn);
        // }



        // MINE:  var toysToReturn = toys;
        // if (!Object.keys(filterBy).length) return Promise.resolve(toysToReturn)
        // const maxPrice = filterBy.maxPrice || Infinity
        // const minPrice = filterBy.minPrice || 0
        // let inStock;
        // (filterBy.inStock === 'yes') ? inStock = true : inStock = false;
        // const category = filterBy.category || '';
        // // start filtering
        // if (filterBy.name) toysToReturn = toysToReturn.filter(item => item.name.toLowerCase().includes(filterBy.name.toLowerCase()))
        // if (filterBy.inStock !== '' && filterBy.inStock !== 'all') toysToReturn = toysToReturn.filter(item => item.inStock === inStock)
        // if (filterBy.category !== '' && filterBy.category !== 'all') toysToReturn = toysToReturn.filter(item => item.category === category)
        // toysToReturn = (toysToReturn.filter(item => {
        //     return (item.price < maxPrice &&
        //         item.price > minPrice)
        // }))
        // return Promise.resolve(toysToReturn)
    // }

// function getById(id) {
//     const toy = toys.find(toy => {
//         return toy._id === id
//     })
//     return Promise.resolve(toy);
// }

// function remove(id) {
//     const idx = toys.findIndex(toy => toy._id === id)
//     toys.splice(idx, 1);
//     _saveToysToFile()
//     return Promise.resolve();
// }

// function save(toy) {
//     if (toy._id) {
//         const idx = toys.findIndex(currToy => currToy._id === toy._id)
//         toy.updatedAt = Date.now();
//         toys[idx] = { ...toys[idx], ...toy }
//     } else {
//         toy.createdAt = Date.now();
//         toy._id = _makeId();
//         toys.unshift(toy);
//     }
//     _saveToysToFile();
//     return Promise.resolve(toy);
// }


// CRUDL: Create, Read, Update, Delete, List


// function _makeId(length = 5) {
//     var txt = '';
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length));
//     }
//     return txt;
// }

// function _saveToysToFile() {
//     fs.writeFileSync('data/toy.json', JSON.stringify(toys, null, 2));
// }
