const express = require('express')
const storeRoutes = require('./store.routes')
const categoryRoutes = require('./category.routes')
const productRoutes = require('./products.routes')
const mallRoutes = require('./mall.routes')

const router = express.Router()

module.exports = router;

router.use('/malls', mallRoutes)

router.use('/stores', storeRoutes)

router.use('/category', categoryRoutes)

router.use('/product', productRoutes)

