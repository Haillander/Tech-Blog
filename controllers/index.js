const router = require('express').Router();
const apiRoutes = require('./API/');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');


router.use('/API', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);




module.exports = router;
