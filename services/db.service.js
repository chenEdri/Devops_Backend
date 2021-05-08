const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://chen:chino220491@cluster0.iyehd.mongodb.net/?retryWrites=true&w=majority`


const config = require('../config')

module.exports = {
    getCollection
}

// Database Name
const dbName = 'item_db';

var dbConn = null;

async function getCollection(collectionName) {
    const db = await connect()
    return db.collection(collectionName);
}

async function connect() {
    if (dbConn) return dbConn;
    try {
        // const client= new MongoClient(uri, {useNewUrlParser: true})
        // const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
        const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        const db = client.db(dbName);
        dbConn = db;
        return db;
    } catch (err) {
        console.log('Cannot Connect to DB', err)
        throw err;
    }
}




