const express = require('express');
const homePageControllers = require('../controllers/hompage')
const router= express.Router();


router.get("/",homePageControllers.getHomePage);

router.get("/employeehomepage",homePageControllers.getEmployeeHomePage);


router.get("/jobseekerhomepage",homePageControllers.getJobseekerHomePage);



router.get("/landingpage",homePageControllers.getLandingPage);


module.exports =router;