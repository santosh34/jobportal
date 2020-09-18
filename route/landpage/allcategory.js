const express = require('express');
const LandPageControllers = require('../../controllers/landpage/allcategory');
const router= express.Router();


router.get('/findallcategory', LandPageControllers.getAllCategoryPage);

router.get('/findjobcategory/:jobcategory', LandPageControllers.getAllJobCategoryPage);

module.exports =router;