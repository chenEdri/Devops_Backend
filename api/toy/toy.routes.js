const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getToys, getToy, deleteToy, updateToy, addToy} = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.post('/',requireAuth,requireAdmin,addToy)
router.get('/:id',requireAuth, getToy)
router.put('/:id',requireAuth,requireAdmin, updateToy)
router.delete('/:id', requireAuth, requireAdmin,deleteToy)

module.exports = router
