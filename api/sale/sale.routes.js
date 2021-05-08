const express = require('express')
const {getSales, getSale, deleteSale, updateSale, addSale} = require('./sale.controller')
const router = express.Router()

router.get('/', getSales)
router.post('/',addSale)
router.get('/:id', getSale)
router.put('/:id', updateSale)
router.delete('/:id',  deleteSale)

module.exports = router
