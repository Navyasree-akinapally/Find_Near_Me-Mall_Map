const express = require('express');
const router = express.Router();
const appRoutes = require('./app/index.routes')
const adminRoutes = require('./admin/index.routes');
const passport = require('passport');

router.get('/health-check', (req, res) => {
    res.send("OK")
})

router.use('/app', appRoutes)

router.use('/admin', passport.authenticate('jwt', { session: false }), adminRoutes)


module.exports = router