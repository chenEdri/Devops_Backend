const logger = require('../../services/logger.service')
const reviewService = require('./review.service')
const toyService = require ('../toy/toy.service')
const userService = require('../user/user.service')

// TODO: needs error handling! try, catch

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query(req.query)
        res.send(reviews)
    } catch (err) {
        logger.error('Cannot get reviews', err);
        res.status(500).send({ error: 'cannot get reviews' })

    }
}

async function deleteReview(req, res) {
    try {
        await reviewService.remove(req.params.id)
        res.end()
    } catch (err) {
        logger.error('Cannot delete review', err);
        res.status(500).send({ error: 'cannot delete review' })
    }
}

async function addReview(req, res) {
    var review = req.body;
    review.byUserId = req.session.user._id;
    var user = await userService.getById(review.byUserId)
    toy = await toyService.getById(review.aboutToyId)
    review.aboutToy = toy
    await reviewService.add(review)
    review.byUser = user;
    // review.aboutToy = {}
    res.send(review)
}

module.exports = {
    getReviews,
    deleteReview,
    addReview
}