const express = require('express');
const LandPageControllers = require('../../controllers/landpage/allcompany');
const router= express.Router();


router.get('/allcompany', LandPageControllers.getAllCompanyPage)

router.get('/companypostjob/:userid', LandPageControllers.getAllCompanyPostJob)

module.exports =router;