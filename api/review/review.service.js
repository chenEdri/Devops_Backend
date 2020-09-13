
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId


    // this is how the filter lookslike: {byUserId: 1ksdlfkjsd} {aboutToyId: sdmkfsdmfk}


    async function query(filterBy = {}) {
    
    const collection = await dbService.getCollection('review')
    try {
        if(filterBy.byUserId ) filterBy.byUserId = ObjectId(filterBy.byUserId)
        else if(filterBy.aboutToyId) filterBy.aboutToyId = ObjectId(filterBy.aboutToyId)
        var reviews = await collection.aggregate([
            {// the ones that match the fiter category
                $match: filterBy
            },
            {// taking the user details
                $lookup:
                {
                    from: 'user', // taking the information from the user collection
                    localField: 'byUserId', // how its called in review object
                    foreignField: '_id', // how its called in user object
                    as: 'byUser'
                }
            },
            {
                $unwind: '$byUser'
            },
            {
                $lookup:
                {
                    from: 'toy',
                    localField: 'aboutToyId',
                    foreignField: '_id',
                    as: 'aboutToy'
                }
            },
            {
                $unwind: '$aboutToy'
            }
        ]).toArray()

        reviews = reviews.map(review => {
            review.byUser = { _id: review.byUserId._id, username: review.byUserId.username }
            // review.aboutUser = { _id: review.aboutUser._id, username: review.aboutUser.username }
            delete review.byUserId;
            // delete review.aboutUserId;
            return review;
        })
        console.log('review', reviews);
        // return reviewAfterSort
        return reviews
    } catch (err) {
        console.log('ERROR: cannot find reviews')
        throw err;
    }
}

async function remove(reviewId) {
    const collection = await dbService.getCollection('review')
    try {
        await collection.deleteOne({ "_id": ObjectId(reviewId) })
    } catch (err) {
        console.log(`ERROR: cannot remove review ${reviewId}`)
        throw err;
    }
}


async function add(review) {
    review.byUserId = ObjectId(review.byUserId);
    review.aboutToyId = ObjectId(review.aboutToyId);

    const collection = await dbService.getCollection('review')
    try {
        await collection.insertOne(review);
        return review;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

module.exports = {
    query,
    remove,
    add
}


