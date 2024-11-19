const express = require('express')
const mallRoutes = require('./mall.routes')
const storeRoutes = require('./store.routes')
const stateRoutes = require('./state.routes')
const cityRoutes = require('./city.routes')
const categoryRoutes = require('./category.routes')
const productRoutes = require('./products.routes')
const userRoutes = require('./user.routes')
const mallAdminRoutes = require('./mall-admin.routes')

const router = express.Router()

module.exports = router;

router.use('/stores', storeRoutes)

router.use('/malls', mallRoutes)

router.use('/state', stateRoutes)

router.use('/city', cityRoutes)

router.use('/category', categoryRoutes)

router.use('/product', productRoutes)

router.use('/user', userRoutes)

router.use('/mall-admin', mallAdminRoutes)

