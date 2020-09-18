const express = require('express');
const LandPageControllers = require('../../controllers/landpage/joblevel');
const router= express.Router();


router.get('/beginnersjob/:beginnersjob', LandPageControllers.getAllJobBeginners)

router.get('/intermediatejob/:intermediatejob', LandPageControllers.getAllJobIntermediate)

router.get('/expertjob/:expertjob', LandPageControllers.getAllJobExpert)

module.exports =router;