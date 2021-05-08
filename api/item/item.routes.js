const express = require('express')
const {getItems, getItem, deleteItem, updateItem, addItem} = require('./item.controller')
const router = express.Router()

router.get('/', getItems)
router.post('/',addItem)
router.get('/:id', getItem)
router.put('/:id', updateItem)
router.delete('/:id',  deleteItem)

module.exports = router
