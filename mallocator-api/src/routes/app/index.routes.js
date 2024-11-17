const express = require('express')

const authRoutes = require('./auth.routes')
const userRoutes = require('./user.routes')
const stateRoutes = require('./state.routes')
const mallRoutes = require('./mall.routes')
const storeRoutes = require('./store.routes')
const searchRoutes = require('./search.routes')
const categoryRoutes = require('./category.routes')

const router = express.Router()

module.exports = router;


router.use('/auth', authRoutes)

router.use('/user', userRoutes)

router.use('/state', stateRoutes)

router.use('/malls', mallRoutes)

router.use('/store', storeRoutes)

router.use('/search', searchRoutes)

router.use('/category', categoryRoutes)
