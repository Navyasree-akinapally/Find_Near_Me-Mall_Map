const express = require('express');
const router = express.Router();
const appRoutes = require('./app/index.routes')
const adminRoutes = require('./admin/index.routes');
const mallAdminRoutes = require('./mall-admin/index.routes')
const passport = require('passport');
const { checkSuperAdmin } = require('../middleware/superAdmin.middleware');
const { checkMallAdmin } = require('../middleware/mallAdmin');

router.get('/health-check', (req, res) => {
    res.send("OK")
})

router.use('/app', appRoutes)

router.use('/admin', passport.authenticate('jwt', { session: false }), checkSuperAdmin, adminRoutes)

router.use('/malladmin', passport.authenticate('jwt', { session: false }), checkMallAdmin, mallAdminRoutes)


module.exports = router